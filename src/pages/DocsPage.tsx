import PageShell from "@/components/PageShell";

const sections = [
  {
    title: "Getting started",
    items: [
      ["Create an account", "Sign up with email and password from the sign-in page. A profile is created automatically and holds your saved places, trips and preferences."],
      ["Pair the mobile app", "Open Dashboard → Device sync, generate a 5-minute pairing code, then scan the QR code in the app. Codes are single-use."],
      ["Save your first destination", "Open any destination and tap Save. Saved items appear in the dashboard and on the app instantly."],
    ],
  },
  {
    title: "Planning trips",
    items: [
      ["Trips", "A trip links a destination, dates, notes and a gear checklist. Set it public to share a read-only view."],
      ["Gear checklists", "Stored as a structured list on each trip, so ticking an item on the phone updates the web instantly."],
      ["Offline maps", "Downloaded per region in the app. Tiles come from OpenStreetMap and OpenTopoMap."],
    ],
  },
  {
    title: "Data & privacy",
    items: [
      ["Your data", "Profiles, trips, saved places and pairing codes are readable only by you, enforced at the database level."],
      ["Public data", "The destination and category catalog is public read-only content."],
      ["Deleting data", "Delete a trip or saved place any time; account deletion requests go through the contact page."],
    ],
  },
];

const DocsPage = () => (
  <PageShell
    kicker="Documentation"
    title={
      <>
        How <span className="text-gradient-amber">Dravik</span> works
      </>
    }
    intro="Short, practical documentation for the web app, the companion app and the shared account that connects them."
  >
    <div className="space-y-10 max-w-4xl">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-4">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map(([title, body]) => (
              <article key={title} className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  </PageShell>
);

export default DocsPage;
