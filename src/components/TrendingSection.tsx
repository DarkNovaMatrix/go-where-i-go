import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import destPatagonia from "@/assets/dest-patagonia.jpg";
import destNepal from "@/assets/dest-nepal.jpg";
import destIceland from "@/assets/dest-iceland.jpg";
import destAlps from "@/assets/dest-alps.jpg";

const destinations = [
  {
    title: "Patagonia Circuit",
    location: "Argentina & Chile",
    image: destPatagonia,
    rating: 4.9,
    reviews: 2847,
    difficulty: "Advanced",
    duration: "10-14 days",
    tag: "Trending",
  },
  {
    title: "Everest Base Camp",
    location: "Nepal",
    image: destNepal,
    rating: 4.8,
    reviews: 5621,
    difficulty: "Challenging",
    duration: "12-16 days",
    tag: "Most Popular",
  },
  {
    title: "Laugavegur Trail",
    location: "Iceland",
    image: destIceland,
    rating: 4.9,
    reviews: 1893,
    difficulty: "Moderate",
    duration: "4-6 days",
    tag: "Editor's Pick",
  },
  {
    title: "Tour du Mont Blanc",
    location: "Swiss Alps",
    image: destAlps,
    rating: 4.7,
    reviews: 4102,
    difficulty: "Moderate",
    duration: "7-11 days",
    tag: "Classic",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TrendingSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
              Trending Now
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl">
              Top <span className="text-gradient-amber">expeditions</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 font-body text-primary hover:text-foreground transition-colors"
          >
            View all expeditions
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div key={dest.title} variants={item}>
              <TiltCard className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground font-body text-xs font-semibold px-3 py-1 rounded-full">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 glass-card rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="font-body text-xs text-foreground">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {dest.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="font-body text-sm text-muted-foreground">{dest.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className="font-body text-xs text-accent-foreground bg-accent/30 px-2 py-1 rounded">
                        {dest.difficulty}
                      </span>
                      <span className="font-body text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {dest.duration}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-3">
                    {dest.reviews.toLocaleString()} reviews
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSection;
