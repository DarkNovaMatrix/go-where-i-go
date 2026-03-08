import { motion } from "framer-motion";
import { User, Users, Flag } from "lucide-react";

const personas = [
  {
    icon: User,
    title: "Solo Trekkers",
    description: "Navigate challenging trails with confidence using offline maps and AR guidance",
  },
  {
    icon: Flag,
    title: "Tour Operators",
    description: "Manage group expeditions with real-time collaboration and safety monitoring",
  },
  {
    icon: Users,
    title: "Adventure Clubs",
    description: "Organize club activities with comprehensive trip planning and shared guides",
  },
];

const badges = [
  { label: "∞", sub: "Offline Availability" },
  { label: "AR", sub: "Trail Technology" },
  { label: "AI", sub: "Safety Analysis" },
  { label: "100%", sub: "Privacy Focused" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PerfectForSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Perfect For
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Built for <span className="text-gradient-amber">every</span> adventurer
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Dravik serves adventurers of all types and skill levels
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {personas.map((persona) => (
            <motion.div
              key={persona.title}
              variants={item}
              className="glass-card rounded-xl p-10 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-forest flex items-center justify-center mx-auto mb-6">
                <persona.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-3">
                {persona.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {persona.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.sub}
              variants={item}
              className="glass-card rounded-xl p-6 text-center"
            >
              <span className="font-display font-bold text-3xl text-gradient-amber block mb-2">
                {badge.label}
              </span>
              <span className="font-body text-sm text-muted-foreground">
                {badge.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectForSection;
