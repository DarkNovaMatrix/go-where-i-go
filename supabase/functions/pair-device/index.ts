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

  const { data: pairing, error: pairingError } = await admin
    .from("device_pairing_codes")
    .select("id, user_id, expires_at, claimed_at")
    .eq("code", code)
    .maybeSingle();

  if (pairingError) return jsonResponse({ error: "Could not verify the pairing code" }, 500);
  if (!pairing || pairing.claimed_at || new Date(pairing.expires_at) < new Date()) {
    return jsonResponse({ error: "This pairing code is invalid or has expired" }, 400);
  }

  const { error: claimError } = await admin
    .from("device_pairing_codes")
    .update({ claimed_at: new Date().toISOString() })
    .eq("id", pairing.id)
    .is("claimed_at", null);

  if (claimError) return jsonResponse({ error: "This pairing code was already used" }, 409);

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
