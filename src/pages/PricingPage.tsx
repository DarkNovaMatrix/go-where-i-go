import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Basecamp",
    price: "Free",
    note: "Forever",
    features: ["Full destination atlas", "Save unlimited destinations", "Trip planner with gear checklist", "Device pairing with the app", "Community reviews"],
    cta: "Create account",
    to: "/auth",
  },
  {
    name: "Expedition",
    price: "$7",
    note: "per month",
    highlight: true,
    features: ["Everything in Basecamp", "Offline topo map downloads", "Altitude-aware weather", "Live safety beacon & check-ins", "Route builder with elevation profiles", "Priority sync across devices"],
    cta: "Start 14-day trial",
    to: "/auth",
  },
  {
    name: "Summit",
    price: "$19",
    note: "per month",
    features: ["Everything in Expedition", "Group expeditions up to 20", "Guide & operator profile", "Bulk trip exports (GPX/KML)", "API access for your own tools", "Dedicated support"],
    cta: "Talk to us",
    to: "/contact",
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  return (
    <PageShell
      kicker="Pricing"
      title={
        <>
          Pay for the <span className="text-gradient-amber">summit</span>, not the map
        </>
      }
      intro="Planning is free, always. Upgrade only when you need offline maps, safety tooling and group logistics."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`glass-card rounded-2xl p-7 flex flex-col ${tier.highlight ? "border-primary/40 shadow-amber" : ""}`}
          >
            <h3 className="font-display font-semibold text-xl text-foreground mb-1">{tier.name}</h3>
            <p className="font-display font-bold text-4xl text-foreground">
              {tier.price}
              <span className="font-body text-sm text-muted-foreground ml-2">{tier.note}</span>
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2 font-body text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => navigate(tier.to)}
              className={`mt-7 font-display font-semibold ${
                tier.highlight ? "bg-gradient-amber text-primary-foreground shadow-amber" : ""
              }`}
              variant={tier.highlight ? "default" : "outline"}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export default PricingPage;
