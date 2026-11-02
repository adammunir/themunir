import type { Project, Shot } from "../types";

/** Frames from the iCentral design file. Sample names are redacted in scripts/assets.sh. */
const f = (name: string, alt: string, width = 1920, height = 1080): Shot => ({
  src: `/work/icentral/figma/${name}.webp`,
  width,
  height,
  alt,
});

export const icentral: Project = {
  slug: "icentral",
  title: "iCentral",
  tagline:
    "Commercial irrigation for a whole city's parks, rebuilt around the map. I researched and designed it in Figma, then helped build it across the web app and the API.",
  accent: "#FF6B57",
  year: "2024 — 2026",
  role: "UX researcher and designer, then front-end and API engineer on my own designs",
  owned: ["Research", "UX", "UI", "Design system", "Content", "Front-end", "Back-end", "Testing"],
  team: "I researched and designed it with product, then built it with the iCentral web and API team",
  duration: "Design Sep 2024 · Build Aug — Oct 2026",
  platforms: ["Web", "Tablet", "Mobile web"],
  stack: ["Figma", "Design system", "Web front-end", "APIs", "Realtime data", "Maps", "Relational data", "Automated testing"],
  cover: {
    kind: "video",
    src: "/work/icentral/hero.mp4",
    poster: "/work/icentral/hero.jpg",
    alt: "The new iCentral: a parks account's controllers listed beside a live satellite map.",
    width: 1600,
    height: 900,
  },
  showcase: [
    { kind: "statement", text: "A parks department doesn't manage *one* controller. It manages a city." },
    {
      kind: "compare",
      eyebrow: "Home · before and after",
      title: "From a menu of tasks to a view of the whole account.",
      body: "The legacy Home was a status row above six picture buttons, one per task, with no map. I rebuilt it as status tiles over a controller list, with every site on the map beside it. I wanted people to see where a problem is before they go looking for it.",
      before: f("legacy-home", "Legacy iCentral Home: one system alarm row above six picture buttons for Rain Shutdown, Programming, Tools, Reports, Setup, and Payment Center."),
      after: f("hero-home-showcase", "Redesigned iCentral Home: status tiles and a controller table beside a map of every site."),
      labels: ["Before · legacy, recreated", "After · redesign"],
    },
    {
      kind: "zoom",
      eyebrow: "Information architecture",
      title: "Function first. Ten doors, no dead ends.",
      body: "The navigation was rebuilt around what people do, not around the legacy app's page-per-task screens: Home, Account, Program, Manual Ops, Shutdown, Weather, Reports, Payments, Contact, and Help.",
      shot: f("ia-sitemap", "iCentral sitemap: Home branching into ten function-first sections with their dropdowns and nested options.", 2400, 1461),
      focus: { x: 50, y: 42, scale: 2.6 },
    },
    {
      kind: "desktop-walk",
      eyebrow: "Global Adjustments · three steps",
      title: "Change dozens of controllers in one pass.",
      steps: [
        { shot: f("ga-1-select", "Global Adjustments step 1: select controllers, with micro-climate readings per row."), heading: "Select", body: "Start from controllers or from programs, across the whole account. The selection stays pinned on the left the whole way through." },
        { shot: f("hero-global-adjustments", "Global Adjustments step 2: programs across several controllers in one editable table."), heading: "Adjust in bulk", body: "Programs from many controllers in one table: percent adjust, water window, overlap, and cycles, edited once instead of controller by controller." },
        { shot: f("ga-3-schedule", "Program schedule and station runtimes for the selection, with Load Settings."), heading: "Start from a known-good setup", body: "Load settings from an existing program, then tune the schedule and station runtimes for everything selected." },
        { shot: f("ga-4-review", "Review step: current and new values side by side with a checkbox on every change."), heading: "Review every change", body: "Current and new values side by side, with a checkbox on each change, so nothing is sent by accident." },
        { shot: f("ga-5-success", "Saving and sending confirmation after the batch goes out."), heading: "Save and send", body: "One confirmation for the whole batch. Before anything changes, iCentral saves a version of the current settings you can restore later." },
      ],
    },
    {
      kind: "breakpoints",
      eyebrow: "Responsive",
      title: "The same Home at the desk, on a tablet, and in the field.",
      body: "Status tiles, the controller list, and the map reflow from 1920 to 393. On a phone the list and map share one toggle.",
      shots: [
        { ...f("hero-home-showcase", "iCentral Home at 1920 px: status tiles and the controller table beside the map."), viewport: 1920 },
        { ...f("resp-tablet-home", "iCentral Home at 768 px.", 768, 1120), viewport: 768 },
        { ...f("resp-mobile-home", "iCentral Home at 393 px.", 393, 852), viewport: 393 },
      ],
    },
    {
      kind: "scrub",
      eyebrow: "Scroll to drive it",
      title: "Weather, schedule, and water, at your pace.",
      body: "Precision weather controls, the schedule calendar, and water use, from the launch film. Scroll to move through it.",
      src: "/work/icentral/scrub.mp4",
      poster: "/work/icentral/scrub.jpg",
      width: 1280,
      height: 720,
    },
    { kind: "film", src: "/work/icentral/film.mp4", poster: "/work/icentral/film.jpg", title: "The new iCentral" },
  ],
  headline: { value: "25 → 3", label: "Access settings nobody could read, from 25 separate checkboxes down to three levels people understand at a glance." },
  tldr: {
    problem:
      "iCentral runs commercial irrigation for parks departments, campuses, and contractors managing many sites. The legacy app was one page per task, with no way to see a whole account on a map or act on many controllers at once, and its access settings were too complex for anyone to reason about.",
    did:
      "I audited competing products, set a North Star and three experience pillars, and designed the new iCentral around a map-first Home, bulk control, and plain-language access. In 2026 I joined the build and made my own designs real: the shared table, the header and account switching, the Help Center, in-app feedback, and the access rebuild across the web app and the API.",
    result:
      "The redesign is in beta, so there are no adoption numbers yet. Access went from 25 checkboxes to three plain levels, and in ten weeks I shipped 359 unique changes across 550 web files and 83 API files.",
  },
  context: [
    "<strong>iCentral</strong> is Toro's central control for Rain Master Eagle and Eagle Plus controllers. Its users are city parks and recreation departments, municipalities, school and college campuses, and grounds teams managing many sites.",
    "The legacy product is a web app built one page per task. The redesign had to coexist with it: both systems share one database and stay in sync, so this was a migration, not a greenfield build, and every new screen had to respect what the old one already stored.",
    "I did the research and set the design direction in September 2024, in a design-thinking deck that runs from background and competitor analysis to pillars, layout, and concepts. In August 2026 I moved into the code, building against my own Figma specs in the web app and, where the design needed it, in the API.",
  ],
  process: [
    {
      phase: "Audit the field",
      when: "Sep 2024",
      did: "I reviewed three competing central-control products side by side, noting what each did well and where it stopped. Their strengths were clear overviews, real-time updates, and broad feature sets. I logged seven gaps, from no global settings or global shutdown to weak mobile support and no feature hints.",
      artifacts: ["Competitor analysis, 3 products", "Seven-gap list", "Bulk management opportunity"],
      changed: "Bulk control across many controllers became the lead opportunity, and it grew into Global Adjustments.",
    },
    {
      phase: "Set the direction",
      when: "Sep 2024",
      did: "I wrote one North Star for the product and turned it into three experience pillars: Streamlined Control, Actionable Insights, and a Map-Centric Irrigation Hub. Each pillar carries a one-line reason tied to a user need. I then framed three How Might We questions and sketched ideas under each, such as one-tap actions, live data snapshots, and color-coded map status.",
      artifacts: ["North Star", "Three experience pillars", "Three How Might We questions", "Idea clusters"],
      changed: "The pillars became the test every later screen had to pass, and the map moved from a feature to the center of Home.",
    },
    {
      phase: "Information architecture and Home",
      did: "I worked from the legacy app's page list and its old-to-new route map, then regrouped the tasks by what a person is trying to do. The sitemap has ten function-first sections and five node types, from primary sections to external links. I drew Home as a list beside a map under a slim rail and top bar, and explored multi-select and status tooltips on it.",
      artifacts: ["Legacy page list", "Function-first sitemap", "Home layout concept", "Multi-select and tooltip studies"],
      changed: "Navigation moved from one page per task to ten places by function, and Home became a list beside a map with six status tabs.",
    },
    {
      phase: "Responsive system",
      did: "Each feature page in the design file carries Desktop, Tablet, and Mobile sections at 1920, 768, and 393 pixels. I built on Toro's existing component library instead of starting a new one, and applied it to the table rows, status icons, and mobile components the product needed. During the build I kept a walk checklist for each epic and compared captures against the Figma frames at 1920, 1366, and 390.",
      artifacts: ["Desktop, tablet, and mobile frames", "Table row specs", "Per-epic walk checklists", "Figma vs build captures"],
      changed: "Table and filter rules were set for the half-width list beside the map, which led to one shared table with a single Filter menu.",
    },
    {
      phase: "Access model",
      when: "Sep — Oct 2026",
      did: "I read the permission model end to end: 25 flags in a bitmask, a role on top, and per-controller access, all shared with the legacy app. I checked all 25 written names against what the database stored, then grouped what an admin actually decides into Full Access Plus, Custom with six boxes, and View Only. I drafted a separate Manage Users flag first, then dropped it for a model that adds none.",
      artifacts: ["Permission map, 25 flags", "Three-level access model", "Staff read-only state", "Invite and edit flows"],
      changed: "Admins choose from three plain levels, and Toro staff see that their access comes from their role instead of a Save that did nothing.",
    },
    {
      phase: "Help and feedback",
      when: "Oct 2026",
      did: "A product manager asked for live feedback from beta testers without making it a requirement. I wrote the Help Center from the real pages, with screenshots, so help matches what people see. I moved the feedback entry from a floating button into the header after it covered map controls and table rows, then set a skippable prompt for about twice a month.",
      artifacts: ["Feedback request brief", "Help Center", "Header feedback drawer", "Prompt rules"],
      changed: "Nothing sits on the map, and beta testers now have a channel to replace my pillars with evidence.",
    },
  ],
  research: {
    methods: [
      "Competitive analysis of three central-control products: strengths, seven gaps, one opportunity",
      "North Star, three experience pillars, and three How Might We questions with idea clusters",
      "Legacy audit: page list and old-to-new route map, regrouped by task intent",
      "Function-first information architecture, drawn as a ten-section sitemap",
      "Permission model audit: 25 flags, roles, per-controller access, every written name checked",
      "Stakeholder brief: a product manager's request for beta feedback",
      "Figma vs build walk checklists per epic, captured at three widths",
    ],
    findings: [
      {
        title: "Nobody could act on many controllers at once.",
        body: "The competitive review flagged the same gap first: no global settings, no global shutdown, no bulk edits. For a parks department with dozens of sites, that is the whole job. It became the lead opportunity and, later, Global Adjustments.",
      },
      {
        title: "Pages, not places.",
        body: "The legacy app was organized as one page per task: a program page, a schedule page, a weather setup page, a reports page. Irrigation happens in places, so the redesign leads with a map of every site, with status as color, and users see where a problem is before they hunt for it.",
      },
      {
        title: "Two apps, one database.",
        body: "The legacy app and the new one share a database and stay in sync, so every new screen has to respect what the old one already stores. That made this a migration, and it capped how freely I could redraw anything that touches stored data, access most of all.",
      },
      {
        title: "Access was unreadable.",
        body: "Permissions were 25 separate flags plus a role, shared with the legacy app. Nobody can reason about 25 checkboxes when inviting a colleague, so an admin couldn't tell what they were granting.",
      },
      {
        title: "The brief said ask, don't require.",
        body: "The product manager wanted beta feedback and was wary of forcing it. A pull-only widget reaches only people who think to open it. That tension set the shape of the feedback work: always available, occasionally offered, always skippable.",
      },
      {
        title: "No one had used it yet, so I didn't pretend.",
        body: "I ran no interviews or usability tests on this redesign. The direction is competitor-informed and pillar-driven, and each decision below names the pillar and evidence behind it. Walk checklists against the design held the build to it. The in-app feedback channel exists so beta testers can replace my pillars with evidence.",
      },
    ],
    quote: {
      text: "I'm not sure we should require feedback, but I definitely want beta users to provide it",
      who: "Product manager, in the request that started the in-app feedback work",
    },
  },
  insight: "A parks department\ndoesn't manage a controller.\nIt manages a <em>city.</em>",
  design: {
    intro:
      "Three pillars set the direction: streamlined control, actionable insight, and a map-centric hub. No usability study backed this work, so each decision below carries its own evidence: a gap from the competitor review, a pillar it serves, or a fact about the system underneath. Together they trace from research to screen.",
    decisions: [
      {
        title: "Map-first Home.",
        context: "The third pillar asked for a map that acts, not just shows. In the legacy app, status lived on separate pages and nothing showed a whole account at once.",
        choice: "A controller list beside a live satellite map, with selection synced both ways, six status tabs (Alarms, ET Failure, Out of Sync, Rain Shutdown, Offline, Balance), and live badges on every pin.",
        rejected: "The legacy app's page per task.",
        why: "Seeing every site's health at a glance is the job. Status as color means a problem shows up before anyone hunts for it, and the map makes location-based action one click away.",
      },
      {
        title: "Ten function-first sections.",
        context: "The legacy app's pages were named for tasks: a program page, a schedule page, a weather setup page, a reports page. I listed them and regrouped by intent.",
        choice: "A sitemap with ten sections: Home, Account, Program, Manual Ops, Shutdown, Weather, Reports, Payments, Contact, and Help. Dropdowns and nested options carry the depth.",
        rejected: "The legacy app's page-per-task structure.",
        why: "People arrive with a job in mind, such as shutting down or changing a schedule. Section names that match the job leave fewer places to guess.",
      },
      {
        title: "Bulk control in three steps, with a review.",
        context: "The competitor review found no global settings, no global shutdown, and no bulk edits. That was the first gap on my list, and for an account with dozens of sites it is the whole job.",
        choice: "Global Adjustments: select controllers or programs across the account, edit them in one table, then review current and new values side by side with a checkbox on every change. Before anything is sent, the system saves a version of the current settings that can be restored.",
        why: "Bulk power is only safe if it is visible. The review step and the saved version make a change to dozens of controllers something an admin can check and restore.",
      },
      {
        title: "Three access levels, not 25 checkboxes.",
        context: "The permission model is 25 separate flags plus a role, shared with the legacy app, so I couldn't redraw it freely. I read all 25 names against what the database stored, and admins had to read the result when inviting a colleague.",
        choice: "An access picker with Full Access Plus, Custom (six plain boxes), and View Only, on both invite paths. For Toro staff, whose access comes from their Toro role, the screen says so and offers no Save.",
        rejected: "A flat grid of raw flags, a new “Manage Users” flag I drafted and dropped, and editable boxes the system would ignore.",
        why: "Editable boxes for staff “looked like a save that didn't work.” Three words map to how an admin thinks about a colleague, and the shipped model adds no flag, so the legacy app keeps reading the same 25.",
      },
      {
        title: "One table, one Filter menu.",
        context: "Every page had its own table, with rows of tabs and filter buttons. In my Home concept the list is only about 900 pixels wide beside the map.",
        choice: "One shared table component with opt-in search, density, grouping, and a single Filter menu. Location hides itself on narrow panes.",
        rejected: "Bespoke tables per page and tab-based filtering.",
        why: "The list sits beside the map at about half the screen, so it has to stay calm and consistent at that width.",
      },
      {
        title: "Feedback lives in the header, not over the map.",
        context: "The first feedback widget was a floating button.",
        choice: "A Send Feedback button in the global header that opens a drawer, plus a card on Help. Unsent text is kept as a draft.",
        rejected: "The floating button.",
        why: "It covered map controls and table rows on every page. In a map-centric product, nothing gets to sit on the map.",
      },
      {
        title: "Ask occasionally. Let people skip.",
        context: "Product wanted beta feedback but was wary of requiring it, and a widget alone reaches only people who think to open it.",
        choice: "A skippable rating prompt about twice a month, never in the first minute, never over another dialog, at most once a session.",
        rejected: "Required feedback, or a pull-only widget that most people never open.",
        why: "Respectful timing gets honest answers. The widget stays as the channel for people who want to say more.",
      },
    ],
  },
  engineering: {
    intro:
      "The web app talks to account and command services through one gateway, commands reach the field controllers through an ordered queue, and live status streams back so the map stays current. I built parts of the web app and the API so the designs held all the way down.",
    nodes: [
      { id: "spa", label: "Web app", sub: "map · tables · help", col: 0, row: 0, tone: "client" },
      { id: "gw", label: "API gateway", sub: "one entry point", col: 1, row: 0, tone: "service" },
      { id: "acct", label: "Account services", sub: "identity and access", col: 2, row: 0, tone: "service" },
      { id: "sql", label: "Database", sub: "shared with legacy", col: 3, row: 0, tone: "data" },
      { id: "sync", label: "Realtime updates", sub: "live status", col: 0, row: 1, tone: "service" },
      { id: "cmd", label: "Command service", sub: "ordered queue", col: 2, row: 1, tone: "service" },
      { id: "bridge", label: "Controller link", sub: "field connection", col: 3, row: 1, tone: "external" },
      { id: "ctrl", label: "Field controllers", sub: "in the field", col: 3, row: 2, tone: "external" },
    ],
    edges: [
      { from: "spa", to: "gw" },
      { from: "gw", to: "acct" },
      { from: "acct", to: "sql" },
      { from: "acct", to: "cmd" },
      { from: "cmd", to: "bridge" },
      { from: "bridge", to: "ctrl" },
      { from: "cmd", to: "sync", label: "status" },
      { from: "sync", to: "spa" },
    ],
    problems: [
      {
        title: "Admins saw “Something went wrong” after a save that had worked",
        problem: "Saving permissions showed an error popup even though the save had already gone through, so the screen looked broken when it wasn't.",
        solution:
          "I reproduced it in a minimal app and found three separate faults behind one popup: a response that pointed at the wrong place, a permission-name mismatch, and a piece the database never shipped. I replaced the legacy piece rather than porting it.",
      },
      {
        title: "Three plain levels had to match 25 flags underneath",
        problem:
          "Invites, adds, and saves had to agree on what each level means. Every save was failing on a data mismatch before any permission check ran, and two services wrote new users in slightly different ways, with a race between them.",
        solution:
          "View Only sends exactly nothing and Billing goes only with Custom. The two add-user paths became one all-or-nothing write, and invites gained their own stored permissions, so a re-invite never lowers access.",
      },
      {
        title: "Feedback had to cost nothing at startup",
        problem: "Beta testers needed to send feedback without the app getting slower or the prompt turning into a nag.",
        solution:
          "The widget and prompt load only after the app is up. The prompt schedule is kept per user and can be tested with a controllable clock. One flow serves development, QA, and production, with every item tagged by environment.",
      },
    ],
  },
  outcome: {
    intro:
      "The redesign is in beta and no one outside the team has used it at scale yet, so there are no adoption numbers to report. These numbers describe the design simplification and the build, de-duplicated so they aren't inflated by stacked branches.",
    metrics: [
      { value: 3, label: "Plain access levels replace 25 separate checkboxes", source: "Design file index and repository history, Oct 2026" },
      { value: 10, label: "Function-first sections replace the legacy page-per-task navigation", source: "Design file index (sitemap)" },
      { value: 359, label: "Unique changes to the web app, Aug 14 to Oct 23, 2026", source: "Repository history, Aug–Oct 2026, counted by unique change rather than by commit" },
      { value: 633, label: "Files touched: 550 in the web app, 83 in the API", source: "Repository history, Aug–Oct 2026" },
      { value: 51, label: "Commits building the in-app Help Center", source: "Repository history, Aug–Oct 2026" },
    ],
  },
  reflection: [
    "Building my own designs changed how I design. When the access picker had to agree with 25 flags and two services, the clean three-word UI only held because I could follow it all the way to the database.",
    "I work with AI agents as drafting partners. The discovery doc and several specs were drafted that way, and every decision, commit, and claim here passed my review. Next, I want real beta feedback through the channel I built, and a usability round to replace the pillars with evidence.",
  ],
  nda: "Screens use the launch film's fictional Harbor Vale Parks account, and sample names are replaced. The legacy screen in the film is a recreation. Competitors, infrastructure, and internal URLs are withheld. Map imagery: USGS The National Map.",
};
