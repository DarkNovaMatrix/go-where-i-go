import { motion } from "framer-motion";
import { Shield, AlertTriangle, Phone, Heart, Zap, Radio, MapPin, Siren, Bug, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const emergencyContacts = [
  { region: "International", number: "112", note: "Works in most countries via GSM" },
  { region: "India", number: "112 / 1363", note: "National Emergency / Disaster Management" },
  { region: "Nepal", number: "1144", note: "Nepal Police Tourist Helpline" },
  { region: "United States", number: "911", note: "Also text-enabled in most areas" },
  { region: "Europe (Alps)", number: "140 (Austria) / 112", note: "Mountain Rescue" },
  { region: "South America", number: "Varies", note: "Check local numbers before departure" },
];

const safetyTopics = [
  {
    icon: AlertTriangle,
    title: "Altitude Sickness (AMS)",
    severity: "Critical",
    content: "Acute Mountain Sickness can be life-threatening above 2,500m. Symptoms include headache, nausea, dizziness, and fatigue. Severe cases (HACE/HAPE) require immediate descent.",
    dos: ["Ascend gradually — max 500m/day above 3,000m", "Stay hydrated and avoid alcohol", "Descend immediately if symptoms worsen", "Carry Diamox and know dosage"],
    donts: ["Never ignore persistent headaches at altitude", "Don't push through symptoms to 'tough it out'", "Don't ascend further while symptomatic", "Don't sleep at altitude after rapid ascent"],
  },
  {
    icon: Zap,
    title: "Lightning & Thunderstorms",
    severity: "Critical",
    content: "Mountain storms can develop rapidly. Lightning is the leading weather-related killer in outdoor recreation. Know the 30/30 rule: if thunder follows lightning by less than 30 seconds, seek shelter.",
    dos: ["Descend from ridges and summits immediately", "Crouch low on insulating material if caught out", "Spread out if in a group (30m apart)", "Start hikes early to avoid afternoon storms"],
    donts: ["Never shelter under isolated trees", "Don't lie flat on the ground", "Don't stay near metal objects or water", "Don't wait to see if the storm will pass"],
  },
  {
    icon: Bug,
    title: "Wildlife Encounters",
    severity: "Moderate",
    content: "From bears to snakes to leeches — knowing how to handle wildlife encounters can prevent injuries. Most animals avoid humans, but surprising them creates dangerous situations.",
    dos: ["Make noise while hiking to alert animals", "Store food in bear canisters or hang it", "Give all wildlife at least 30m of space", "Know the difference between black and grizzly bear responses"],
    donts: ["Never run from a bear — back away slowly", "Don't feed or approach wild animals", "Don't hike with headphones in wildlife areas", "Don't leave food scraps at campsites"],
  },
  {
    icon: Heart,
    title: "Hypothermia & Cold Injuries",
    severity: "Critical",
    content: "Hypothermia can occur even in mild temperatures (10°C) when wet and windy. It's the #1 killer in the wilderness. Frostbite affects extremities first — fingers, toes, nose, and ears.",
    dos: ["Layer with moisture-wicking base layers", "Change wet clothing immediately", "Carry emergency bivy or space blanket always", "Eat high-calorie foods to maintain body heat"],
    donts: ["Never wear cotton in cold/wet conditions", "Don't ignore shivering — it's an early warning", "Don't rub frostbitten skin", "Don't drink alcohol to 'warm up'"],
  },
  {
    icon: Flame,
    title: "Campfire Safety & Wildfires",
    severity: "Moderate",
    content: "Campfires cause thousands of wildfires annually. Always check local fire regulations and restrictions before your trip. Many wilderness areas ban open fires during dry seasons.",
    dos: ["Use established fire rings when available", "Keep fires small and manageable", "Fully extinguish fires — drown, stir, feel for heat", "Carry a lightweight stove as an alternative"],
    donts: ["Never leave a fire unattended", "Don't build fires in windy conditions", "Don't burn trash or plastics", "Don't start fires during fire bans — fines are severe"],
  },
  {
    icon: MapPin,
    title: "Getting Lost & Navigation Failure",
    severity: "Moderate",
    content: "GPS devices and phones can fail. Battery death, signal loss, and screen damage are common. Always carry backup navigation and know how to use it.",
    dos: ["Carry physical map and compass as backup", "Tell someone your exact route and expected return", "Stay on marked trails when possible", "If lost: STOP — Sit, Think, Observe, Plan"],
    donts: ["Don't rely solely on phone GPS", "Don't leave the trail to 'shortcut'", "Don't panic — most lost hikers are found within 24h", "Don't split up from your group"],
  },
];

const severityColor: Record<string, string> = {
  Critical: "bg-destructive/20 text-destructive border-destructive/30",
  Moderate: "bg-primary/20 text-primary border-primary/30",
};

const SafetyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-display font-bold text-4xl md:text-6xl">
              Safety <span className="text-gradient-amber">Center</span>
            </h1>
          </div>
          <p className="font-body text-muted-foreground text-lg mb-12 max-w-2xl">
            Your life matters more than any summit. Essential safety knowledge, emergency protocols, and survival techniques for every adventurer.
          </p>

          {/* Emergency Contacts Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 mb-12 border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">Emergency Contacts</h2>
                <p className="font-body text-sm text-muted-foreground">Save these before every trip</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {emergencyContacts.map((c) => (
                <div key={c.region} className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-display font-semibold text-sm text-foreground">{c.region}</span>
                    <p className="font-body text-xs text-muted-foreground">{c.note}</p>
                  </div>
                  <span className="font-display font-bold text-lg text-primary">{c.number}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SOS Feature Callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-r from-destructive/10 to-primary/10 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <Siren className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">One-Tap SOS in the App</h3>
              <p className="font-body text-sm text-muted-foreground">
                Download the Dravik app for instant SOS alerts with GPS coordinates, offline emergency protocols, and real-time safety notifications. Your safety net when there's no signal.
              </p>
            </div>
            <button className="bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-full whitespace-nowrap hover:bg-primary/90 transition-colors">
              Download App
            </button>
          </motion.div>

          {/* Safety Topics */}
          <div className="space-y-8">
            {safetyTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <topic.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-foreground">{topic.title}</h3>
                    </div>
                  </div>
                  <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full border ${severityColor[topic.severity]}`}>
                    {topic.severity}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">{topic.content}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="font-body text-xs font-semibold text-accent-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <span className="w-2 h-2 rounded-full bg-accent" /> Do's
                    </span>
                    <ul className="space-y-2">
                      {topic.dos.map((d) => (
                        <li key={d} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">✓</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-body text-xs font-semibold text-destructive uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <span className="w-2 h-2 rounded-full bg-destructive" /> Don'ts
                    </span>
                    <ul className="space-y-2">
                      {topic.donts.map((d) => (
                        <li key={d} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive mt-0.5">✗</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default SafetyPage;
