import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Trail Guides" },
  { value: "100%", label: "Offline Ready" },
  { value: "Live", label: "Weather Alerts" },
  { value: "AR", label: "Trail Scanning" },
];

const StatsSection = () => {
  return (
    <section className="py-20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-4xl md:text-5xl text-gradient-amber mb-2">
                {stat.value}
              </div>
              <div className="font-body text-muted-foreground text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
