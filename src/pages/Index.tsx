import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExploreSearchSection from "@/components/ExploreSearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import StatsSection from "@/components/StatsSection";
import TrendingSection from "@/components/TrendingSection";
import FeaturesSection from "@/components/FeaturesSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import PerfectForSection from "@/components/PerfectForSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExploreSearchSection />
      <CategoriesSection />
      <StatsSection />
      <TrendingSection />
      <IconicPlacesSection />
      <WildAwardsSection />
      <NearYouSection />
      <InterestPicksSection />
      <FeaturesSection />
      <AppShowcaseSection />
      <PerfectForSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
