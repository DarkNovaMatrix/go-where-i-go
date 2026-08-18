import { motion } from "framer-motion";
import { MapPin, Search, Crosshair, Layers, Compass, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestinations } from "@/hooks/useDestinations";
import WorldMap, { type MapPoint } from "@/components/WorldMap";
import SmartImage from "@/components/SmartImage";
import { buildPlaceQuery } from "@/lib/media";

const DIFFICULTIES = ["All", "Easy", "Moderate", "Hard", "Expert"];

const InteractiveMapSection = () => {
  const navigate = useNavigate();
  const { data: destinations, isLoading } = useDestinations({});
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [focused, setFocused] = useState<MapPoint | null>(null);
  const [locateRequest, setLocateRequest] = useState(0);

  const points = useMemo<MapPoint[]>(() => {
    return (destinations || [])
      .filter((d: any) => typeof d.latitude === "number" && typeof d.longitude === "number")
      .filter((d: any) => (difficulty === "All" ? true : d.difficulty === difficulty))
      .filter((d: any) => {
        if (!query.trim()) return true;
        const haystack = `${d.title} ${d.country ?? ""} ${d.location ?? ""} ${d.continent ?? ""}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
      .map((d: any) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        country: d.country,
        location: d.location,
        difficulty: d.difficulty,
        rating: d.avg_rating,
        imageUrl: d.image_url,
        latitude: d.latitude,
        longitude: d.longitude,
      }));
  }, [destinations, difficulty, query]);

  return (
    <section id="map" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">Live atlas</span>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-4">
            Explore the <span className="text-gradient-amber">world</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            A real, zoomable world map — pan anywhere, switch to terrain or satellite, and open any expedition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 max-w-6xl mx-auto">
          {/* Control panel */}
          <div className="glass-card rounded-2xl p-4 flex flex-col gap-4 h-[560px]">
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any place on earth..."
                className="w-full bg-muted rounded-xl pl-9 pr-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-3 py-1 rounded-full font-body text-xs transition-colors ${
                    difficulty === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setLocateRequest((n) => n + 1)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-muted py-2 font-body text-xs text-foreground hover:bg-muted/70 transition-colors"
              >
                <Crosshair className="w-3.5 h-3.5 text-primary" /> Near me
              </button>
              <button
                onClick={() => setFocused(points[Math.floor(Math.random() * points.length)] ?? null)}
                disabled={!points.length}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-muted py-2 font-body text-xs text-foreground hover:bg-muted/70 transition-colors disabled:opacity-40"
              >
                <Compass className="w-3.5 h-3.5 text-primary" /> Surprise me
              </button>
            </div>

            <p className="font-body text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Layers className="w-3 h-3" /> {points.length} expeditions plotted
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {isLoading && <p className="font-body text-sm text-muted-foreground">Loading atlas…</p>}
              {!isLoading && !points.length && (
                <p className="font-body text-sm text-muted-foreground">No expeditions match that search yet.</p>
              )}
              {points.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setFocused(point)}
                  className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                    focused?.id === point.id ? "bg-primary/15" : "hover:bg-muted"
                  }`}
                >
                  <SmartImage
                    src={point.imageUrl}
                    query={buildPlaceQuery(point)}
                    alt={point.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-sm text-foreground truncate">
                      {point.title}
                    </span>
                    <span className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {point.country}
                      {typeof point.rating === "number" && point.rating > 0 && (
                        <>
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          {point.rating.toFixed(1)}
                        </>
                      )}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Real map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden h-[560px] relative"
          >
            <WorldMap
              points={points}
              focused={focused}
              locateRequest={locateRequest}
              onLocateDone={() => undefined}
              className="w-full h-full"
            />
            {focused && (
              <div className="absolute left-4 bottom-4 z-[500] glass-card rounded-xl p-3 flex items-center gap-3 max-w-xs">
                <SmartImage
                  src={focused.imageUrl}
                  query={buildPlaceQuery(focused)}
                  alt={focused.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground truncate">{focused.title}</p>
                  <p className="font-body text-xs text-muted-foreground truncate">{focused.location || focused.country}</p>
                  <button
                    onClick={() => navigate(`/destination/${focused.slug}`)}
                    className="font-body text-xs text-primary hover:underline"
                  >
                    Open expedition →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
