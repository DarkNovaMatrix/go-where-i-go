import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageShellProps {
  kicker?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}

/** Shared layout for the secondary/marketing/legal pages. */
const PageShell = ({ kicker, title, intro, children }: PageShellProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-14"
        >
          {kicker && (
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">{kicker}</span>
          )}
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-4">{title}</h1>
          {intro && <p className="font-body text-lg text-muted-foreground leading-relaxed">{intro}</p>}
        </motion.header>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default PageShell;
