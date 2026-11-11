import type { Project } from "../types";

export const oasis: Project = {
  slug: "oasis-bulls-eye",
  title: "Oasis Bulls Eye",
  tagline: "A live 3D globe that turned an irrigation platform's analytics into something a leadership team can see breathe.",
  accent: "#4DA3FF",
  year: "2025 — 2026",
  role: "Sole researcher, designer, and builder (Bulls Eye) · UX lead across Oasis",
  owned: ["Research", "UX", "UI", "Motion", "Front-end", "Back-end", "Testing"],
  team: "Solo on Bulls Eye, inside the wider Oasis product and engineering team",
  duration: "Globe: 5 weeks · Sep — Oct 2026",
  platforms: ["Web", "Wall display", "Mobile"],
  stack: ["Figma", "Real-time 3D", "Web front-end", "APIs", "Analytics", "Map imagery", "Cloud services", "Automated testing"],
  cover: {
    kind: "reel",
    variant: "cinema",
    src: "reel:bulls-eye",
    alt: "Bulls Eye in motion: the night-side 3D globe of North America, the adoption heatmap, the satellite close-up with its minimap, and the postcard view.",
    shots: [
      { src: "/work/oasis/globe-home.webp", width: 1280, height: 800, alt: "", caption: "The whole network, at a glance" },
      { src: "/work/oasis/globe-heatmap.webp", width: 960, height: 600, alt: "", caption: "Region by region, on replay" },
      { src: "/work/oasis/globe-minimap.webp", width: 1000, height: 510, alt: "", caption: "Always know where you are" },
      { src: "/work/oasis/globe-postcard.webp", width: 1600, height: 1000, alt: "", caption: "A postcard worth sharing" },
    ],
  },
  headline: { value: "5 wks", label: "from a one-line brief to a live 3D globe that makes adoption something you can feel in a room. I researched, designed, and built it alone." },
  tldr: {
    problem:
      "Toro Oasis lets landscape contractors set up smart irrigation controllers and hand them over to homeowners. Leadership had no live picture of adoption, because the signal sat in analytics dashboards that only analysts opened.",
    did:
      "I researched the gap, designed the experience, and built it on my own. Bulls Eye is a 3D globe that replays the platform since launch and streams it live: app opens are pulses, watering zones are dots, and new controllers are arcs from Toro HQ. Every customer stays anonymous.",
    result:
      "It runs at a capped 60 fps on a wall display and switches between Oasis and Lynx in under a second. Satellite close-ups spend metered map budget only while each layer is under 92% of its monthly limit. An automated check fails the build if customer data could leak.",
  },
  context: [
    "Oasis is Toro's account-based irrigation platform for the home and landscape market. Contractors pair a controller over Bluetooth and Wi-Fi, build zones and programs, then invite the homeowner and transfer ownership. It runs on iOS, Android, the web, and an internal operations console.",
    "As UX lead I worked across that surface: the presets design program, a four-language localization pipeline, the analytics realignment, and design-to-code fidelity on the console. Engineers built the core apps and back end, and I don't claim that work.",
    "Bulls Eye is the piece I researched, designed, and built end to end. The brief was mine, written in one line: <strong>make adoption something you can feel in a room.</strong>",
  ],
  process: [
    {
      phase: "Frame the gap",
      when: "Sep 2026",
      did: "I started from how adoption reached leadership, and it didn't. The signal sat in analytics dashboards that only analysts opened. I wrote the brief in one line and tested every idea against it: make adoption something you can feel in a room.",
      artifacts: ["One-line brief", "Analytics event inventory"],
      changed: "I ruled out one more dashboard. The answer would be something people read from across a room, with no dashboard to learn.",
    },
    {
      phase: "Read the data",
      when: "March 2026",
      did: "After a field report of “can't join Wi-Fi,” I built an investigation dashboard the same day and cut every Bluetooth setup failure by time, device, and app build. Then I audited the events themselves: a large share carried no user role, and web and iOS used different identities.",
      artifacts: ["Failure investigation dashboard", "Event and role audit", "Cross-platform identity model"],
      changed: "The failures were one device and one build, so I left setup alone. I realigned web to the iOS identity model, so any adoption picture counts each person once.",
    },
    {
      phase: "Test the presets with experts",
      did: "For the presets program I ran a first round of expert evaluation, Nielsen's ten heuristics plus a cognitive walkthrough, and wrote predicted metrics for round two. In parallel I prepared a contractor study: a screener for 5 to 8 professionals who had configured at least 10 controllers in the past year, an interview guide, and a consent form. The sessions haven't run yet.",
      artifacts: ["Heuristic evaluation", "Cognitive walkthrough", "Contractor screener and interview guide", "Round 2 test plan"],
      changed: "Four risks surfaced: a picker too dense for the field, heavy apply logic, trust cues that arrive too late, and a fragmented post-apply state. They became five refinements to the design.",
    },
    {
      phase: "Audit the language",
      when: "March to April 2026",
      did: "I compared the two mobile apps string by string: 975 localized strings on iOS, 160 on Android, no matching keys. Machine translation then broke domain words in every target language, so I checked what would stretch or truncate in German and French.",
      artifacts: ["String parity audit", "Irrigation glossary", "Text-expansion report"],
      changed: "Translation became a glossary-led process with human review gates, not a one-pass machine job. A station is not a train station.",
    },
    {
      phase: "Design for the glance",
      when: "Sep 2026",
      did: "I designed for three moments: someone glances at the wall, walks up to it, and asks a question. In the first two days I built the live view, a regions leaderboard, a watering layer, a mobile layout, and replay since launch, then made replay the default.",
      artifacts: ["Tour chapters", "Region picker and control rail", "Replay-first mode", "Mobile bottom sheet"],
      changed: "A live feed alone is quiet at night and says the wrong thing about the platform. Replay tells the whole arc of adoption. Live became one toggle away.",
    },
    {
      phase: "Harden and ship",
      when: "Late Oct 2026",
      did: "I spent the last week treating the promises to the room as testable requirements: customers stay anonymous, the globe holds its frame rate all day, and map spend stays under budget. The build fails when a promise breaks.",
      artifacts: ["Privacy check on every build", "Frame-rate cap", "Map budget rules", "Browser smoke suite"],
      changed: "Privacy and cost stopped being policy and became part of the build. The globe shipped as an internal tool behind a password gate.",
    },
  ],
  research: {
    methods: [
      "Product analytics",
      "Incident forensics",
      "Analytics event audit",
      "Heuristic review (Nielsen)",
      "Cognitive walkthrough",
      "Localization audits",
      "Contractor interview guide (prepared, not yet run)",
    ],
    findings: [
      {
        title: "The signal existed. Nobody could see it.",
        body: "Adoption data lived in dashboards that only analysts opened. Leadership had no live picture of the platform, so the problem was legibility, not data.",
      },
      {
        title: "The failure was one device, one build, three hours.",
        body: "After a field report of “can't join Wi-Fi,” I built an investigation dashboard the same day. The failures behind the report all fell in a single three-hour burst, on one tablet model and one app build. It wasn't a systemic flaw, so the fix wasn't a redesign of setup.",
      },
      {
        title: "Analytics couldn't say who.",
        body: "A large share of events carried no user role, and web and iOS used different identities, so cross-platform users split in two. I realigned web analytics to the iOS identity model so people merge correctly.",
      },
      {
        title: "A live feed is quiet at 2 a.m.",
        body: "A live feed is quiet overnight, and a quiet globe says the platform is idle. Replay since launch went in on day two and became the default.",
      },
      {
        title: "Presets live or die on trust.",
        body: "An expert review of the presets flow found the picker too dense for field use, and trust cues arriving after the moment of commitment. Speed only matters once a contractor trusts what will be applied.",
      },
      {
        title: "“Station” is not a train station.",
        body: "Machine translation broke domain terms in every target language. Localization needed an irrigation glossary and checks for text expansion, not just machine translation.",
      },
    ],
  },
  insight: "The numbers were already in the building.\nNobody could <em>see the network breathe</em>.",
  design: {
    intro:
      "The challenge: make adoption legible to people passing a wall in a busy room, who glance at it, walk up to it, and ask questions. Every choice serves that moment.",
    decisions: [
      {
        title: "Replay first, live second.",
        context: "At 2 a.m. a live feed is quiet, and an empty globe tells the wrong story.",
        choice: "Default to replaying the platform since launch at six hours per second. Live is one toggle away.",
        rejected: "Live-only, like most operations dashboards.",
        why: "Replay always tells the whole arc of adoption. Live answers the follow-up question, “what's happening right now?”",
        media: {
          kind: "image",
          src: "/work/oasis/globe-heatmap.webp",
          alt: "Bulls Eye close-up with region chips and replay controls.",
          width: 960,
          height: 600,
          caption: "Regions, replay speed, and Network or Top Regions on a single control rail.",
        },
      },
      {
        title: "Privacy is a build failure, not a policy.",
        context: "Anyone walking past a wall display can see it.",
        choice:
          "The server sends the browser only allow-listed, anonymized fields, about 60 seconds behind real time. An automated check fails the build if customer data could reach the page.",
        rejected: "Filtering in the browser.",
        why: "Anything the browser receives, someone can read. The guarantee has to come from the server, and an automated test has to enforce it.",
      },
      {
        title: "Spend the map budget where it's already warm.",
        context: "Satellite close-ups are beautiful and metered.",
        choice:
          "A warm-first tour: the server indexes cached tiles and steers the showcase toward them. It spends fresh imagery only while each layer is under 92% of its monthly limit and on pace.",
        rejected: "Free-roaming close-ups and hoping the bill is fine.",
        why: "The show stays beautiful and the budget holds, without anyone having to babysit it.",
        media: {
          kind: "image",
          src: "/work/oasis/globe-minimap.webp",
          alt: "Bulls Eye minimap with pins marking the current view.",
          width: 1000,
          height: 510,
          caption: "The minimap keeps people oriented during close-ups.",
        },
      },
      {
        title: "Trust before speed (Oasis presets).",
        context: "Contractors repeat the same controller, zone, and program setup on every job. The expert review found trust cues arriving after the moment of commitment, and a post-apply state split across screens.",
        choice:
          "Three modular preset types (controller, zone, program), safe-by-default apply, a trust summary before saving, and a persistent active-preset bar with undo.",
        rejected: "One “whole job” preset, which is faster to demo and harder to trust.",
        why: "That matches how contractors think, and it makes partial apply and override explainable. Showing an override matters as much as applying one.",
      },
      {
        title: "Recommend first, filter second.",
        context: "The expert review's weakest score was minimalism: the preset picker was too dense for someone standing in a yard.",
        choice: "Open on a recommended match and recent presets. Filters sit behind them for the rare case.",
        rejected: "A full filter grid as the first screen.",
        why: "Under field pressure, a good default beats a powerful search.",
      },
      {
        title: "Built for keyboards, reduced motion, and phones.",
        context: "The wall is one place Bulls Eye lives. It also opens on laptops and phones, and a globe full of motion is a lot for some people.",
        choice: "A keyboard-operable map, a reduced-motion mode, and a bottom sheet in place of the control rail on small screens.",
        why: "The experience is only as good as the weakest way to reach it.",
      },
    ],
    gallery: [
      {
        kind: "image",
        src: "/work/oasis/globe-postcard.webp",
        alt: "A shareable Bulls Eye postcard rendered from the globe.",
        width: 1600,
        height: 1000,
        caption: "Postcards: any view of the globe becomes a shareable image.",
      },
      {
        kind: "image",
        src: "/work/oasis/app-store.webp",
        alt: "The Oasis App Store panorama: add a controller, satellite zone map, reports, access sharing, and the client list.",
        width: 2400,
        height: 727,
        caption: "The Oasis mobile app, as it appears on the App Store.",
      },
    ],
  },
  engineering: {
    intro:
      "Three layers each guard one promise to the people in the room: a privacy layer keeps customers anonymous, a cache keeps close-ups fast and affordable, and the browser keeps motion smooth. I built all three.",
    nodes: [
      { id: "apps", label: "Product apps", sub: "mobile · web", col: 0, row: 0, tone: "client" },
      { id: "analytics", label: "Analytics", sub: "usage events", col: 1, row: 0, tone: "external" },
      { id: "relay", label: "Privacy relay", sub: "anonymized · delayed · rate-limited", col: 2, row: 0, tone: "service" },
      { id: "globe", label: "Globe display", sub: "3D · smooth frame rate", col: 3, row: 0, tone: "client" },
      { id: "maps", label: "Map imagery", sub: "satellite tiles", col: 1, row: 1, tone: "external" },
      { id: "cache", label: "Tile cache", sub: "warm-first", col: 2, row: 1, tone: "data" },
      { id: "weather", label: "Weather layers", sub: "public datasets", col: 1, row: 2, tone: "external" },
      { id: "ci", label: "Automated checks", sub: "no customer data", col: 3, row: 2, tone: "service" },
    ],
    edges: [
      { from: "apps", to: "analytics" },
      { from: "analytics", to: "relay" },
      { from: "relay", to: "globe" },
      { from: "maps", to: "cache" },
      { from: "cache", to: "globe" },
      { from: "weather", to: "globe" },
      { from: "ci", to: "globe" },
    ],
    problems: [
      {
        title: "A live wall that anyone can read",
        problem:
          "A wall display is public to everyone in the room, so no customer could ever be identifiable. And every open browser asking for data would overrun the source's hourly limits.",
        solution:
          "One relay fetches the data once, passes on only anonymized fields, and serves every screen from that. A password gate and an automated check sit on top.",
      },
      {
        title: "Beautiful close-ups that stay smooth",
        problem: "Satellite close-ups pull heavy imagery, wall displays run all day, and a stuttering globe breaks the effect.",
        solution:
          "A capped frame rate, loading only what the view needs, updates paused when the page is hidden, a cache that keeps coarse tiles longest, and a tour that favors imagery already cached.",
      },
      {
        title: "Two platforms that never bleed together",
        problem: "The same globe serves Oasis (home) and Lynx (golf), and viewers must never see one platform's data in the other's view.",
        solution:
          "Data tagged by platform, checks that reject mixed data, and background preloading, so switching takes under a second without a reload.",
      },
    ],
    numbers: [
      { value: 60, suffix: " fps", label: "Frame cap on wall displays", source: "Project documentation" },
      { value: 1, prefix: "<", suffix: " s", label: "To switch between Oasis and Lynx, without a reload", source: "Project documentation" },
    ],
  },
  outcome: {
    intro:
      "Bulls Eye shipped as an internal tool behind a password gate. Across the wider Oasis program, the localization pipeline I commissioned and supervised took the app from English-only to four more languages.",
    metrics: [
      { value: 1, prefix: "<", suffix: " s", label: "To switch between Oasis and Lynx, without a reload", source: "Project documentation" },
      { value: 8, label: "Bluetooth setup failures traced to one tablet model and one app build, after a vague “can't join Wi-Fi” report", source: "Product analytics, 2026" },
      { value: 4500, prefix: "~", label: "Translations validated across iOS and Android, in 4 languages", source: "Localization QA reports (4,484 to 4,536 across reports)" },
      { value: 5, suffix: " weeks", label: "From a one-line brief to a live, privacy-gated globe, designed and built solo", source: "Repository history, Sep to Oct 2026" },
    ],
  },
  reflection: [
    "The presets program taught me where my evidence stops. Its time savings, 795 s down to 147 s, are modelled benchmark targets from an expert review, not field measurements, so I don't headline them. Round 2 with real contractors is what would turn the design into a result.",
    "On Bulls Eye, I'd capture a launch video on day one. Motion is the whole point of the piece, and stills undersell it.",
  ],
  nda: "Globe imagery comes from the self-test build, which uses synthetic data. Customer counts, locations, and product analytics are withheld.",
};
