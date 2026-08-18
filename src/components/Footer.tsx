import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const links: Record<string, { label: string; to: string }[]> = {
  Product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Downloads", to: "/download" },
    { label: "Live Atlas", to: "/explore" },
  ],
  Learn: [
    { label: "Guides", to: "/guides" },
    { label: "Documentation", to: "/docs" },
    { label: "Safety", to: "/safety" },
    { label: "Community", to: "/community" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Contact", to: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Mountain className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-foreground">
                DRA<span className="text-gradient-amber">VIK</span>
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Your expedition companion. Built for the wild.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <nav key={category} aria-label={category}>
              <h2 className="font-display font-semibold text-foreground mb-4 text-sm">{category}</h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={`${category}-${item.label}`}>
                    <Link
                      to={item.to}
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">© 2026 Dravik. Built for the wild.</p>
          <p className="font-body text-xs text-muted-foreground">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
