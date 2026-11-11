import type { Project, Shot } from "../types";

/** Frames from the "Dashboard overview" film, which drives the guide's UI recreation with sample data. */
const s = (name: string, alt: string): Shot => ({
  src: `/work/spatial-adjust/${name}.webp`,
  width: 1920,
  height: 1080,
  alt,
});

export const spatialAdjust: Project = {
  slug: "spatial-adjust",
  title: "Spatial Adjust",
  tagline:
    "Getting superintendents to trust an algorithm with their water, and documenting it so rigorously that every sentence carries a citation.",
  accent: "#5BE38B",
  year: "2024 — 2026",
  role: "Researcher & UX designer · Invention originator · Built the guide system",
  owned: ["Research", "UX", "UI", "Content", "Motion", "Front-end", "Testing"],
  team: "Solo researcher, designer, and builder, with product, agronomy, and four expert reviewers",
  duration: "Concept 2024 · Guides Sep — Oct 2026",
  platforms: ["Web", "Video", "11 languages"],
  stack: ["Live UI recreation", "Web front-end", "Video production", "Localization", "Offline-first", "Claims ledger"],
  cover: {
    kind: "video",
    src: "/work/spatial-adjust/hero.mp4",
    poster: "/work/spatial-adjust/hero.jpg",
    alt: "The Spatial Adjust station table, with a camera move across average soil moisture, target moisture, and suggested adjustments.",
    width: 1600,
    height: 900,
  },
  showcase: [
    { kind: "statement", text: "A superintendent hands an algorithm their water only when they can *see* why." },
    {
      kind: "desktop-walk",
      eyebrow: "Dashboard overview · five moves",
      title: "From a whole course to one station, in the order an expert thinks.",
      steps: [
        {
          shot: s("toolbar", "Spatial Adjust toolbar: course picker, weather, evapotranspiration, and average, high, and low moisture."),
          heading: "Start with the toolbar",
          body: "Weather, ET, and course-wide moisture first. Context before any suggestion, because nobody adjusts water without knowing yesterday.",
        },
        {
          shot: s("map-course", "Aerial course map with every irrigation station plotted as a moisture-coloured dot."),
          heading: "Read the map",
          body: "Every station sits where it really is on the course, coloured by how far its soil is from target. Problems show up as places, not rows.",
        },
        {
          shot: s("map-layers", "Close-up of the map legend: four moisture bands and a layer switcher."),
          heading: "Tune what the map shows",
          body: "Four moisture bands with adjustable thresholds, plus switchable layers, so the map answers the question you're asking right now.",
        },
        {
          shot: s("chart", "Bar chart of average moisture for the selected holes, green within target and blue above it."),
          heading: "Use the chart one area at a time",
          body: "Scope to a few holes and compare moisture side by side. Over- and under-watered stations count themselves.",
        },
        {
          shot: s("table", "Station table showing average and target moisture, current and suggested adjustment, and an enable toggle."),
          heading: "Work in the table",
          body: "Measured moisture, your target, the current and suggested adjustment, and the arithmetic between them, all on one row. Accept it, edit it, or switch it off.",
        },
        {
          shot: s("push-changes", "Push Changes button with a count of six pending changes."),
          heading: "Check the counts, then push",
          body: "Nothing reaches a sprinkler until you push. The pending count is the last checkpoint before changes go to Lynx.",
        },
      ],
    },
    {
      kind: "zoom",
      eyebrow: "The row that earns trust",
      title: "Measured. Target. Suggested. The math is on the screen.",
      body: "A suggestion arrives with its reasons: the average moisture the sensors measured, the target the superintendent set, and the adjustment that connects them, with current and suggested side by side.",
      shot: s("table", "Spatial Adjust station table, zoomed to the adjustment columns."),
      focus: { x: 72, y: 52, scale: 2.2 },
    },
    {
      kind: "scrub",
      eyebrow: "Scroll to drive it",
      title: "Twenty-six seconds of the table, at your pace.",
      body: "This is the guide's live recreation of the product, not a screen capture. The same component renders every figure in 26 guides and 27 videos.",
      src: "/work/spatial-adjust/scrub.mp4",
      poster: "/work/spatial-adjust/scrub.jpg",
      width: 1280,
      height: 720,
    },
    { kind: "film", src: "/work/spatial-adjust/film.mp4", poster: "/work/spatial-adjust/film.jpg", title: "Double Click · Dashboard overview" },
  ],
  headline: {
    value: "1,312",
    label: "of 1,337 claims verified against a pinned production release. The other 25 are flagged, not fudged.",
  },
  tldr: {
    problem:
      "Spatial Adjust turns soil-moisture scans into per-station watering changes. It is the largest feature in Toro's golf operations dashboard. Superintendents have to trust it before they let it touch a single sprinkler, and that trust depends on guidance that explains the why and never drifts from the product.",
    did:
      "I was the researcher and UX designer. I originated the Spatial Mapping invention in 2024. In 2026 I designed the guide experience on my own: 26 interactive guides and 27 videos in 11 languages, with a live recreation of the product UI in every figure and a ledger that cites every sentence. I built it too, front end and tooling.",
    result:
      "The guides went live in October 2026. In 52 minutes, a four-expert review settled the vocabulary for every guide and video. 1,312 claims are verified, 6 are verified for beta, and 19 are openly marked as needing an expert. None is unverified.",
  },
  context: [
    "On a golf course, water is the largest lever a superintendent controls and the easiest to get wrong. Toro's soil sensors measure moisture across a course. <strong>Spatial Adjust</strong> turns those measurements into a suggested runtime change for every irrigation station, then pushes the approved changes to the Lynx central control system. The UX challenge is trust: an expert has to be able to see why a suggestion was made, and stay in control of the result.",
    "The idea started with me. In May 2024 I wrote the Spatial Mapping invention disclosure as its named originator. It set out four problems: knowing where every sprinkler and valve is, designing layouts remotely, monitoring and adjusting remotely, and avoiding damage. The feature was then built into IntelliDash, Toro's golf operations dashboard.",
    "Shipping it was only half the job. An expert won't hand an algorithm their water until they understand what it does, why, and when to override it. In September 2026 I took ownership of the experience that teaches exactly that: I researched it, designed it, and built it myself.",
  ],
  process: [
    {
      phase: "Concept and the trust question",
      when: "2024",
      did: "In May 2024 I wrote the Spatial Mapping invention disclosure as its named originator. It framed four problems: knowing where every sprinkler and valve is, designing layouts remotely, monitoring and adjusting remotely, and avoiding damage. I then reviewed the concept with superintendents and irrigation and agronomy specialists, and the pattern was steady: an expert accepts a recommendation that shows its reasoning and keeps the override within reach.",
      artifacts: ["Invention disclosure", "Three design principles", "Moisture-stress map concept"],
      changed: "It set the rule every later decision answered to: a suggestion shows its evidence, and the override sits beside it.",
    },
    {
      phase: "Audit every sentence against the product",
      when: "Sep to Oct 2026",
      did: "When I took ownership of the guides in September 2026, I split every sentence into a claim, 1,337 across 26 guides. Each claim got a status, a citation to the exact place in one pinned production release, and a proposed correction. The guides fell into three groups, each verified in its own pass: setup, targets and stations (12), calculations (8), and the push path, scan data and filters (6).",
      artifacts: ["Claims ledger", "Pinned production release", "Per-guide claim pages", "Text corrections log"],
      changed: "Documentation became testable: every sentence is verified, or visibly not.",
    },
    {
      phase: "Test the audit itself",
      did: "My first coherence audit flagged a batch of contradictions between figures and steps. Before fixing any of them I re-parsed the source properly and re-verified each one. Every finding was an artifact of a lossy extraction step, which had read cursor targets for 7 of 24 guides when all 24 had them. One real defect remained: a step whose target sat outside the frame that was supposed to show it.",
      artifacts: ["Re-verification note", "Withdrawn findings", "Step-repeat check (0 repeats)"],
      changed: "I withdrew the whole list, dropped 17 planned fixes that were never needed, and fixed the one real defect. The instrument got fixed before the guide did.",
    },
    {
      phase: "Write the step standard, build the figures",
      when: "Sep to Oct 2026",
      did: "The readers are superintendents, assistants and technicians, usually alone at a shop computer and short of time. I wrote one standard for every step: Do, You should see, If not, and sometimes Why, with a cap of eight steps per guide, reading grade 8 or below, and every control named the way the screen names it. Then I replaced screenshots with a live recreation of the product UI that a scripted camera moves around.",
      artifacts: ["Step standard", "Live UI recreation", "Camera paths", "Readability check"],
      changed: "Guides became quick to scan and unable to go stale, because each figure is the interface and not a picture of it.",
    },
    {
      phase: "Ship with honesty markers",
      when: "Oct 2026",
      did: "The guides went live in October, with some new wording shipped ahead of expert confirmation. I marked every such sentence in the ledger, and labeled 19 claims “needs expert” instead of deleting them. 6 more are verified for beta, and none is unverified.",
      artifacts: ["Honesty markers", "Needs-expert list (19)", "Beta-verified list (6)"],
      changed: "Readers got the guide now, reviewers got an exact list, and nobody had to pretend to certainty that does not exist.",
    },
    {
      phase: "Walk the live site with four experts",
      when: "Oct 22, 2026",
      did: "Four reviewers sat in a room for 52 minutes and watched the showcase and the guide episodes on the live site. I triaged everything they said into three lists: six terminology decisions, 16 content corrections, and notes on video and structure. The walkthrough took the place of the first moderated followability round I had planned. That protocol is written and tooled, and has run zero sessions.",
      artifacts: ["Expert review pack", "Terminology rules T1 to T6", "Feedback triage", "Followability protocol"],
      changed: "One vocabulary now runs through 26 guides and 27 videos (“station”, never “pin”), plus 16 fixes I could not have found from the code alone.",
    },
  ],
  research: {
    methods: [
      "Superintendent concept reviews",
      "Agronomy specialist reviews",
      "Claim-by-claim audit against a pinned release (1,337 claims)",
      "Audit re-verification",
      "In-person expert walkthrough (4 reviewers, 52 min)",
      "Feedback triage into rules and corrections",
      "Followability protocol (written, not yet run)",
    ],
    findings: [
      {
        title: "Screenshots rot quietly.",
        body: "The product ships faster than its documentation. Each release can invalidate a figure without anyone noticing, so the guide is wrong at the moment a superintendent most needs it to be right. That is why the figures are a live recreation and every sentence is pinned to one release.",
      },
      {
        title: "An expert needs the why, not just the click.",
        body: "Experts in the concept reviews accepted a suggestion when they could see the reasoning: what the sensor measured, what target they set, and what arithmetic connects the two. A guide that only says “click Apply” builds compliance, not trust. So the arithmetic sits on the row, and each guide has a Why beat.",
      },
      {
        title: "Vocabulary is a UX surface.",
        body: "“Station,” “pin,” and “head” were all used for the same object, and reviewers pointed out that “pin” reads as a flag. Lynx says station, so the guides now do too. Six terminology rules were decided in one room and applied everywhere.",
      },
      {
        title: "Sample data is a UX surface too.",
        body: "Reviewers said demo suggestions of around 333% would frighten people, and one demo row showed a target of 69 where the field accepts 0 to 50. They also corrected me where I had described current and suggested adjustment as editable: only the target, the percent adjustment, and the enable switch are. Worked examples now use in-range, round numbers like 30 and 50.",
      },
      {
        title: "An audit is only as good as its instrument.",
        body: "My first coherence audit flagged a batch of contradictions. When I re-verified them, every one turned out to be an artifact of a lossy text-extraction step. One genuine defect remained. I fixed the instrument before I trusted the result.",
      },
      {
        title: "Reviewer questions can belong to the product.",
        body: "One reviewer question was not about the guide at all: renaming or renumbering stations in a renovation silently stops an old profile from matching. I wrote the caution into the guide and took the open question to the product team.",
      },
    ],
  },
  insight: "Every sentence in a guide\nis a <em>claim about the product</em>.\nCheck it, cite it, or mark it.",
  design: {
    intro:
      "The design goal was a guide a superintendent could follow alone, with the product open and little time, that stays correct after the next release. Six decisions made that possible, and each one traces to something the research turned up.",
    decisions: [
      {
        title: "Every step has the same four beats.",
        context: "The readers are experts who already know their craft. They read alone, usually at a shop computer, with the product open and little time.",
        choice: "A fixed step shape: Do, You should see, If not, and Why, capped at eight steps per guide and written at reading grade 8 or below.",
        rejected: "Narrative walkthroughs with screenshots.",
        why: "A predictable shape lets the eye jump to the next action or the recovery path without rereading a paragraph. The Why beat is where trust is earned.",
      },
      {
        title: "Put the reasoning on the row.",
        context: "In the concept reviews, experts accepted a suggestion only when they could see why it was made, and wanted the override close by.",
        choice: "The product shows measured moisture, the target, and the current and suggested adjustment on one row, and the guides teach it in that order. Accept it, edit it, or switch it off.",
        why: "A number with its arithmetic beside it can be checked at a glance, and the expert stays in control of the result.",
      },
      {
        title: "Figures are the product, not pictures of it.",
        context: "Screenshots go stale the day the UI changes, and screen recordings can't be edited. A stale figure tells a superintendent the guide can't be trusted.",
        choice:
          "Each guide drives a live recreation of the Spatial Adjust UI, with a camera that pans and zooms like a person pointing.",
        rejected: "Static screenshots and screen recordings.",
        why: "Figures can't drift, because they are the interface itself and not a capture. Every guide and video reuses the same source of truth, and the camera tells the reader exactly where to look.",
        media: {
          kind: "video",
          src: "/work/spatial-adjust/suggested.mp4",
          poster: "/work/spatial-adjust/suggested.jpg",
          alt: "Guide video: the camera moves to the Adjustment columns to compare current and suggested values.",
          width: 1280,
          height: 720,
          caption: "The camera directs attention: the current and suggested adjustment columns.",
        },
      },
      {
        title: "Use sample data that can't scare anyone.",
        context: "Reviewers reacted to the numbers in the demo before the words: a suggestion near 333%, and a target of 69 in a field that stops at 50.",
        choice: "Every worked example uses in-range values and round numbers, such as 30 and 50 instead of 26.1.",
        rejected: "Leaving realistic-looking but extreme values in the recreation.",
        why: "Sample data is a promise about normal. If the demo looks alarming or impossible, the reader assumes the product is.",
      },
      {
        title: "Decide the words in the room.",
        context: "Async comment threads about terminology had been going in circles.",
        choice:
          "An in-person, 52-minute walkthrough with four experts. Each terminology decision was recorded as a numbered rule, such as “station,” never “pin.”",
        rejected: "Another round of document comments.",
        why: "One meeting settled what weeks of comments hadn't, and the rules then applied to 26 guides and 27 videos at once. Readers meet one vocabulary everywhere.",
      },
      {
        title: "Ship with honesty markers.",
        context: "A few new sentences were needed before an expert could confirm them.",
        choice: "Ship them, mark each one in the ledger, and label 19 claims “needs expert” rather than delete them.",
        rejected: "Holding the launch, or quietly shipping unverified wording.",
        why: "Readers get the guide now, reviewers get an exact list, and nobody has to pretend to certainty that doesn't exist.",
        media: {
          kind: "video",
          src: "/work/spatial-adjust/push.mp4",
          poster: "/work/spatial-adjust/push.jpg",
          alt: "Guide video: pushing approved adjustments from Spatial Adjust to the Lynx central control system.",
          width: 1280,
          height: 720,
          caption: "From scan to water: pushing approved adjustments to Lynx.",
        },
      },
    ],
  },
  engineering: {
    intro:
      "I built the guide system end to end, so the design could stay true after launch. It works like a small compiler: claims are checked against a fixed release, content and a live UI recreation come together in one player, and the build produces a self-contained bundle that a test proves works with the network cut off.",
    nodes: [
      { id: "release", label: "Product release", sub: "fixed version", col: 0, row: 0, tone: "external" },
      { id: "ledger", label: "Claims ledger", sub: "every sentence cited", col: 1, row: 0, tone: "data" },
      { id: "content", label: "Guide content", sub: "step by step", col: 2, row: 0, tone: "service" },
      { id: "review", label: "Expert review", sub: "decided in the room", col: 0, row: 1, tone: "external" },
      { id: "glossary", label: "Glossary rules", sub: "one vocabulary", col: 1, row: 1, tone: "data" },
      { id: "player", label: "Guide player", sub: "steps · navigation", col: 2, row: 1, tone: "client" },
      { id: "ui", label: "UI recreation", sub: "camera · sample data", col: 3, row: 1, tone: "client" },
      { id: "media", label: "Video production", sub: "voice-over · captions", col: 1, row: 2, tone: "service" },
      { id: "build", label: "Build", sub: "works offline", col: 2, row: 2, tone: "service" },
      { id: "bundle", label: "Offline bundle", sub: "11 languages", col: 3, row: 2, tone: "client" },
    ],
    edges: [
      { from: "release", to: "ledger" },
      { from: "ledger", to: "content" },
      { from: "review", to: "glossary" },
      { from: "glossary", to: "player" },
      { from: "content", to: "player" },
      { from: "ui", to: "player" },
      { from: "player", to: "build" },
      { from: "media", to: "build" },
      { from: "build", to: "bundle" },
    ],
    problems: [
      {
        title: "Keeping every sentence true as the product changes",
        problem: "Each release could make any sentence in 26 guides wrong, with nothing to warn the reader or the team.",
        solution:
          "A claims ledger records the status, citation, and proposed correction for every sentence, checked against a fixed production release. Re-verifying is a comparison, not a reread.",
      },
      {
        title: "Guides that open anywhere",
        problem:
          "Superintendents and support teams needed the guides on locked-down machines with no network, and the design tool's generated output assumed a connection.",
        solution:
          "I packaged every resource into one self-contained bundle, and a test asserts the guide renders with the network disabled.",
      },
      {
        title: "Videos that can't silently change",
        problem: "27 videos in 11 languages make it easy to ship the wrong cut, and a stale video misleads the person watching.",
        solution:
          "Each media file is fingerprinted and checked on every build, so the build fails instead of shipping a stale video.",
      },
    ],
    numbers: [
      { value: 26, label: "Interactive guides", source: "Guide release notes" },
      { value: 27, label: "Narrated videos", source: "Guide release notes" },
      { value: 11, label: "Languages (10 translations + English)", source: "Guide release notes" },
    ],
  },
  outcome: {
    intro:
      "I report what I measured and say plainly what I haven't. The followability study is written and tooled, with a target of at least 80% unaided completion across at least five people per round, but it has not run yet, so this case has no task-completion number.",
    metrics: [
      { value: 1312, label: "Claims verified against the pinned production release", source: "Claims ledger: 1,312 verified, 6 verified (beta), 19 needs expert, 0 unverified" },
      { value: 19, label: "Claims openly marked “needs expert” instead of hidden", source: "Claims ledger" },
      { value: 0, label: "Unverified claims shipped", source: "Claims ledger" },
      { value: 52, suffix: " min", label: "Expert walkthrough that set the vocabulary for every guide and video", source: "Expert review sessions" },
    ],
  },
  reflection: [
    "The ledger changed how the team talks about documentation. We stopped arguing about whether a page is “good” and started asking whether a claim is verified.",
    "What I'd do differently: run the first followability round before launch, not after. Rigor in the method is not the same as evidence in the hands of a superintendent, and I want both.",
  ],
  nda: "Product UI appears through the guide's own recreation, with sample data. Invention details are limited to what is public. Reviewer and customer identities are withheld.",
};
