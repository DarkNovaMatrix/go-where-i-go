import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QrCode, RefreshCw, UserCheck, WifiOff, Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const syncPoints = [
  {
    icon: UserCheck,
    title: "One account, everywhere",
    desc: "Sign in once. The same profile, saved places and trips follow you from web to phone.",
  },
  {
    icon: QrCode,
    title: "Pair in seconds",
    desc: "Scan a QR code from your dashboard and the app links itself to your account instantly.",
  },
  {
    icon: RefreshCw,
    title: "Live two-way sync",
    desc: "Plan a route on the big screen, and it is already on your phone before you hit the trailhead.",
  },
  {
    icon: WifiOff,
    title: "Offline-first, syncs later",
    desc: "Notes and tracks captured with no signal upload the moment you are back in range.",
  },
];

const CompanionAppSection = () => {
  return (
    <section
      aria-labelledby="companion-app-heading"
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Web + App
            </span>
            <h2
              id="companion-app-heading"
              className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6"
            >
              Your account, <span className="text-gradient-amber">connected</span> on every screen
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-10 max-w-xl">
              Dravik on the web and the Dravik app share one backend. Link your phone from your
              dashboard and everything — profile, saved destinations, trips and safety contacts —
              stays identical on both.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {syncPoints.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gradient-amber text-primary-foreground font-display">
                <Link to="/dashboard">Connect my app</Link>
              </Button>
              <Button variant="outline" className="font-display" asChild>
                <a href="#download-app">
                  <Apple className="w-4 h-4 mr-2" aria-hidden="true" /> App Store
                </a>
              </Button>
              <Button variant="outline" className="font-display" asChild>
                <a href="#download-app">
                  <Play className="w-4 h-4 mr-2" aria-hidden="true" /> Google Play
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 text-center"
            id="download-app"
          >
            <div className="mx-auto w-40 h-40 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-center mb-6">
              <QrCode className="w-20 h-20 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              Pair from your dashboard
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Sign in, open your dashboard and generate a one-time pairing code. Scan it in the app —
              the device links to your account and starts syncing right away.
            </p>
            <Button asChild variant="outline" className="font-display">
              <Link to="/auth">Sign in to pair</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanionAppSection;
