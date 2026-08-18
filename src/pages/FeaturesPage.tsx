import { Map, Compass, CloudSun, Battery, Radio, Backpack, Users, ShieldAlert, Camera, Route, Mountain, Waves } from "lucide-react";
import PageShell from "@/components/PageShell";

const features = [
  { icon: Map, title: "Offline topo maps", text: "Download entire regions with contour lines, water sources and shelters before you lose signal." },
  { icon: Route, title: "Route builder", text: "Draw multi-day routes, get distance, elevation gain and realistic pace estimates per segment." },
  { icon: Compass, title: "Wild compass", text: "Bearing, declination and back-azimuth tools that keep working when GPS drops out." },
  { icon: CloudSun, title: "Mountain weather", text: "Altitude-aware forecasts, freezing level, wind chill and storm warnings on your route line." },
  { icon: Battery, title: "Battery saver", text: "Low-power tracking mode records your track for days on a single charge." },
  { icon: Radio, title: "Trail alerts", text: "Closures, avalanche bulletins and permit changes pushed for the trails you follow." },
  { icon: Backpack, title: "Gear checklists", text: "Auto-built packing lists from trip length, altitude and season — shared with your group." },
  { icon: ShieldAlert, title: "Safety beacon", text: "Share a live location link and set check-in timers with your emergency contacts." },
  { icon: Users, title: "Group expeditions", text: "Plan together, split gear, and keep everyone on the same itinerary." },
  { icon: Camera, title: "Field log", text: "Geotagged photos and notes stitched into a shareable expedition story." },
  { icon: Mountain, title: "Summit index", text: "Peak database with routes, seasons and difficulty grades from real trip reports." },
  { icon: Waves, title: "Water finder", text: "Verified springs, streams and refill points with last-checked dates from the community." },
];

const FeaturesPage = () => (
  <PageShell
    kicker="Product"
    title={
      <>
        Everything the <span className="text-gradient-amber">wild</span> demands
      </>
    }
    intro="Dravik is built around one idea: the tools have to work where the signal doesn't. Here's the full toolkit, on web and in the companion app."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((feature) => (
        <article key={feature.title} className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors">
          <feature.icon className="w-6 h-6 text-primary mb-4" />
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.text}</p>
        </article>
      ))}
    </div>
  </PageShell>
);

export default FeaturesPage;
