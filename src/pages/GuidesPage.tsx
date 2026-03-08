import { motion } from "framer-motion";
import { BookOpen, Mountain, Compass, Thermometer, Backpack, Map, Footprints, Sun, CloudRain, TreePine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const guides = [
  {
    icon: Mountain,
    title: "High Altitude Trekking",
    description: "Everything you need to know about acclimatization, altitude sickness prevention, and thriving above 4,000m. Learn the golden rule of 'climb high, sleep low' and recognize early symptoms.",
    tips: ["Ascend no more than 500m per day above 3,000m", "Stay hydrated — drink 3-4 liters daily", "Carry Diamox as a preventive measure", "Never ignore persistent headaches or nausea"],
    difficulty: "Advanced",
  },
  {
    icon: Compass,
    title: "Navigation in the Wild",
    description: "Master map reading, compass navigation, and GPS usage for backcountry adventures. Learn to navigate when technology fails and trust your instincts.",
    tips: ["Always carry a physical map as backup", "Learn to read topographic contour lines", "Use natural landmarks for orientation", "Practice triangulation with a compass"],
    difficulty: "Moderate",
  },
  {
    icon: Backpack,
    title: "Packing for Multi-Day Treks",
    description: "The art of packing light without sacrificing safety. Comprehensive gear lists for different climates, terrains, and durations.",
    tips: ["Base weight should be under 10kg", "Layer clothing — avoid cotton", "Pack rain gear regardless of forecast", "Test all gear before departure"],
    difficulty: "Beginner",
  },
  {
    icon: Thermometer,
    title: "Weather Reading & Forecasting",
    description: "Understand cloud formations, wind patterns, and barometric pressure changes to predict weather shifts on the trail.",
    tips: ["Lenticular clouds signal incoming storms", "Morning fog usually means a clear day ahead", "Rapidly dropping pressure indicates bad weather", "Always check forecasts 48 hours before departure"],
    difficulty: "Moderate",
  },
  {
    icon: TreePine,
    title: "Leave No Trace Principles",
    description: "The seven principles of outdoor ethics that protect wilderness areas for future generations. Essential knowledge for every responsible adventurer.",
    tips: ["Plan ahead and prepare", "Travel and camp on durable surfaces", "Dispose of waste properly", "Leave what you find — take only photos"],
    difficulty: "Beginner",
  },
  {
    icon: Sun,
    title: "Desert & Arid Trekking",
    description: "Surviving and thriving in extreme heat. Water management, sun protection, and navigating featureless terrain.",
    tips: ["Carry minimum 1 liter per hour of hiking", "Hike during dawn and dusk — rest midday", "Wear loose, light-colored clothing", "Know the signs of heat exhaustion vs heat stroke"],
    difficulty: "Advanced",
  },
  {
    icon: CloudRain,
    title: "Monsoon & Wet Season Hiking",
    description: "Techniques for hiking safely during rainy seasons. River crossings, leech prevention, and keeping gear dry in persistent rain.",
    tips: ["Waterproof everything in dry bags", "Avoid river crossings after heavy rain", "Use trekking poles for stability on muddy trails", "Start early — storms typically build in afternoons"],
    difficulty: "Challenging",
  },
  {
    icon: Footprints,
    title: "Trail Running Fundamentals",
    description: "Transition from road to trail with proper technique. Foot placement, downhill running, and building endurance on uneven terrain.",
    tips: ["Shorten your stride on technical terrain", "Look 3-4 steps ahead, not at your feet", "Build mileage gradually — 10% increase per week", "Invest in proper trail running shoes with grip"],
    difficulty: "Moderate",
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "bg-accent/30 text-accent-foreground",
  Moderate: "bg-primary/20 text-primary",
  Challenging: "bg-destructive/20 text-destructive",
  Advanced: "bg-destructive/30 text-destructive",
};

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="font-display font-bold text-4xl md:text-6xl">
              Trail <span className="text-gradient-amber">Guides</span>
            </h1>
          </div>
          <p className="font-body text-muted-foreground text-lg mb-12 max-w-2xl">
            Expert knowledge to keep you prepared, confident, and safe on every adventure. From beginner basics to advanced survival techniques.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <guide.icon className="w-6 h-6" />
                  </div>
                  <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor[guide.difficulty]}`}>
                    {guide.difficulty}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                  {guide.description}
                </p>
                <div className="space-y-2">
                  <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">Key Tips</span>
                  <ul className="space-y-1.5">
                    {guide.tips.map((tip) => (
                      <li key={tip} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default GuidesPage;
