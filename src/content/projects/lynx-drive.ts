import type { Project, Shot } from "../types";

/** Frames from the Lynx prototype files. Course names are redacted to sample data in scripts/assets.sh. */
const d = (name: string, alt: string): Shot => ({ src: `/work/lynx/figma/${name}.webp`, width: 2880, height: 1620, alt });
const m = (name: string, alt: string, title?: string): Shot => ({
  src: `/work/lynx/figma/${name}.webp`,
  width: 1170,
  height: name === "mobile-note-02-add-note" ? 2685 : 2532,
  alt,
  title,
});

export const lynxDrive: Project = {
  slug: "lynx",
  title: "Toro Lynx",
  tagline:
    "Golf's central irrigation control, redesigned for the desk in the shed and moved into the superintendent's pocket, plus the forensics that kept it there.",
  accent: "#A6E25B",
  year: "2022 — 2026",
  role: "Researcher and UX designer across the Lynx experience, plus hands-on front-end work: design system, web and desktop redesign, and mobile performance and analytics",
  owned: ["Research", "UX", "UI", "Prototyping", "Design system", "Front-end", "Testing"],
  team: "Cross-functional Lynx team: iOS, Android, desktop, QA, and product. I was the UX researcher and designer, and I built the design-system pipeline and parts of the app.",
  duration: "2022 — 2026",
  platforms: ["Desktop", "iOS", "Android", "Web"],
  stack: ["Figma", "Design tokens", "Native iOS", "Web front-end", "Realtime data", "Maps", "Product analytics", "Visual regression testing"],
  cover: {
    kind: "reel",
    variant: "stage",
    src: "reel:lynx",
    alt: "Toro Lynx on a desktop display and an iPhone: the Course Report, watering plan, alarms and station detail on desktop, and the course map, a flagged station and a lasso selection on mobile.",
    shots: ["desktop-hero-01-course-report-map", "desktop-hero-02-watering-plan-map", "desktop-hero-04-alarm-response", "desktop-hero-05-map-station-detail"].map((n) => ({
      src: `/work/lynx/figma/${n}.webp`,
      width: 2880,
      height: 1620,
      alt: "",
    })),
    phones: ["mobile-hero-01-map-clusters", "mobile-hero-04-station-flagged", "mobile-select-02-draw-selection", "mobile-hero-02-map-near-me"].map((n) => ({
      src: `/work/lynx/figma/${n}.webp`,
      width: 1170,
      height: 2532,
      alt: "",
    })),
  },
  showcase: [
    { kind: "statement", text: "A whole golf course, *thousands* of sprinklers, read in one glance before the crew heads out." },
    {
      kind: "compare",
      eyebrow: "Watering Plan · before and after",
      title: "Same job, a screen that shows where you are.",
      body: "The legacy Watering Plan put every column in one wide grid and left the map as a small image below it. I rebuilt it so the program list, the map, and the bulk adjustments share one screen. Plain labels and a breadcrumb show where you are, so a change takes fewer steps.",
      before: d("legacy-watering-plan", "Legacy Lynx Watering Plan: a wide program grid above a mostly empty map, with a stacked menu on the left."),
      after: d("desktop-hero-02-watering-plan-map", "Redesigned Lynx Watering Plan: stations in a list with a map below and bulk adjustments at the right."),
      labels: ["Before · legacy", "After · redesign"],
    },
    {
      kind: "desktop-walk",
      eyebrow: "Desktop · morning check-in",
      title: "What failed overnight, found, flagged, and handed off in five moves.",
      steps: [
        { shot: d("desktop-morning-01-course-report", "Course Report: health counts for all areas, failed, under/over, and running, above the area table."), heading: "Lead with the counts", body: "Failed, Under/Over, and Running are the three numbers that matter at dawn, so they lead the screen and double as filters." },
        { shot: d("desktop-morning-02-failed-filter", "Course Report filtered to failed stations, grouped by area."), heading: "Filter to what broke", body: "One tap on Failed collapses 1,500-plus stations to the handful that need a person, grouped by where they are on the course." },
        { shot: d("desktop-morning-03-diagnostics", "Perform Diagnostics dialog showing a failed communication test and a flag button."), heading: "Diagnose in place", body: "Diagnostics run from the row, and the result offers the next step: flag this station as an issue for you and your team." },
        { shot: d("desktop-morning-04-add-note", "Add a Note dialog with note text and an Add Photos button."), heading: "Leave context", body: "A note with optional photos turns a fault code into an instruction the crew can act on." },
        { shot: d("desktop-morning-05-note-logged", "Course Report with the flagged station highlighted and the note in the activity feed."), heading: "Close the loop", body: "The flag and the note land in the activity feed and the station is highlighted in place. Nobody has to make a phone call." },
      ],
    },
    {
      kind: "duo",
      eyebrow: "Shed and cart",
      title: "The same course, on the desk and in the field.",
      body: "The desktop docks the map under the report. The phone leads with the map, because in the field the question is “which head is this?”",
      desktop: d("desktop-hero-01-course-report-map", "Course Report with a docked station map and activity rail."),
      phone: m("mobile-hero-01-map-clusters", "Lynx mobile map with clustered station counts."),
    },
    {
      kind: "phone-walk",
      eyebrow: "Mobile · in-field adjustments",
      title: "Lasso a fairway. Adjust it. Walk on.",
      steps: [
        { shot: m("mobile-select-01-select-mode", "Map in selection mode."), heading: "Select from the map", body: "Selection starts where the superintendent is looking: on the course, not in a list." },
        { shot: m("mobile-select-02-draw-selection", "Drawing a lasso around stations on the map."), heading: "Draw it", body: "A lasso grabs a whole green or fairway at once. Tapping still works for single heads." },
        { shot: m("mobile-select-03-actions", "Bulk action sheet: start, stop, diagnostics, hold, note, percent adjust."), heading: "One sheet of actions", body: "Start, stop, diagnose, hold, note, or percent adjust, applied to the whole selection." },
        { shot: m("mobile-select-04-percent-adjust", "Percent adjust form with base, duration, and temporary adjust."), heading: "Adjust with a duration", body: "Base, temporary adjust, and how many days it lasts, so a hot-week change expires on its own." },
        { shot: m("mobile-select-05-percent-filled", "Percent adjust form filled in, ready to confirm."), heading: "Confirm and go", body: "A filled form reads back exactly what will change before anything reaches the controllers." },
      ],
    },
    {
      kind: "zoom",
      eyebrow: "Map detail",
      title: "Every pin carries its status, flags, and notes.",
      body: "About 36 pin variants cover status, flag, note, and switch states, and clusters still carry a flag or note marker when they collapse. The selected station opens its adjustments beside the map.",
      shot: d("desktop-hero-05-map-station-detail", "Satellite course map with station pins and a station detail panel."),
      focus: { x: 46, y: 32, scale: 2.2 },
    },
    {
      kind: "exploded",
      eyebrow: "Diagnose, flag, note",
      title: "A field fix, as a stack of small decisions.",
      body: "Each sheet answers one question, so a superintendent in a cart, in sun, with one hand free, never loses their place on the map.",
      device: "phone",
      shots: [
        m("mobile-hero-02-map-near-me", "Map: Near Me", "Near me"),
        m("mobile-hero-03-station-list", "Station list with filters", "Station list"),
        m("mobile-note-01-diagnostics", "Diagnostic results", "Diagnostics"),
        m("mobile-hero-04-station-flagged", "Station sheet with the issue flagged", "Flagged"),
      ],
    },
    {
      kind: "wall",
      eyebrow: "The whole system",
      title: "Morning, field, and evening, on one design system.",
      body: "Course Report, Watering Plan, Projected Flow, Alarm Response, and Hydraulic, built from one Golos type scale and a data palette tuned so course data never fights the chrome.",
      count: "500",
      device: "desktop",
      shots: [
        d("desktop-hero-02-watering-plan-map", "Watering Plan"),
        d("desktop-hero-03-projected-flow", "Projected Flow"),
        d("desktop-hero-04-alarm-response", "Alarm Response"),
        d("desktop-hero-06-hydraulic", "Hydraulic"),
        d("desktop-eod-01-holes", "Watering Plan by hole"),
        d("desktop-eod-02-program-adjust", "Adjust a program"),
        d("desktop-eod-03-station-adjust", "Adjust a station"),
        d("desktop-morning-02-failed-filter", "Failed stations"),
        d("desktop-hero-05-map-station-detail", "Map with station detail"),
      ],
    },
  ],
  headline: { value: "<1%", label: "pixel difference between my designs and the shipped components, down from 11%, so what users see matches what I designed" },
  tldr: {
    problem:
      "Superintendents ran a course's irrigation from a desktop in the shed. The mobile app put that control in their pocket, but a field crash could lock a course out until the app was reinstalled, the map they open first was slow to appear, and the desktop UI couldn't evolve to match new designs.",
    did:
      "I was the researcher and UX designer. I started with three weeks of before-sunrise ride-alongs across three states, mapped a superintendent’s day into three moments, and designed the map-first field app and the desktop redesign around them. Later I traced a crash-to-reinstall loop from three site reports to four chained bugs, and built the design system with a pixel-diff pipeline. I also took part in the build, fixing map selection performance and rebuilding the analytics layer on iOS.",
    result:
      "Switching tabs now uses 100–288 MB less memory. Design fidelity improved from 11% to under 1% pixel difference. The desktop proof of concept paints the Course Report in 0.82 s and scrolls 1,158 stations at 60 fps.",
  },
  context: [
    "Lynx is Toro's central control system for golf irrigation: thousands of sprinkler stations per course, run from a desktop in the maintenance building. <strong>Lynx Drive</strong> brings that control into the field. Superintendents see live station status, adjust watering, and flag a head with a photo note for the crew, all from a phone.",
    "I joined in 2022 to lead the desktop UX redesign, then carried the design system across mobile, web, and the next desktop client. I researched the users, designed the screens, and in 2026 I also took part in the engineering: performance, analytics, and design-to-code tooling on the production app.",
    "The old interface was dated, but that wasn’t the real problem. The research said something sharper: superintendents didn’t trust it enough to put their paper backups down. Everything below follows from that.",
  ],
  process: [
    {
      phase: "Field research",
      when: "2022",
      did: "I rode along with irrigation crews before sunrise for three weeks across three states, and watched live workflows over screen share. I ran 15 in-depth interviews with planners, operators, and support staff, plus a separate round of 10 superintendent interviews (7 on Lynx, 3 on a competing system) and 12 internal interviews across product, engineering, support, and training. I also sorted 250+ support tickets by root cause.",
      artifacts: ["3 weeks shadowing, 3 states", "250+ tickets coded by root cause", "3 personas: superintendent, technician, coordinator"],
      changed: "The brief moved from “modernize the UI” to “support three moments of the day.”",
    },
    {
      phase: "Define",
      did: "I mapped a day in the life for each persona, from the 5:30 a.m. check-in to the evening planning window. The map showed up to 45 minutes lost each morning across six views, 84% of users keeping paper backups, and 3.7 tracking methods per team (texts, radios, paper logs, photos). It also showed 92% of overnight errors tracing to a verification that was never finished. I turned that into three pillars: information at a glance, guided workflows, and role-optimized views.",
      artifacts: ["Day-in-the-life journey map", "UX pillar pyramid", "Insight themes by opportunity"],
      changed: "Morning check-in, in-field adjustments, and end-of-day planning became the spine of every flow I drew afterward.",
    },
    {
      phase: "Map-first concepts",
      did: "On a phone, the first question is “which head is this?”, so I drew the app as a map with actions on top instead of a squeezed desktop. I wrote six field stories, each with a one-line goal: smart notes, flag a station, schedule adjustments, team handoff, field audits, and Find Me. Then I drew the flows underneath them: selection, percent adjust, notes with photos, near me, and clusters.",
      artifacts: ["6 field-story scenes", "142 mobile frames", "Selection and percent-adjust flows"],
      changed: "The map became the phone’s home screen, and selection moved onto the map as a lasso.",
    },
    {
      phase: "Prototype & test",
      did: "I built high-fidelity interactive prototypes for each of the three moments and ran recorded sessions with the people who use the system. Early field builds went out on real turf, and a flow that failed on a bumpy cart path or in glare got cut. The desktop prototypes also went to a golf industry trade show booth, where customers and prospects used them. The Watering Plan went through v1, Lite, and v2 layouts.",
      artifacts: ["Interactive prototypes", "Recorded test sessions", "On-turf field tests", "Watering Plan v1 / Lite / v2"],
      changed: "Navigation was rebuilt around a persistent breadcrumb and plain labels, and the end-of-day planner and Field Notes became core instead of extras.",
    },
    {
      phase: "Systemize",
      did: "Once the screens held up, I built the Lynx component library: map pins, the activity feed, a color system where light neutrals carry course data and bright color is saved for status, and one type scale. I wrote the activity feed’s rules down. Then I wired design tokens to the web build with an automated pixel diff against the design.",
      artifacts: ["~172 design tokens", "~36 map pin variants", "Activity feed spec", "Pixel-diff pipeline"],
      changed: "“Close enough” became a number the build enforces: 11% pixel difference fell to under 1%.",
    },
    {
      phase: "Field forensics",
      when: "Mar to Oct 2026",
      did: "Three sites reported crashes, and the only workaround was a reinstall. I traced it through product funnels and code to four chained bugs, and found that only about one in five signed-in users ever reached the map. I mapped which screens differ between the two hardware platforms, audited a customizable-columns idea against what the desktop client could build, and tested the desktop redesign in a working proof of concept against explicit performance budgets.",
      artifacts: ["Crash-to-reinstall root cause", "Sign-in-to-map funnel", "Hardware difference map", "Feasibility audit", "Proof of concept vs. budgets"],
      changed: "Analytics now names a user and a course on every event, and every new design is scoped to what the hardware and client can actually build.",
    },
  ],
  research: {
    methods: [
      "3 weeks of before-sunrise ride-alongs, 3 states",
      "15 in-depth interviews with planners, operators, and support",
      "10 superintendent interviews, 7 on Lynx and 3 on a competing system",
      "12 internal stakeholder interviews",
      "250+ support tickets coded by root cause",
      "Day-in-the-life journey mapping",
      "Recorded prototype sessions and on-turf tests",
      "Sign-in-to-map funnel analysis",
      "Crash forensics from three site reports",
      "Hardware platform mapping",
    ],
    findings: [
      {
        title: "The morning ran through six screens.",
        body: "Users lost up to 45 minutes each morning switching between six views to gather the basics. 84% kept a paper backup, because they didn’t trust the screen to be complete. A tool people double-check on paper has already lost them.",
      },
      {
        title: "Field work lived in texts, radios, and paper.",
        body: "Teams tracked repairs and adjustments with 3.7 different methods on average: texts, radios, paper logs, and photos. Each handoff between the cart and the shed was a chance to lose the thread. That made a note with photos, tied to a station, worth designing carefully.",
      },
      {
        title: "Overnight errors started with checks too hard to finish.",
        body: "Evening verification meant opening every screen to confirm the plan was right. 92% of overnight errors traced to a verification that was never completed. The interface made the careful path the expensive one.",
      },
      {
        title: "Most people used a fraction of the product.",
        body: "Most superintendents used only 20 to 30 percent of Lynx’s features. The signal was not “add more.” It was contextual guidance, role-based defaults, and a Watering Plan that updates in fewer steps.",
      },
      {
        title: "A stuck “synchronizing” state could lock a course out.",
        body: "The app saved “synchronizing” before the server answered and never cleared it. A crash mid-sync relaunched the app under an overlay that couldn't be cancelled. For a superintendent, the only way out was to delete the app and reinstall it.",
      },
      {
        title: "Most people never reached the map.",
        body: "The map is the field superintendent's front door, yet only about one in five people who signed in reached it, and those who did waited about 100 seconds. Slow is a UX problem, so I treated performance as part of the design.",
      },
      {
        title: "I couldn't tie a problem to a course.",
        body: "Events carried no user or course identity, so when three sites reported crashes, nobody could find them in the data. I couldn't design from evidence I couldn't read, and that gap drove the analytics rebuild.",
      },
      {
        title: "Two hardware platforms, one UI.",
        body: "Lynx's newer controller platform uses decimal addressing, wired decoders, and a different set of diagnostics. I used the code to map exactly which screens differ, so the design changes only what the hardware requires and users aren't shown options their course can't use.",
      },
    ],
    quote: {
      text: "By the time I’ve checked everything in the system, I’ve already missed something on the course.",
      who: "Lead Superintendent",
    },
  },
  insight: "Superintendents didn’t need more features.\nThey needed to <em>trust</em> the screen enough to put the paper down,\nand never be stuck on it at 5 a.m.",
  design: {
    intro:
      "Field software is used one-handed, in sun, often with gloves on, on unreliable connections. Each decision below starts with something I saw or measured, and ends with what it buys a superintendent or crew member.",
    decisions: [
      {
        title: "Lead the morning with three numbers.",
        context: "Users lost up to 45 minutes each morning across six views, and 84% kept paper backups because they didn’t trust the screen.",
        choice:
          "Course Report opens on Failed, Under/Over, and Running as counts that double as filters. One tap on Failed cuts 1,500-plus stations down to the few that need a person, grouped by where they sit on the course.",
        rejected: "A dashboard of widgets that tries to show everything.",
        why: "The question at dawn is “what broke?” Answering it in one glance is what makes the paper backup unnecessary.",
        media: {
          kind: "image",
          src: "/work/lynx/figma/desktop-morning-02-failed-filter.webp",
          alt: "Course Report filtered to failed stations, grouped by area.",
          width: 2880,
          height: 1620,
          caption: "Failed filter on the Course Report, from the morning check-in prototype.",
        },
      },
      {
        title: "The map is the home screen.",
        context: "Ride-alongs showed superintendents think in holes and stations, not in lists, and in a cart they have one hand free.",
        choice:
          "A satellite map with a status ring on every pin, flag and note badges, and a “Find Me” cone that orients the user on the course.",
        rejected: "Matching the desktop's table-first layout on a phone.",
        why: "Status should read at a glance from a cart. A flagged head with a photo note hands off a task to the crew without a phone call.",
        media: {
          kind: "image",
          src: "/work/lynx/map-flag-notes.webp",
          alt: "The Lynx Drive map: satellite fairway, status-ringed station pins, a flagged and noted station, and a blue Find Me cone.",
          width: 780,
          height: 1350,
          caption: "Flags, notes, and Find Me on the field map.",
        },
      },
      {
        title: "Replace the group text with a flag and a note.",
        context: "Teams tracked field work in 3.7 methods on average, and information fell through the gaps between them.",
        choice:
          "A diagnostic result offers “flag this station” in the same row. A note with optional photos attaches to the station, and both land in a shared activity feed with the station highlighted in place.",
        rejected: "Another channel next to the texts, radios, and paper.",
        why: "A fault code becomes an instruction the crew can act on, and nobody has to make a phone call to hand it off.",
      },
      {
        title: "Never leave a wait state without a way out.",
        context: "A “synchronizing” state outlived a crash and locked a course out until the app was reinstalled.",
        choice:
          "The rule I wrote into the documented fix path: reset anything persisted mid-flight at launch, give every wait a timeout and a cancel, and read dates tolerantly.",
        rejected: "Patching the one crash that surfaced and leaving the dead end in place.",
        why: "A superintendent at 5 a.m. can’t file a ticket. If no state is a trap, the app doesn’t need one.",
      },
      {
        title: "Tokens are the source of truth.",
        context: "Design and code drifted apart one hard-coded color at a time, so screens stopped looking like the designs.",
        choice:
          "Design tokens exported from Figma feed a deterministic build, and every documented component is pixel-diffed against its design automatically with a 1% threshold. That covers about 172 tokens across global and semantic layers.",
        rejected: "Hand-maintained styles with design QA by screenshot.",
        why: "The argument about whether a screen is “close enough” becomes a number that is enforced, and users get the screens I designed.",
      },
      {
        title: "Design for what the platform can build.",
        context: "Customizable table columns were requested for the desktop client.",
        choice:
          "A design brief constrained to the current desktop client, paired with a capability-by-capability feasibility audit. Per-workstation layouts were feasible, and per-user layouts were not, because the client has no user identity yet.",
        rejected: "An ideal design that engineering would have to say no to.",
        why: "A design that can't ship is a wish. Scoping to reality first earned engineering's trust for the bigger proposal.",
      },
      {
        title: "Write the activity feed's rules down.",
        context: "Once notes and flags replaced the texts, alerts, adjustments, notes, and flags all competed for one feed on a course with 1,500-plus stations.",
        choice:
          "A written spec in the component library: short titles, a body that expands on the title, user notes replace the body, station tags only on course-wide feeds, overflow summed as “+496”, and a “New” divider for activity since the last visit.",
        rejected: "Letting each screen format its own notifications.",
        why: "A feed people trust is one that behaves the same everywhere. Rules make that true without a design review on every screen.",
      },
      {
        title: "Design within the map engine.",
        context: "The selected pin called for a double ring, inner black and outer orange. The desktop map engine can't draw double borders.",
        choice: "Work it through with engineering: two stacked circles fake the double ring for an estimated few days, where an animated ring would have needed its own layer and up to a week.",
        rejected: "Quietly dropping to a single ring.",
        why: "The selected state is the one that matters most on a crowded map. It was worth a few days, and not worth a week.",
      },
      {
        title: "Prove it before proposing it.",
        context: "Moving the desktop client to a web-based foundation is a platform bet.",
        choice:
          "Validate the redesign in a working proof of concept, measured against explicit budgets for cold start, interaction, and scroll, before any recommendation reaches leadership.",
        rejected: "A slide deck of mockups.",
        why: "Leaders fund evidence. The proof of concept turned “it would feel faster” into 0.82 seconds.",
        media: {
          kind: "image",
          src: "/work/lynx/poc-course-report.webp",
          alt: "Redesigned Lynx desktop Course Report: area table, docked course map with station status, and an activity rail.",
          width: 1920,
          height: 1080,
          caption: "The redesigned Course Report, running in the proof of concept on mock data.",
        },
      },
    ],
  },
  engineering: {
    intro:
      "The mobile app is a real-time client of the desktop server, so what a superintendent sees in the field matches what the shed sees. I built the performance and analytics work on the app, and the web design-system pipeline that keeps screens true to the designs.",
    nodes: [
      { id: "server", label: "Course server", sub: "desktop · course hardware", col: 0, row: 0, tone: "external" },
      { id: "broker", label: "Pub/sub broker", sub: "request / response", col: 1, row: 0, tone: "external" },
      { id: "director", label: "Response router", sub: "replies sorted by topic", col: 2, row: 0, tone: "service" },
      { id: "store", label: "On-device store", sub: "works through spotty signal", col: 3, row: 0, tone: "data" },
      { id: "vm", label: "App logic", sub: "selection and state", col: 2, row: 1, tone: "service" },
      { id: "views", label: "Mobile app", sub: "map · report · plan", col: 3, row: 1, tone: "client" },
      { id: "figma", label: "Design tokens", sub: "from the design file", col: 0, row: 2, tone: "client" },
      { id: "tw", label: "Token build", sub: "→ web theme", col: 1, row: 2, tone: "service" },
      { id: "sb", label: "Component library", sub: "documented states", col: 2, row: 2, tone: "client" },
      { id: "diff", label: "Visual regression", sub: "≤ 1% vs design", col: 3, row: 2, tone: "service" },
    ],
    edges: [
      { from: "server", to: "broker" },
      { from: "broker", to: "director" },
      { from: "director", to: "store" },
      { from: "store", to: "vm" },
      { from: "vm", to: "views" },
      { from: "figma", to: "tw" },
      { from: "tw", to: "sb" },
      { from: "sb", to: "diff" },
    ],
    problems: [
      {
        title: "Selecting many stations froze the map",
        problem:
          "At larger courses, selecting 17 or more stations froze the map for crews in the field, and live updates made it worse by redrawing every pin.",
        solution:
          "I gave selection its own store, updated the map in place instead of rebuilding it, made taps skip a slow lookup (saving 50–200 ms per tap), and created the map only when its tab is open.",
      },
      {
        title: "A crash could lock a course out until reinstall",
        problem:
          "A “synchronizing” state outlived a crash. Combined with a date format that changed with the desktop's regional settings, four bugs chained into a dead end for the user.",
        solution:
          "I diagnosed it from site reports, funnels, and code. The fix path: reset the state at launch, add a timeout and a cancel, and read dates tolerantly. Sync must always be recoverable.",
      },
      {
        title: "Nobody could see which course had a problem",
        problem: "Analytics events had no identity, no crash signal, and no parity with Android, so I couldn't tell who was affected.",
        solution:
          "A typed event naming scheme, user and course identity on every event, crash capture, a screen registry, and debounce rules. Eighteen low-value events were cut for cross-platform parity.",
      },
    ],
    numbers: [
      { value: 60, suffix: " fps", label: "Scrolling 1,158 station rows, no stalls", source: "Proof-of-concept performance findings" },
      { value: 16, prefix: "≤", suffix: " ms", label: "Tab switch, drill-down, and chart recompute (budgets 150–300 ms)", source: "Proof-of-concept performance findings" },
    ],
  },
  outcome: {
    intro:
      "The most important numbers here measure what users feel. The performance fix was small and targeted, and fidelity became something an automated check enforces rather than a matter of opinion.",
    metrics: [
      { value: 1, prefix: "<", suffix: "%", label: "Design-to-code pixel difference, down from 11%", source: "Repository history and design-to-code fidelity reports, Jan 2026" },
      { value: 288, prefix: "≤", suffix: " MB", label: "Memory released on tab switch (100–288 MB)", source: "Internal performance report" },
      { value: 0.82, decimals: 2, suffix: " s", label: "Proof-of-concept cold start to a painted Course Report (budget 3 s)", source: "Proof-of-concept performance findings" },
    ],
  },
  reflection: [
    "Most of my best Lynx work is invisible: a sync state that clears itself, a tap that no longer stalls. I've learned to make that kind of work legible to stakeholders by putting its cost next to its effect.",
    "The open item I care about most is closing the loop with field telemetry. The diagnosis and fix path are documented, and I want crash-free data from the courses to prove the fix.",
  ],
  nda: "Course names, infrastructure identifiers, internal analytics, and unreleased hardware plans are withheld. Desktop screens use the proof of concept's mock data, with the course name masked.",
};
