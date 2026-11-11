import type { Project } from "../types";

export const toroPipeline: Project = {
  slug: "toro-pipeline",
  title: "Toro Pipeline",
  tagline: "A delivery-intelligence instrument that surfaced an 11-month slip hiding in plain sight.",
  accent: "#FFB547",
  year: "2026",
  role: "Solo researcher, UX designer & engineer",
  owned: ["Research", "UX", "UI", "Front-end", "Back-end", "Testing"],
  team: "Solo researcher, designer and builder, with Engineering, QA, and Product leadership as stakeholders",
  duration: "7 weeks · Sep — Oct 2026",
  platforms: ["Web", "Desktop agent", "In-app feedback"],
  stack: ["Design tokens", "Data visualization", "Web front-end", "APIs", "Data pipelines", "Embedded database", "Desktop automation", "Automated testing"],
  cover: {
    kind: "art",
    id: "rebaseline",
    src: "art:rebaseline",
    alt: "Chart of a testing milestone that was rebaselined twice while its forecast slipped about eleven months.",
  },
  headline: { value: "~11 mo", label: "of real schedule slip surfaced, invisible in every individual status deck" },
  tldr: {
    problem:
      "Program leads could not see the plan and the work on one axis. Planned dates lived in monthly slide decks, and the actual work lived in four separate tools for tests, defects, backlog, and analytics. Engineering said testing took too long, and QA said it got unstable builds late. Nobody could trust a view that favored a side.",
    did:
      "I was the researcher, the UX designer, and the engineer. I read 616 decks to find the 32 that mattered, then designed an instrument both sides could trust: a person confirms every value before it reaches a chart, the same code measures both teams, and stale data says so. I built it end to end, joining five systems on a single release key.",
    result:
      "One milestone had moved 8 times in 11 meetings, and its plan had been quietly rebaselined twice. Each deck reported variance against the latest plan only, which hid about 11 months of slip. Rebaseline detection became a required feature. One database now serves three products, behind about 1,377 automated tests.",
  },
  context: [
    "Every month, product leadership reviews a slide deck per program: milestones, a plan column, a current column, and a comment. It is the plan of record, and it lives in slides.",
    "The work itself happens elsewhere. Test runs are in the test tracker, defects in the bug tracker, engineering items in the backlog, and field usage in product analytics. On one program, Engineering and QA disagreed openly about why testing kept running long. Both had evidence, and neither had the whole picture.",
    "I set out to design one place where the plan and the work could be read together, and then I built it. Because it would land in the middle of a live disagreement, it had to be fair before it could be useful.",
  ],
  process: [
    {
      phase: "Read the plan of record",
      when: "Sep 2026",
      did: "I read the monthly deck archive end to end: 616 decks, 32 of them with the program in scope, February 2024 to September 2026. I anchored the parser on table shape, not slide number, because the template changed over the years. Then I rebuilt each milestone as a series across meetings.",
      artifacts: ["616-deck census", "32-deck milestone series", "Rebaseline chart"],
      changed: "Against the first promise, one milestone had moved 8 times in 11 meetings and its plan had been rebaselined twice, so rebaseline detection became a required feature.",
    },
    {
      phase: "Find what actually joins",
      when: "Sep 2026",
      did: "I tested every candidate join key against live data in each tracking system. Test milestones, bug-tracker fix-fors and ticket numbers all failed, and only version plus platform held. I also found the test tracker’s completion dates unreliable, because plans are left open, so I used the untested-case count as the progress signal.",
      artifacts: ["Join-key trials", "Release key", "Dead-end list", "Progress-signal rule"],
      changed: "Only sources that join honestly were joined. Two were left unjoined on purpose, and progress is measured by untested cases, not by a completion date that lies.",
    },
    {
      phase: "Design for the dispute",
      when: "Sep 2026",
      did: "I wrote down both positions as I understood them. Engineering says testing takes too long, and QA says it gets unstable builds late and is held to dates set before the handoff slipped. The decks already declared owners in the milestone text, so I built six ownership rules from that, in a fixed order, with the handoff rule ahead of the test-work rule so a promise to hand over a build is never filed as testing work.",
      artifacts: ["Attribution note", "Six ordered ownership rules", "Experimental label"],
      changed: "Fairness became a property of the method: the same code measures both sides, the working is shown, and no rule order can charge QA for time spent waiting.",
    },
    {
      phase: "Decide what to leave out",
      when: "Sep 2026",
      did: "I compared the design file with what the data could support. Three elements on the usage card had no source, so I left them out and recorded why, because an omission looks identical to an oversight. I designed an evidence rail with four states, including “unknown” where there is a gap, and an Ask page with a designed refusal. Then I checked each region by screenshot against the design file, not by selector.",
      artifacts: ["Omission record", "Four evidence states", "Refusal card", "Screenshot verification"],
      changed: "No placeholders, no zeros, no interpolation. A missing number is shown as missing, and the record says why.",
    },
    {
      phase: "Audit every surface",
      when: "Sep 30, 2026",
      did: "I ran the app against a scratch copy of the real data, plus recorded fixtures for sources it had never captured. Fifteen agents each took one surface (14 pages plus the shell) and listed every empty, wrong or false state the code can render. Adversarial verifiers then tried to refute each claim, reclassified 84 of 556 contested ones and added 83 missed states. I did not inspect production, and the audit says so.",
      artifacts: ["Gap list", "Row-by-row appendix", "Verifier reclassifications", "Redesign prototype"],
      changed: "The gap list became the redesign brief: fix every blank, wrong cause and false figure first, then restyle.",
    },
    {
      phase: "Run it for real",
      when: "Oct 2026",
      did: "The deck agent went live on October 8, and I set the staleness rule at 8 days so a sleeping machine shows up as stale, not as a zero. Then I widened the instrument to carry in-app feedback from the products on a Feedback tab, with a weekly chart card that starts closed and details laid out as divided label and value rows.",
      artifacts: ["8-day staleness rule", "Feedback tab", "Weekly chart card", "Divided detail rows"],
      changed: "The instrument now says when it is blind, and feedback from the products lands in the same place as the delivery data.",
    },
  ],
  research: {
    methods: [
      "Deck archaeology (616 files)",
      "Source-by-source access and join trials",
      "Milestone series analysis (32 decks)",
      "Stakeholder positions",
      "Ownership rule design",
      "15-agent UI audit",
      "Adversarial verification",
      "Screenshot checks against the design file",
    ],
    findings: [
      {
        title: "The baseline moves, so the variance lies.",
        body: "Across 32 decks, one testing milestone moved 8 times in 11 meetings. Twice the plan column itself was rewritten. Each deck looked roughly on track against its own baseline, while the original promise drifted by about 11 months.",
      },
      {
        title: "A frozen date is a finding too.",
        body: "One start date sat unchanged for ten consecutive meetings while everything around it moved. A forecast nobody refreshes is a signal. It is why the dashboard shows stale data as stale, and why it never fills a gap with the last value.",
      },
      {
        title: "No two systems agree on what a release is.",
        body: "Test-tracker milestones, bug-tracker fix-fors, and ticket numbers each turned out to be dead ends as a join key. Only version plus platform held across every source. For a reader, that means every number sits on a release they can name, and the systems that couldn't join honestly were left unjoined.",
      },
      {
        title: "Rule order can invert a finding.",
        body: "The word “testing” appears in both a handover promise and a test-completion promise. If the test-work rule ran first, Engineering’s handover would be filed as QA’s work, and QA would be charged for every month it spent waiting. The handoff rule runs ahead of it, and a test pins the order.",
      },
      {
        title: "Empty states are where trust dies.",
        body: "I ran the dashboard through a fifteen-agent audit: each agent took one surface, and adversarial verifiers checked their work. They reclassified 84 of 556 contested claims and found 83 places where the dashboard showed nothing, the wrong cause, or a false figure. A placeholder is a claim: a flat sparkline says usage did not move, so I left out what nobody measured and recorded the omission.",
      },
      {
        title: "The tool would land in a live dispute.",
        body: "If either team could dismiss it as built for the other side, it was dead on arrival. Fairness had to be part of the design, not a promise. That was the main UX challenge.",
      },
    ],
    quote: {
      text: "It is designed so that neither party can be harmed by it more easily than the other.",
      who: "From my own design note for the accountability page",
    },
  },
  insight: "A status report shows the gap to the latest plan.\nThe <em>truth</em> is the gap\nto the first promise.",
  design: {
    intro:
      "The interface is quiet on purpose. I designed it in a design project with documented tokens and a fidelity handoff, then built it to match. Under it are six decisions about trust, and they matter more than any chart style. The same app also carries in-app feedback from the products on a Feedback tab: a weekly chart card that starts closed, and details laid out as divided label and value rows.",
    decisions: [
      {
        title: "Measure from the first promise.",
        context: "Each monthly deck reports variance against the latest plan. Twice, that plan had been rewritten.",
        choice: "Slip is measured from the first baseline, and every rebaseline is detected and shown on the chart.",
        rejected: "Reporting variance against the current plan, as the decks do.",
        why: "A deck can look on track while the original promise drifts by months. The gap that matters to a leader is the one to the first date.",
      },
      {
        title: "Nothing reaches a chart unconfirmed.",
        context: "Values are parsed out of slides written by people, in free text, and they vary from month to month.",
        choice:
          "Every ingested value lands as pending. Charts read only from a confirmed view, and a test fails the build if any code outside three files touches the raw table.",
        rejected: "Auto-publishing parsed values with a confidence score.",
        why: "In a dispute, one wrong number would end the tool's credibility for good. A human gate is cheap, and lost trust is not. Readers see only values a person has checked.",
      },
      {
        title: "Fair by construction.",
        context: "Engineering and QA each suspected the other of moving the goalposts.",
        choice:
          "Ownership comes from the milestone text itself: “Ready for testing” belongs to Engineering, and “Testing completion” belongs to Test. The same code measures both sides and shows its working, and the page ships labelled experimental.",
        rejected: "A manually assigned owner field.",
        why: "Neither party can be harmed by the page more easily than the other, and either can audit how the result was reached.",
      },
      {
        title: "Order the rules so the finding can’t flip.",
        context: "A handover promise and a test-completion promise both contain the word “testing”.",
        choice: "Six ownership rules run in a fixed order, with the handoff rule ahead of the test-work rule, and a test pins that order.",
        rejected: "Matching on keywords in whatever order they were written.",
        why: "A plausible-looking rule order would have filed Engineering’s handover as QA’s work and charged QA for every month it waited. That is the exact inverse of what the data says.",
      },
      {
        title: "Show stale or absent, never zero.",
        context: "Deck data depends on a machine that can sleep, and some figures the design asked for had no source at all.",
        choice: "After 8 days without a refresh, deck data is marked visibly stale. Elements with no source are left out, and the omission is written down.",
        rejected: "Silently showing the last value, recording a zero, or drawing a placeholder.",
        why: "A false zero looks like good news, and a placeholder is a claim nobody measured. A visible stale marker and a recorded omission tell the truth about what the system knows.",
      },
      {
        title: "Design the exit.",
        context: "The deck agent exists only because of an access constraint that might be lifted.",
        choice: "The agent directory can be deleted without touching the application, and its single point of failure is documented.",
        rejected: "Weaving the workaround into the core.",
        why: "Good design records why something exists and how to remove it. Leaders are never stuck depending on a workaround.",
      },
    ],
  },
  engineering: {
    intro:
      "I built this myself, front end to back end, and kept it plain: five inputs, one confirmation gate, and one database. Every connector is read-only against systems other teams rely on daily, so the build serves the experience, not the other way around.",
    nodes: [
      { id: "decks", label: "Monthly decks", sub: "shared files", col: 0, row: 0, tone: "external" },
      { id: "agent", label: "Desktop agent", sub: "scheduled · parse", col: 1, row: 0, tone: "service" },
      { id: "sources", label: "Delivery systems", sub: "tests · bugs · work · analytics", col: 0, row: 1, tone: "external" },
      { id: "conn", label: "Read-only connectors", sub: "scheduled", col: 1, row: 1, tone: "service" },
      { id: "widgets", label: "In-app feedback", sub: "product widgets", col: 0, row: 2, tone: "client" },
      { id: "flow", label: "Feedback relay", sub: "automated flow", col: 1, row: 2, tone: "external" },
      { id: "api", label: "Ingest API", sub: "release-key join", col: 2, row: 1, tone: "service" },
      { id: "db", label: "Database", sub: "pending → confirmed", col: 3, row: 0, tone: "data" },
      { id: "gate", label: "Confirm gate", sub: "human approval", col: 3, row: 1, tone: "service" },
      { id: "ui", label: "Dashboard", sub: "three products", col: 3, row: 2, tone: "client" },
    ],
    edges: [
      { from: "decks", to: "agent" },
      { from: "agent", to: "api" },
      { from: "sources", to: "conn" },
      { from: "conn", to: "api" },
      { from: "widgets", to: "flow" },
      { from: "flow", to: "api" },
      { from: "api", to: "db" },
      { from: "db", to: "gate" },
      { from: "gate", to: "ui" },
    ],
    problems: [
      {
        title: "Leaders needed the plan of record, and it was out of reach",
        problem: "The decks sat behind access the cloud could not get through, blocked by several independent policies. Without them the dashboard had no plan to compare against.",
        solution:
          "A small desktop agent reads the decks from synced files and sends rows to the API. Its single point of failure, a sleeping machine, is documented and shown to the reader as staleness.",
      },
      {
        title: "A wrong join would invent accountability",
        problem: "Each system names releases differently, and a mismatch would put the wrong blame on the wrong team.",
        solution:
          "A shared release key of version plus platform, after the other candidate keys were verified as dead ends. Sources that can't join honestly are deliberately left unjoined.",
      },
      {
        title: "One team's data in another team's report",
        problem: "Three products share one database, and a leak would put one team's numbers in front of another.",
        solution:
          "Isolation tests write newer rows for one product into every capture table and assert that reads for the other two are unchanged.",
      },
    ],
    numbers: [
      { value: 5, label: "Source systems joined", source: "Product documentation" },
      { value: 3, label: "Products served from one database", source: "Product documentation" },
      { value: 143, label: "Commits in seven weeks, design through code, all mine", source: "Repository history, Sep to Oct 2026" },
    ],
  },
  outcome: {
    intro:
      "The headline finding came from the research, not from a chart, and it changed what the product had to be. Rebaseline detection went from nice-to-have to required.",
    metrics: [
      { value: 11, prefix: "~", suffix: " mo", label: "True slip, hidden by two silent rebaselines", source: "Internal timeline analysis, Sep 2026" },
      { value: 8, label: "Times one milestone moved in 11 meetings", source: "Internal timeline analysis, Sep 2026" },
      { value: 83, label: "Missing or misleading empty states found and fixed", source: "Internal UI audit, Sep 2026" },
      { value: 15, label: "Surfaces audited, one agent each, then adversarially checked", source: "Internal UI audit, Sep 2026" },
    ],
  },
  reflection: [
    "The most valuable thing I shipped was a sentence: the plan has been rebaselined twice. Engineering the instrument was the price of being believed when I said it.",
    "Next, I'd add usage telemetry to the dashboard itself. I can show what it found, but not yet how often leadership opens it or what decisions it changed.",
  ],
  nda: "Real milestone names, product dates, and team-level results are withheld. The cover chart is reconstructed and simplified from the monthly deck series.",
};
