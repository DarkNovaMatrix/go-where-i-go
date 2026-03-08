import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: "50+", label: "Trail Guides" },
  { value: "100%", label: "Offline Ready" },
  { value: "Live", label: "Weather Alerts" },
  { value: "AR", label: "Trail Scanning" },
];

const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-center cursor-default group"
    >
      <div className="font-display font-bold text-5xl md:text-6xl text-gradient-amber mb-2 group-hover:drop-shadow-[0_0_20px_hsla(38,65%,58%,0.5)] transition-all duration-300">
        {value}
      </div>
      <div className="font-body text-muted-foreground text-sm tracking-wide uppercase group-hover:text-foreground transition-colors">
        {label}
      </div>
    </motion.div>
  );
};

const MouseTracker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 150);
      mouseY.set(e.clientY - rect.top - 150);
    };
    const el = ref.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x, y }}
        className="w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none"
      />
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 border-y border-border relative overflow-hidden">
      <MouseTracker />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
