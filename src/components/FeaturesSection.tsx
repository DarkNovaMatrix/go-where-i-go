import { motion } from "framer-motion";
import { Map, Compass, CloudSun, Backpack, BookOpen, Shield, Users, Route, Globe } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const features = [
  {
    icon: Map,
    title: "Offline Maps",
    description: "Download regions and navigate without signal. Full topographic detail when you need it most.",
  },
  {
    icon: Compass,
    title: "AR Trail Scanner",
    description: "Point your camera at the trail ahead. AR overlays show waypoints, elevation, and hazards in real-time.",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    description: "Hyper-local forecasts with storm alerts. Cached offline so you're never caught off guard.",
  },
  {
    icon: Backpack,
    title: "Gear Management",
    description: "Track your equipment, get weight estimates, and receive smart packing suggestions per trip.",
  },
  {
    icon: BookOpen,
    title: "50+ Trail Guides",
    description: "Comprehensive guides covering terrain types, survival tips, and local flora & fauna.",
  },
  {
    icon: Shield,
    title: "Safety & Emergency",
    description: "One-tap SOS with GPS coordinates. Emergency contacts and safety protocols always accessible.",
  },
  {
    icon: Users,
    title: "Group Sync",
    description: "Real-time location sharing with your crew. Stay connected even in remote areas.",
  },
  {
    icon: Route,
    title: "Trip Planner",
    description: "AI-powered safety analysis, route optimization, and itinerary management for every expedition.",
  },
  {
    icon: Globe,
    title: "Country Explorer",
    description: "Discover outdoor destinations worldwide with terrain data, regulations, and local insights.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section className="py-32 relative" id="features">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Features
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Built for the <span className="text-gradient-amber">wild</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Every feature designed for when connectivity ends and adventure begins.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <TiltCard className="glass-card rounded-xl p-8 h-full hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
