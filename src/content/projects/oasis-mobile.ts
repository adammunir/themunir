import type { Project, Shot } from "../types";

/** A 393×852 phone frame exported from the Oasis mobile design file at 3×. */
const s = (name: string, alt: string, title?: string, height = 2556): Shot => ({
  src: `/work/oasis-mobile/figma/${name}.webp`,
  width: 1179,
  height,
  alt,
  title,
});

export const oasisMobile: Project = {
  slug: "oasis-mobile",
  title: "Toro Oasis",
  tagline:
    "A smart-irrigation app that a contractor sets up in the field and a homeowner lives with for years, so every screen is designed for both.",
  accent: "#3FD0E0",
  year: "2025 — 2026",
  role: "UX lead · researcher and designer for mobile and tablet",
  owned: ["Research", "UX", "UI", "Prototyping", "Design system", "Content", "AI"],
  team: "UX lead, working with the iOS, Android, web, and cloud engineering teams",
  duration: "Phase 1 launch through Phase 2 design",
  platforms: ["iOS", "Android", "iPadOS"],
  stack: ["Figma", "Clickable prototypes", "Design system", "Native iOS & Android (mobile teams)", "Product analytics", "AI-assisted localization"],
  cover: {
    kind: "reel",
    variant: "wall",
    src: "reel:oasis-mobile",
    alt: "A slowly drifting wall of Toro Oasis screens: the dashboard, controller setup, zone mapping on a satellite yard, and the TRUE ET questions.",
    shots: [
      "hero-01-dashboard-watering-now", "zonedraw-04-draw-border", "trueet-03-vegetation-type", "onboarding-01-connect-controller",
      "hero-03-precision-control", "zonedraw-03-zone-selected", "trueet-01-select-zones", "onboarding-04-system-testing",
      "hero-05-track-every-drop", "zonedraw-05-zone-mapped", "trueet-04-soil-type", "invite-02-savings-on-autopilot",
      "onboarding-03-setup-zones", "zonedraw-01-zone-details", "trueet-02-hardware-type", "invite-01-spatial-zone-mapping",
      "onboarding-05-congratulations", "invite-04-create-account",
    ].map((n) => ({ src: `/work/oasis-mobile/figma/${n}.webp`, width: 1179, height: 2556, alt: "" })),
  },
  showcase: [
    { kind: "statement", text: "A contractor sets it up once. A homeowner lives with it *for years.* Every screen has to work for both." },
    {
      kind: "exploded",
      eyebrow: "One app, two jobs",
      title: "What it's doing now. Why. And what's next.",
      body: "Live watering, the reason a run was paused, and where each zone sits in the yard. The home screen answers the homeowner's three questions before they ask.",
      device: "phone",
      shots: [
        s("hero-01-dashboard-watering-now", "Homeowner dashboard with a live “Watering now” banner and the next run.", "Watering now"),
        s("hero-03-precision-control", "Precision Control sheet explaining why watering is paused, with a four-day rain outlook.", "Why it paused"),
        s("hero-02-place-zones-on-map", "Zone badges placed on a satellite map of the property.", "Zones on the map"),
        s("hero-05-track-every-drop", "Welcome card with an evapotranspiration adjustment chart.", "Track every drop"),
      ],
    },
    {
      kind: "phone-walk",
      eyebrow: "Map zones · five steps",
      title: "Put every valve where it really is.",
      steps: [
        { shot: s("zonedraw-01-zone-details", "Zone details with a Map Zone call to action over a satellite thumbnail."), heading: "Start from the zone", body: "Zone details offers Map Zone right where the installer is already working, over a satellite preview of the property." },
        { shot: s("zonedraw-02-place-zone", "A tray of numbered zone badges below the satellite map.", undefined, 2538), heading: "Drag, don't type", body: "Numbered, colour-coded badges wait in a tray. One line of hint text teaches drag-and-place without a tutorial." },
        { shot: s("zonedraw-03-zone-selected", "A selected zone badge with a coverage halo."), heading: "See what you're editing", body: "The selected zone grows a coverage halo, so there's never a doubt which valve you're moving." },
        { shot: s("zonedraw-04-draw-border", "Drawing a zone border with Undo and Done."), heading: "Draw the border", body: "While drawing, the toolbar swaps to Undo and Done. It only offers what's useful in the current mode." },
        { shot: s("zonedraw-05-zone-mapped", "Zone details showing the finished outline as a thumbnail."), heading: "Close the loop", body: "The outline comes back to zone details as a thumbnail with Edit Zone. Borders are designed ahead: today the app places zone points." },
      ],
    },
    {
      kind: "phone-walk",
      eyebrow: "TRUE ET wizard",
      title: "Agronomy, asked in plain language.",
      steps: [
        { shot: s("trueet-01-select-zones", "Select the zones to configure, with select-all."), heading: "Pick the zones", body: "The wizard confirms what it will change before it asks anything, with select-all for bulk work." },
        { shot: s("trueet-02-hardware-type", "Hardware type as large icon cards with an “I'm not sure” default."), heading: "No jargon required", body: "Large icon cards and an “I'm not sure” default. Nobody gets stuck because they don't know a nozzle model." },
        { shot: s("trueet-03-vegetation-type", "Vegetation types in everyday language with examples."), heading: "Everyday words", body: "Plant categories with examples, and a banner that says what the choice actually changes." },
        { shot: s("trueet-04-soil-type", "Soil type as swatches with one-line drainage descriptions."), heading: "Pick a texture", body: "Soil swatches with one line about drainage turn a technical input into a visual choice." },
        { shot: s("trueet-05-zone-profile-complete", "Zone profile summary of watering days, runtime, and cycle-and-soak.", undefined, 3310), heading: "Show the result", body: "A summary of watering days, runtime, and cycle-and-soak shows what the answers produced. Experts can still open Advanced." },
      ],
    },
    {
      kind: "wall",
      eyebrow: "The whole surface",
      title: "Setup, invites, wizards, maps, and tablet, in one system.",
      body: "Controller pairing, the invite and handover flow, the TRUE ET wizard, and zone mapping all share one set of sheets, cards, and action bars.",
      count: "248",
      device: "phone",
      shots: [
        s("onboarding-01-connect-controller", "Connect controller"),
        s("onboarding-02-having-issues", "Having issues?"),
        s("onboarding-03-setup-zones", "Set up zones in bulk"),
        s("onboarding-04-system-testing", "System testing"),
        s("onboarding-05-congratulations", "Setup complete"),
        s("invite-01-spatial-zone-mapping", "Welcome: spatial zone mapping"),
        s("invite-02-savings-on-autopilot", "Welcome: savings on autopilot"),
        s("invite-03-find-your-invite", "Find your invite"),
        s("invite-04-create-account", "Create account"),
        s("hero-01-dashboard-watering-now", "Watering now"),
        s("hero-03-precision-control", "Precision Control"),
        s("trueet-02-hardware-type", "Hardware type"),
        s("trueet-04-soil-type", "Soil type"),
        s("zonedraw-03-zone-selected", "Zone selected"),
        s("zonedraw-04-draw-border", "Draw the border"),
      ],
    },
  ],
  headline: { value: "248", label: "mobile screens in one design system, for the contractor who sets it up and the homeowner who inherits it." },
  tldr: {
    problem:
      "Smart irrigation was hardware-first: pairing over Bluetooth in a yard, setting zones and programs by number, and a handover to the homeowner that was an afterthought. Two very different people use the same system, and the old app served neither well.",
    did:
      "I led UX research and design for the Oasis mobile and tablet apps, grounded in 15 homeowner interviews, 50+ beta sessions, and 100+ hours of support and sales calls: controller pairing, role-aware dashboards, the invite and ownership handover, a plain-language TRUE ET wizard, and zones placed on a satellite map. I also built the pieces around the app: the localization pipeline and the analytics that pinned down field failures.",
    result:
      "The app shipped on iOS, Android, and iPadOS. The design system covers 248 mobile screens, the localization pipeline validated about 4,500 translations in four languages, and Phase 2 is designed ahead with every page marking what the app does today.",
  },
  context: [
    "Toro Oasis lets <strong>landscape contractors</strong> set up smart controllers for their clients, then hand the property to a <strong>homeowner</strong> or family. The contractor wants speed and repeatability across dozens of jobs. The homeowner wants to know what the system is doing and to trust it.",
    "The app had to carry both. It also had to work standing in a yard, on a phone, pairing over Bluetooth, with a client watching.",
    "Before I drew anything, I went looking for where people struggled: homeowner interviews, beta session replays, and months of support and sales calls. The design follows that evidence screen by screen.",
    "I led UX across Oasis: the research, the flows, the visual design, and the prototypes. The native app code belongs to the mobile teams, and I don't claim it. What I built sat around the app: localization, analytics, and the audits that kept design and build honest with each other.",
  ],
  process: [
    {
      phase: "Discover",
      did: "I worked with product and sales to study contractors and homeowners in context. That meant 15 homeowner interviews across new installs and retrofits, 50+ beta sessions reviewed through analytics and session replays, and more than 100 hours of support-call notes and sales feedback.",
      artifacts: ["Contractor and homeowner journey map", "Beta session replay review", "Support and sales call synthesis"],
      changed: "Friction clustered in three moments: setup on site, the handoff conversation, and the first alert. I designed around those moments, not around a feature list.",
    },
    {
      phase: "Synthesize",
      did: "I distilled the research into three personas (lead contractor, crew technician, homeowner) and three pillars: own the property record, design the handoff, make service predictable. Any request that didn't improve one of the three moved down the roadmap.",
      artifacts: ["3 personas", "Three-pillar UX framework", "Prioritization rule"],
      changed: "Oasis stopped being an app that controls a device. It became a shared record that a contractor and a homeowner both read.",
    },
    {
      phase: "Audit the shipped app",
      when: "March 2026",
      did: "I mapped the iOS app screen by screen: 15 primary flows, a 5-step setup wizard, Bluetooth pairing into Wi-Fi, and dashboards that switch by role at runtime. Then I checked the flows against Nielsen's ten heuristics and walked the key tasks step by step.",
      artifacts: ["15-flow screen audit", "Heuristic evaluation", "Cognitive walkthrough notes"],
      changed: "The dashboards were already chosen by role. I designed with that split instead of fighting it.",
    },
    {
      phase: "Read the field data",
      when: "March 2026",
      did: "A field report said a controller wouldn't join Wi-Fi. I built an investigation dashboard the same day and cut every Bluetooth setup failure by time, device, and app build. In the same pass I audited events for missing roles and for web and iOS counting one person twice.",
      artifacts: ["Failure investigation dashboard", "Analytics event audit", "Identity and role model"],
      changed: "The failures behind the report sat in one three-hour window, on one tablet model and one app build. I left setup alone, chased that build, and fixed analytics so failures could be read by role.",
    },
    {
      phase: "Explore and prototype",
      did: "I redesigned the flows around those moments as annotated, clickable prototypes: a controller onboarding proposal, a plain-language TRUE ET wizard, Precision Control rebuilt to explain every pause, and zone drawing on a satellite map. I set interaction timing in the prototypes, 350 ms for a sheet and 250 ms for a pin select.",
      artifacts: ["Annotated clickable prototypes", "Onboarding assessment board", "50 TRUE ET sheet states", "Contractor map view spec"],
      changed: "The contractor's path became bulk first. The homeowner's path became one plain question per screen, with a safe default.",
    },
    {
      phase: "Systemize and document",
      did: "I pulled the work into one set of sheets, cards, and action bars across 248 mobile screens. Every Phase 2 page opens with what the app does today and what is designed ahead. I also audited strings on both platforms, 975 on iOS against 160 on Android with no shared keys, and wrote an irrigation glossary for four languages.",
      artifacts: ["248-screen design system", "“In the app today” headers", "String parity audit", "Irrigation glossary"],
      changed: "Design stopped promising what the app couldn't do yet, and the two apps stopped saying different things to the same person.",
    },
  ],
  research: {
    methods: [
      "Homeowner interviews (15)",
      "Beta session replays (50+)",
      "Support and sales call review (100+ hours)",
      "Journey mapping",
      "iOS screen-flow audit (15 flows)",
      "Field-failure analysis",
      "Heuristic evaluation",
      "Cognitive walkthrough",
      "Annotated prototypes",
    ],
    findings: [
      {
        title: "Friction lives in three moments.",
        body: "Mapping the contractor and homeowner journey together showed the trouble clustered at setup on site, the handoff conversation, and the first “something's wrong” alert. Without a shared record, every service call started from scratch.",
      },
      {
        title: "Two people, one system.",
        body: "The contractor configures and the homeowner inherits, and each needs a different first screen. The screen-flow audit mapped 15 primary flows and found the dashboards were already chosen by role at runtime, so the design could lean into that instead of fighting it.",
      },
      {
        title: "Replays show what testing misses.",
        body: "Session replays exposed hesitation on zone naming, confusion at controller pairing, and repeated back-taps in the setup wizard. None of it came up in a conversation. Phase 2 onboarding started at those screens.",
      },
      {
        title: "Setup fails in the field, not in the lab.",
        body: "When a field report said a controller wouldn't join Wi-Fi, analytics showed the failures behind it in a single three-hour window, on one tablet model and one app build. A vague complaint became one device and one build to chase, instead of a redesign of setup.",
      },
      {
        title: "Jargon is a wall.",
        body: "TRUE ET needs crop, soil, sun, and slope. Contractors know those terms; homeowners don't. Every question needed an everyday phrasing and a safe “I'm not sure” default, so nobody stalls on a word.",
      },
      {
        title: "Automation needs a visible reason.",
        body: "The existing Precision Control panel was hard to reach and didn't save its choices, so a skipped run had no explanation in the app. A skipped run left people guessing. The redesign starts by saying why.",
      },
      {
        title: "Onboarding was a 30-screen chain.",
        body: "The audit counted about 30 screens, five single-button milestone screens, and a hard Zones, Programs, Testing order. The proposal is scan, apply, test, with an express lane and a prompt to save the setup as a preset. It is a proposal, not shipped.",
      },
    ],
    quote: {
      text: "I'm juggling pictures, notes, and three apps just to remember what I installed last week.",
      who: "Irrigation and lighting contractor",
    },
  },
  insight: "The pro sets it up and leaves.\nThe homeowner <em>inherits it</em>\nand has to trust it.",
  design: {
    intro:
      "Oasis uses one visual language: a black action bar with a single primary button, Toro red as the only brand accent, cyan for anything live, and a colour per zone that follows it from list to map.",
    decisions: [
      {
        title: "Hand over a summary, not a walkthrough.",
        context: "The handoff was a verbal walk through the system that a homeowner forgot within a week. It was also the moment that decided whether they trusted it.",
        choice: "A homeowner-friendly property summary with simple pause and skip controls and clear expectations for alerts, built from the setup the contractor already did.",
        rejected: "Leaving the handoff to the contractor's memory and a conversation in the driveway.",
        why: "I reframed the job from explaining the system to showing the homeowner what is protected.",
      },
      {
        title: "Every setup step saves on its own.",
        context: "Contractors told us they lose signal mid-setup regularly.",
        choice: "Progressive setup: capture the property first, then zones and fixtures, then pair controllers, with each step saved and resumable.",
        rejected: "One long form that only saves when it's finished.",
        why: "A flow that needs completion to save loses data on every bad connection. A pro in a yard can't afford that.",
      },
      {
        title: "One question per screen, with a safe default.",
        context: "TRUE ET asks for agronomy inputs most homeowners have never heard of.",
        choice: "A wizard that asks one plain-language question per screen, with “I'm not sure” as a valid answer and Advanced Settings for experts.",
        rejected: "One long settings form with technical labels.",
        why: "A sensible default keeps people moving, and the summary at the end shows what their answers produced.",
      },
      {
        title: "Bottom sheets are the main layer.",
        context: "Status, help, filters, and sliders all compete for one small screen in a yard.",
        choice: "Sheets with defined detents (peek, half, full), with motion timed per interaction: 350 ms for a sheet, 250 ms for a pin select.",
        rejected: "Pushing a new screen for every detail.",
        why: "The map stays visible underneath, so people keep their place on the property while they act.",
      },
      {
        title: "Explain the pause.",
        context: "A run skipped for weather had no explanation in the app.",
        choice: "Precision Control names the exact trigger: a rain chance over 80%, 0.10 in of rain in 24 hours, or sustained wind over 9 mph, next to a four-day outlook and Edit Controls.",
        rejected: "A silent skip with a generic status.",
        why: "Automation people can read is automation they can leave on.",
      },
      {
        title: "Bulk first.",
        context: "Contractors set up many zones on every job. The design frame shows 22.",
        choice: "Select-all with a floating action bar applies Map Zones or TRUE ET to every zone at once, and system testing has a single Test All.",
        rejected: "Per-zone setup repeated zone by zone.",
        why: "The fastest flow for the pro is also the one with the fewest chances to miss a zone.",
      },
      {
        title: "Test before you tune.",
        context: "The audit found a 30-screen onboarding chain with five single-button milestone screens and a fixed Zones, Programs, Testing order.",
        choice: "A proposal built on scan, apply, test: an express lane of six screens, system testing before any tuning, and an offer to save the finished setup as a preset.",
        rejected: "Polishing the existing chain screen by screen.",
        why: "Contractors repeat setup on every job. Cutting the path matters more than prettying it. This is a proposal, not shipped.",
      },
    ],
  },
  engineering: {
    intro:
      "During setup the app talks to the controller over a short-range wireless link, and after that the controller reports through a cloud device hub. I didn't build the app. I built the layer around it that keeps it understandable in four languages and measurable in the field.",
    nodes: [
      { id: "app", label: "Mobile app", sub: "phone · tablet", col: 0, row: 0, tone: "client" },
      { id: "ctrl", label: "Controller", sub: "wireless setup", col: 1, row: 0, tone: "external" },
      { id: "iot", label: "Device hub", sub: "status · alarms", col: 2, row: 0, tone: "service" },
      { id: "api", label: "APIs", sub: "accounts · devices · properties", col: 1, row: 1, tone: "service" },
      { id: "l10n", label: "Localization pipeline", sub: "glossary · review · four languages", col: 0, row: 1, tone: "ai" },
      { id: "mx", label: "Analytics", sub: "events · funnels · incidents", col: 2, row: 1, tone: "data" },
    ],
    edges: [
      { from: "app", to: "ctrl", label: "Bluetooth" },
      { from: "ctrl", to: "iot" },
      { from: "app", to: "api" },
      { from: "iot", to: "api" },
      { from: "l10n", to: "app" },
      { from: "app", to: "mx" },
    ],
    problems: [
      {
        title: "The same app read differently on each platform",
        problem: "Users saw different wording on iOS and Android, and some text sat outside translation entirely. The two apps shared no string keys.",
        solution:
          "A tiered AI-assisted translation pipeline with human review gates and an irrigation glossary (a “station” is not a train station). It validated about 4,500 translations across both platforms and flagged every string at risk of truncation in German and French.",
      },
      {
        title: "Field problems couldn't be tied to a person",
        problem: "Most events carried no user role, and web and iOS used different identities, so one person counted as two. We couldn't tell whether a contractor or a homeowner was struggling.",
        solution: "One identity model across platforms, with role attached to events, so the same person is counted once and failures can be read by role.",
      },
      {
        title: "Design that promised more than the app did",
        problem: "A design file can quietly promise features the app doesn't have yet, and teams then plan around screens that can't ship.",
        solution:
          "Every Phase 2 page opens with an “In the app today” header. Map borders, for example, are marked as designed ahead: the app places zone points today.",
      },
    ],
    numbers: [
      { value: 4, label: "Languages through the localization pipeline", source: "Localization QA reports" },
    ],
  },
  outcome: {
    intro:
      "App Store adoption figures aren't mine to publish, so these numbers describe the design and its delivery, not the market.",
    metrics: [
      { value: 248, label: "Mobile screens in one design system", source: "Design file index" },
      { value: 50, label: "Bottom-sheet states designed for five TRUE ET agronomy inputs", source: "Design file index" },
      { value: 4500, prefix: "~", label: "Translations validated across iOS and Android", source: "Localization QA reports (4,484 to 4,536 across reports)" },
      { value: 9, label: "Narrated tutorial videos for invites, access, and ownership transfer", source: "Tutorial video library" },
    ],
  },
  reflection: [
    "The hardest part of Oasis wasn't any one screen. It was holding two people in mind at once: the pro in a hurry and the homeowner who has to trust what the pro left behind.",
    "Next: put Phase 2 in front of contractors in the field. The presets work has a recruitment screener and an interview guide ready, and I'd rather ship with their words than with my predictions.",
  ],
  nda: "Frames come from the design file and use placeholder people and addresses. Frames showing client names are excluded. Usage analytics are internal and not shown.",
};
