import { motion } from "framer-motion";
import { ArrowRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Mountain className="w-12 h-12 text-primary mx-auto mb-8 animate-float" />
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Your next summit<br />
            <span className="text-gradient-amber">starts here</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Join thousands of adventurers who trust Dravik as their essential expedition companion.
          </p>
          <Button size="lg" className="bg-gradient-amber text-primary-foreground font-display font-semibold text-lg px-10 py-6 shadow-amber hover:opacity-90 transition-opacity">
            Get Dravik
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
