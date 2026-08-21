import { Navigate, useLocation } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SUPPORT_EMAIL } from "@/config/site";

interface InfoSection {
  heading: string;
  body: string;
}

interface InfoPageContent {
  kicker: string;
  title: string;
  highlight: string;
  intro: string;
  sections: InfoSection[];
}

const CONTENT: Record<string, InfoPageContent> = {
  "/about": {
    kicker: "Company",
    title: "Built by people who",
    highlight: "go out",
    intro:
      "Dravik started as a shared field notebook between long-distance hikers and alpine guides. It grew into a planning platform for anyone heading somewhere the map stops being helpful.",
    sections: [
      {
        heading: "What we build",
        body: "A planning surface on the web and a companion app for the trail, sharing one account and one dataset so a route planned at home is already on the phone in the field.",
      },
      {
        heading: "How we work",
        body: "Every expedition entry is verified against trip reports, land-manager notices and community updates before it reaches the atlas. Conditions change, so records carry a last-checked date.",
      },
      {
        heading: "Who it's for",
        body: "Weekend walkers, thru-hikers, climbers, packrafters and the guides who take them out. If the plan matters more than the photo, Dravik is for you.",
      },
    ],
  },
  "/blog": {
    kicker: "Field dispatches",
    title: "Notes from the",
    highlight: "backcountry",
    intro:
      "Route breakdowns, gear teardowns and season reports written by the people who walked them. New dispatches land as expeditions wrap.",
    sections: [
      {
        heading: "Trip reports",
        body: "Full-length write-ups with elevation profiles, water availability and the parts that did not go to plan — the details that actually change a packing list.",
      },
      {
        heading: "Conditions digests",
        body: "Seasonal roundups on snowpack, river levels, permit windows and closures for the regions our community tracks most.",
      },
      {
        heading: "Gear in the field",
        body: "Long-term tests measured in kilometres and storms rather than unboxings.",
      },
    ],
  },
  "/careers": {
    kicker: "Company",
    title: "Work on tools that",
    highlight: "matter offline",
    intro:
      "We're a small, remote team split between product, mapping and field research. We hire people who ship carefully and test their own work outdoors.",
    sections: [
      {
        heading: "Engineering",
        body: "Offline-first mobile and web work: map rendering, sync, and battery-aware tracking. Deep experience with geospatial data is a plus, curiosity is required.",
      },
      {
        heading: "Field research",
        body: "Verify routes, water points and hazards, and keep the atlas honest. Involves real time on trail and rigorous note-taking.",
      },
      {
        heading: "How to apply",
        body: `Send a short note and anything you've built or walked to ${SUPPORT_EMAIL}. We read everything and reply either way.`,
      },
    ],
  },
  "/contact": {
    kicker: "Support",
    title: "Talk to the",
    highlight: "field desk",
    intro:
      "Questions about routes, accounts, app pairing or partnerships — one inbox, answered by the people who build the product.",
    sections: [
      {
        heading: "Support",
        body: `Account, sync or billing issues: ${SUPPORT_EMAIL}. Include your account email and the device you're pairing from and we can usually resolve it in one reply.`,
      },
      {
        heading: "Report a trail change",
        body: "Found a closure, a dry spring or a rerouted section? Send the coordinates and a date and we will update the atlas record.",
      },
      {
        heading: "Press and partnerships",
        body: `Guiding outfits, land managers and media: reach us at the same address with "partnership" in the subject line.`,
      },
    ],
  },
  "/privacy": {
    kicker: "Legal",
    title: "Privacy",
    highlight: "policy",
    intro:
      "Location data is the most sensitive thing we handle, so we collect as little of it as the product allows and never sell it.",
    sections: [
      {
        heading: "What we collect",
        body: "Account details you provide (email, display name), trips and saved destinations you create, and device records for apps you pair. Location is processed on your device unless you explicitly share a live location link.",
      },
      {
        heading: "How it is used",
        body: "To sync your plans between web and app, to show relevant expeditions, and to keep your account secure. We do not sell personal data or share it with advertisers.",
      },
      {
        heading: "Your control",
        body: `You can export or delete your account data at any time from the dashboard, or by writing to ${SUPPORT_EMAIL}. Deleting your account removes trips, saved destinations and paired devices.`,
      },
      {
        heading: "Security",
        body: "Data is stored with row-level access rules so records are readable only by their owner, and pairing codes expire minutes after they are generated.",
      },
    ],
  },
  "/terms": {
    kicker: "Legal",
    title: "Terms of",
    highlight: "service",
    intro:
      "Plain terms for using Dravik on the web and in the companion app. Using the service means you agree to them.",
    sections: [
      {
        heading: "Your account",
        body: "You are responsible for activity under your account and for keeping your credentials and pairing codes private. One account per person; do not share logins.",
      },
      {
        heading: "Safety disclaimer",
        body: "Route, weather and condition information is provided for planning only and can be out of date or wrong. You are responsible for your own judgement, equipment and safety in the backcountry.",
      },
      {
        heading: "Content you add",
        body: "Trip reports, reviews and photos remain yours. You grant us permission to display them in the product. We remove content that is unsafe, unlawful or deliberately misleading.",
      },
      {
        heading: "Changes",
        body: `We may update these terms as the product changes and will note material changes in the app. Questions go to ${SUPPORT_EMAIL}.`,
      },
    ],
  },
};

/** Renders the company and legal pages from a shared content map. */
const StaticInfoPage = () => {
  const { pathname } = useLocation();
  const content = CONTENT[pathname];

  if (!content) return <Navigate to="/404" replace />;

  return (
    <PageShell
      kicker={content.kicker}
      title={
        <>
          {content.title} <span className="text-gradient-amber">{content.highlight}</span>
        </>
      }
      intro={content.intro}
    >
      <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
        {content.sections.map((section) => (
          <article key={section.heading} className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <h2 className="font-display font-semibold text-lg text-foreground mb-2">{section.heading}</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{section.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default StaticInfoPage;
