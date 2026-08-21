import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ExplorePage from "./pages/ExplorePage";
import DestinationPage from "./pages/DestinationPage";
import DashboardPage from "./pages/DashboardPage";
import GuidesPage from "./pages/GuidesPage";
import SafetyPage from "./pages/SafetyPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import DownloadPage from "./pages/DownloadPage";
import DocsPage from "./pages/DocsPage";
import CommunityPage from "./pages/CommunityPage";
import StaticInfoPage from "./pages/StaticInfoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/destination/:slug" element={<DestinationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
