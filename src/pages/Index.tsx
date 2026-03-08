import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExploreSearchSection from "@/components/ExploreSearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import StatsSection from "@/components/StatsSection";
import TrendingSection from "@/components/TrendingSection";
import FeaturesSection from "@/components/FeaturesSection";
import InteractiveMapSection from "@/components/InteractiveMapSection";
import WildCompassSection from "@/components/WildCompassSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import PerfectForSection from "@/components/PerfectForSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ParticleCursor from "@/components/ParticleCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ParticleCursor />
      <Navbar />
      <HeroSection />
      <ExploreSearchSection />
      <CategoriesSection />
      <StatsSection />
      <TrendingSection />
      <InteractiveMapSection />
      <FeaturesSection />
      <WildCompassSection />
      <AppShowcaseSection />
      <PerfectForSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
