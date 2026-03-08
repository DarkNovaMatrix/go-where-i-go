import { Mountain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">
              DRA<span className="text-gradient-amber">VIK</span>
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Dravik. Built for the wild.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
