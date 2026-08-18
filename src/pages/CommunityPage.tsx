import { MessageSquare, Camera, Flag, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const pillars = [
  { icon: MessageSquare, title: "Trip reports", text: "Post conditions, closures and route beta right on the destination page — the freshest info wins." },
  { icon: Camera, title: "Field photos", text: "Attach geotagged photos to your reviews so others know exactly what the terrain looks like." },
  { icon: Flag, title: "Trail stewardship", text: "Flag damage, litter and unsafe sections. Reports reach local stewards and other explorers." },
  { icon: Users, title: "Expedition partners", text: "Make a trip public to find partners with matching dates, pace and experience level." },
];

const rules = [
  "Report conditions honestly — someone will plan a trip on your words.",
  "Never share exact locations of fragile or protected sites.",
  "Leave no trace, on the mountain and in the thread.",
  "No promotion without disclosure. Guides, mark yourself as a guide.",
];

const CommunityPage = () => {
  const navigate = useNavigate();
  return (
    <PageShell
      kicker="Community"
      title={
        <>
          Built by people who <span className="text-gradient-amber">go out</span>
        </>
      }
      intro="Every rating, warning and water source in Dravik comes from explorers logging what they actually found on the ground."
    >
      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="glass-card rounded-2xl p-6">
            <pillar.icon className="w-6 h-6 text-primary mb-4" />
            <h2 className="font-display font-semibold text-lg text-foreground mb-2">{pillar.title}</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{pillar.text}</p>
          </article>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-7 max-w-3xl">
        <h2 className="font-display font-semibold text-xl text-foreground mb-4">Field code</h2>
        <ul className="space-y-2 mb-6">
          {rules.map((rule) => (
            <li key={rule} className="font-body text-sm text-muted-foreground">— {rule}</li>
          ))}
        </ul>
        <Button onClick={() => navigate("/auth")} className="bg-gradient-amber text-primary-foreground font-display font-semibold shadow-amber">
          Join and post your first report
        </Button>
      </div>
    </PageShell>
  );
};

export default CommunityPage;
