import { Download, Smartphone, Apple, ShieldCheck, RefreshCw } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { APP_DOWNLOADS } from "@/config/site";
import { useToast } from "@/hooks/use-toast";

const requirements = [
  { icon: Smartphone, label: `Android ${APP_DOWNLOADS.minAndroid}+`, detail: "ARM64 · 48 MB install" },
  { icon: Apple, label: `iOS ${APP_DOWNLOADS.minIos}+`, detail: "iPhone & iPad · TestFlight builds" },
  { icon: ShieldCheck, label: "Signed builds", detail: "Every APK is signed and checksum-verified" },
  { icon: RefreshCw, label: "Instant sync", detail: "Same account, same trips, offline-first" },
];

const DownloadPage = () => {
  const { toast } = useToast();

  const handleApk = () => {
    if (!APP_DOWNLOADS.androidApk) {
      toast({ title: "Build not published yet", description: "Add the APK URL in the site config." });
      return;
    }
    window.location.href = APP_DOWNLOADS.androidApk;
  };

  return (
    <PageShell
      kicker="Get Dravik"
      title={
        <>
          Take the wild <span className="text-gradient-amber">offline</span>
        </>
      }
      intro="Download the Dravik companion app, pair it with your account from the dashboard, and every saved trail, trip and gear list travels with you — even with no signal."
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <div className="glass-card rounded-2xl p-8">
          <p className="font-body text-sm text-muted-foreground mb-6">
            Version {APP_DOWNLOADS.version} · {APP_DOWNLOADS.sizeMb} MB
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={handleApk}
              className="bg-gradient-amber text-primary-foreground font-display font-semibold shadow-amber"
            >
              <Download className="w-4 h-4 mr-2" /> Download APK
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!APP_DOWNLOADS.playStore}
              onClick={() => window.open(APP_DOWNLOADS.playStore, "_blank", "noopener")}
              className="font-display"
            >
              <Smartphone className="w-4 h-4 mr-2" /> Google Play
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!APP_DOWNLOADS.appStore}
              onClick={() => window.open(APP_DOWNLOADS.appStore, "_blank", "noopener")}
              className="font-display"
            >
              <Apple className="w-4 h-4 mr-2" /> App Store
            </Button>
          </div>

          <ol className="mt-10 space-y-4">
            {[
              "Install the app on your phone.",
              "Open Dashboard → Device sync on this site and generate a pairing code.",
              "Scan the QR code (or type the code) in the app.",
              "Your account, saved destinations and trips sync instantly.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="w-6 h-6 shrink-0 rounded-full bg-primary/15 text-primary font-display text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-body text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4">
          {requirements.map((item) => (
            <div key={item.label} className="glass-card rounded-2xl p-5 flex items-start gap-4">
              <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-semibold text-foreground">{item.label}</p>
                <p className="font-body text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default DownloadPage;
