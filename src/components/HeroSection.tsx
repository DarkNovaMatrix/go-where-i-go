import { motion } from "framer-motion";
import { MapPin, Download } from "lucide-react";
import heroImage from "@/assets/hero-mountain.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dramatic mountain landscape at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Your expedition companion</span>
          </motion.div>

          <h1 className="font-display font-900 text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-6">
            <span className="text-foreground">DRA</span>
            <span className="text-gradient-amber">VIK</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-mist max-w-2xl mx-auto mb-10 leading-relaxed">
            Navigate the unknown with confidence. Offline maps, AR trail scanning, 
            real-time weather, and group sync — all in one rugged platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-amber text-primary-foreground font-display font-semibold text-lg px-8 py-6 shadow-amber hover:opacity-90 transition-opacity">
              <Download className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
            <Button variant="outline" size="lg" className="border-border text-foreground font-display font-medium text-lg px-8 py-6 hover:bg-muted transition-colors">
              View Features
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
