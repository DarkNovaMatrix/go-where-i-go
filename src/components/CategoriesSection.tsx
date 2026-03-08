import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import catTrekking from "@/assets/cat-trekking.jpg";
import catMountaineering from "@/assets/cat-mountaineering.jpg";
import catCamping from "@/assets/cat-camping.jpg";
import catWater from "@/assets/cat-water.jpg";
import catClimbing from "@/assets/cat-climbing.jpg";
import catCycling from "@/assets/cat-cycling.jpg";

const categories = [
  { title: "Trekking", image: catTrekking, count: "2,400+ trails" },
  { title: "Mountaineering", image: catMountaineering, count: "850+ peaks" },
  { title: "Camping", image: catCamping, count: "1,200+ spots" },
  { title: "Water Sports", image: catWater, count: "600+ routes" },
  { title: "Rock Climbing", image: catClimbing, count: "900+ walls" },
  { title: "Mountain Biking", image: catCycling, count: "1,800+ trails" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategoriesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Explore by Interest
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Whatever you're into, <span className="text-gradient-amber">we've got it</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={item}>
              <TiltCard className="rounded-2xl overflow-hidden cursor-pointer group h-64 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {cat.title}
                  </h3>
                  <p className="font-body text-xs text-primary">{cat.count}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
