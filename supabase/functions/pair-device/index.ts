import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

interface PairDeviceRequest {
  code?: unknown;
  deviceName?: unknown;
  platform?: unknown;
  appVersion?: unknown;
}

const asTrimmedString = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  let payload: PairDeviceRequest;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const code = asTrimmedString(payload.code, 16)?.toUpperCase();
  const deviceName = asTrimmedString(payload.deviceName, 60) ?? "Mobile device";
  const platform = asTrimmedString(payload.platform, 20) ?? "unknown";
  const appVersion = asTrimmedString(payload.appVersion, 20);

  if (!code) return jsonResponse({ error: "A pairing code is required" }, 400);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Brute-force protection: max failed attempts per client within the window.
  const MAX_FAILED_ATTEMPTS = 8;
  const WINDOW_MINUTES = 15;
  const clientKey =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count: failedAttempts } = await admin
    .from("pairing_attempts")
    .select("id", { count: "exact", head: true })
    .eq("client_key", clientKey)
    .eq("succeeded", false)
    .gte("created_at", windowStart);

  if ((failedAttempts ?? 0) >= MAX_FAILED_ATTEMPTS) {
    return jsonResponse({ error: "Too many pairing attempts. Try again later." }, 429);
  }

  const recordAttempt = (succeeded: boolean) =>
    admin.from("pairing_attempts").insert({ client_key: clientKey, succeeded });

  // Atomic claim: only one caller can flip claimed_at from null.
  const { data: claimed, error: claimError } = await admin
    .from("device_pairing_codes")
    .update({ claimed_at: new Date().toISOString() })
    .eq("code", code)
    .is("claimed_at", null)
    .gt("expires_at", new Date().toISOString())
    .select("id, user_id")
    .maybeSingle();

  if (claimError) return jsonResponse({ error: "Could not verify the pairing code" }, 500);
  if (!claimed) {
    await recordAttempt(false);
    return jsonResponse({ error: "This pairing code is invalid, used or expired" }, 400);
  }

  await recordAttempt(true);
  const pairing = claimed;

  const { data: device, error: deviceError } = await admin
    .from("linked_devices")
    .insert({
      user_id: pairing.user_id,
      device_name: deviceName,
      platform,
      app_version: appVersion,
    })
    .select("id, device_name, platform, created_at")
    .single();

  if (deviceError) return jsonResponse({ error: "Could not link this device" }, 500);

  const { data: userData } = await admin.auth.admin.getUserById(pairing.user_id);
  const email = userData?.user?.email;
  if (!email) return jsonResponse({ error: "Account is missing an email address" }, 500);

  // Short-lived magic link so the app signs in to the very same account.
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (linkError || !link?.properties) {
    return jsonResponse({ error: "Could not create a sign-in link for the app" }, 500);
  }

  return jsonResponse({
    device,
    session: {
      email,
      tokenHash: link.properties.hashed_token,
      verificationType: "magiclink",
    },
  });
});
