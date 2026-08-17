import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { Smartphone, RefreshCw, Copy, Check, Unlink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCreatePairingCode, useLinkedDevices, useUnlinkDevice, type PairingCode } from "@/hooks/useDeviceSync";

const PAIRING_DEEP_LINK_SCHEME = "dravik://pair";

interface DeviceSyncPanelProps {
  userId?: string;
}

const useCountdown = (expiresAt?: string) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [expiresAt]);

  return secondsLeft;
};

const formatSeconds = (total: number) => `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;

const DeviceSyncPanel = ({ userId }: DeviceSyncPanelProps) => {
  const { data: devices, isLoading } = useLinkedDevices(userId);
  const createCode = useCreatePairingCode(userId);
  const unlinkDevice = useUnlinkDevice(userId);

  const [pairing, setPairing] = useState<PairingCode | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const secondsLeft = useCountdown(pairing?.expires_at);
  const isExpired = Boolean(pairing) && secondsLeft === 0;

  const deepLink = useMemo(
    () => (pairing ? `${PAIRING_DEEP_LINK_SCHEME}?code=${pairing.code}` : ""),
    [pairing],
  );

  useEffect(() => {
    if (!deepLink) {
      setQrDataUrl("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(deepLink, {
      margin: 1,
      width: 220,
      color: { dark: "#0f1a14", light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => setQrDataUrl(""));
    return () => {
      cancelled = true;
    };
  }, [deepLink]);

  const handleGenerate = async () => {
    try {
      const code = await createCode.mutateAsync();
      setPairing(code);
      setCopied(false);
    } catch (error) {
      toast({
        title: "Could not create a pairing code",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    if (!pairing) return;
    await navigator.clipboard.writeText(pairing.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlink = async (deviceId: string, deviceName: string) => {
    try {
      await unlinkDevice.mutateAsync(deviceId);
      toast({ title: "Device unlinked", description: `${deviceName} no longer syncs with your account.` });
    } catch {
      toast({ title: "Could not unlink this device", variant: "destructive" });
    }
  };

  return (
    <section aria-labelledby="device-sync-heading" className="space-y-4">
      <h2 id="device-sync-heading" className="font-display font-semibold text-xl text-foreground flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-primary" /> App &amp; Device Sync
      </h2>

      <div className="glass-card rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Open the Dravik app, tap <span className="text-foreground">Connect to web</span>, then scan this code.
            Your saved places, trips and profile stay in sync on both.
          </p>

          {pairing && !isExpired ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="flex items-center gap-4">
                {qrDataUrl && (
                  <img
                    src={qrDataUrl}
                    alt="QR code to pair the Dravik mobile app with this account"
                    className="w-32 h-32 rounded-xl border border-border/60"
                  />
                )}
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-1">Or enter this code</p>
                  <p className="font-display font-bold text-2xl tracking-[0.3em] text-gradient-amber">{pairing.code}</p>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    Expires in {formatSeconds(secondsLeft)}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 px-0 font-body text-xs" onClick={handleCopy}>
                    {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                    {copied ? "Copied" : "Copy code"}
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleGenerate} disabled={createCode.isPending}>
                <RefreshCw className="w-4 h-4 mr-2" /> New code
              </Button>
            </motion.div>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={createCode.isPending}
              className="bg-gradient-amber text-primary-foreground font-display"
            >
              {createCode.isPending ? "Generating…" : isExpired ? "Code expired — generate a new one" : "Pair a device"}
            </Button>
          )}

          <p className="font-body text-xs text-muted-foreground mt-4 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            Codes are single-use and expire after 5 minutes. Never share one with anyone else.
          </p>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">Linked devices</h3>
          {isLoading ? (
            <p className="font-body text-sm text-muted-foreground">Loading devices…</p>
          ) : devices && devices.length > 0 ? (
            <ul className="space-y-3">
              {devices.map((device) => (
                <li key={device.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/30 p-3">
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">{device.device_name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {device.platform}
                      {device.app_version ? ` • v${device.app_version}` : ""} • synced{" "}
                      {new Date(device.last_synced_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Unlink ${device.device_name}`}
                    onClick={() => handleUnlink(device.id, device.device_name)}
                    disabled={unlinkDevice.isPending}
                  >
                    <Unlink className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-sm text-muted-foreground">
              No devices linked yet. Pair your phone to carry your trips into the wild.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeviceSyncPanel;
