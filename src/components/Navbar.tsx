import { motion } from "framer-motion";
import { Mountain, Menu, X, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl text-foreground">
            DRA<span className="text-gradient-amber">VIK</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Explore", "Destinations", "Features", "Guides", "Safety"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-body text-muted-foreground hover:text-foreground">
            Sign in
          </Button>
          <Button size="sm" className="bg-gradient-amber text-primary-foreground font-display font-semibold shadow-amber hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4 mr-1" />
            Get App
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden px-6 pb-4 flex flex-col gap-3"
        >
          {["Explore", "Destinations", "Features", "Guides", "Safety"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button size="sm" className="bg-gradient-amber text-primary-foreground font-display font-semibold mt-2 w-full">
            <Download className="w-4 h-4 mr-1" />
            Get App
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
