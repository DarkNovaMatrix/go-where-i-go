import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PerfectForSection from "@/components/PerfectForSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PerfectForSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
