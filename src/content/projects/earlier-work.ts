import type { Project, Media } from "../types";

const image = (name: string, alt: string, width = 2254, height = 1396): Media => ({
  kind: "image", src: `/work/earlier/${name}`, alt, width, height,
});

export const onehubtv: Project = {
  slug: "onehubtv", title: "OneHubTV", year: "2020 — 2022", accent: "#E6C95A",
  tagline: "Helping viewers discover content, understand the packages, and get to watching.",
  role: "Senior UI/UX Designer", team: "Creative, product, engineering, and QA at Vision247",
  duration: "2020 — 2022", platforms: ["Web", "Mobile", "TV exploration"],
  owned: ["Research", "UX", "UI", "Prototyping", "Design system"],
  stack: ["Interaction design", "Prototyping", "Product analytics", "Reusable UI"],
  cover: image("newonehub.png", "OneHubTV redesigned streaming homepage and content presentation"),
  headline: { value: "Find. Choose. Watch.", label: "A clearer journey from exploring the catalogue to choosing a package." },
  tldr: {
    problem: "Viewers needed to understand an unfamiliar streaming service with a complex mix of free content and channel packages. Navigation and package presentation made choosing what to watch harder than it needed to be.",
    did: "I redesigned the web experience, explored mobile adaptations, and worked with creative, engineering, and QA partners. Participant feedback and analytics informed navigation, content previews, and package presentation.",
    result: "The redesign brought content discovery, package selection, and account navigation into a shared interface language. Historical outcome figures are being reconciled; this story focuses on the decisions and delivered design work.",
  },
  context: ["OneHubTV was Vision247's own streaming product, built for audiences including people looking for content from their country of origin. The experience needed to explain what was available before asking a new viewer to commit.", "I joined to investigate the interface and conversion journey. The challenge extended beyond visual polish: viewers needed a clearer account of the catalogue, packages, and routes into watching."],
  research: {
    methods: ["Participant feedback", "Journey analysis", "Product analytics", "Competitive review", "Prototyping"],
    findings: [
      { title: "Viewers needed to see the content first.", body: "Feedback supported showing what the service offered before asking people to purchase. A free-watch entry and content-led presentation gave newcomers a way to explore." },
      { title: "Packages needed a recognizable structure.", body: "The service combined free content and paid channel packages. Package cards needed to explain those choices without making viewers decode the pricing model." },
      { title: "Navigation had to work around the content.", body: "The global navigation appeared across the homepage, account areas, and viewing surfaces. Search and profile access needed to remain recognizable as the surrounding content changed." },
    ],
  },
  insight: "Before choosing a package,\na viewer needs to know\n<em>what they can watch.</em>",
  design: {
    intro: "The design connects exploration, package selection, and account access. Each change gives viewers a more explicit next step.",
    decisions: [
      { title: "Let people explore before asking them to buy.", context: "New visitors could not judge the offer from package names alone.", choice: "Bring content into the opening experience and make the free-watch route visible.", why: "A visible catalogue gives viewers something concrete to evaluate before making a subscription decision.", media: image("newonehub.png", "Content-led OneHubTV homepage") },
      { title: "Make packages recognizable and comparable.", context: "Packages were modular and could contain different channels.", choice: "Use consistent package cards with content imagery and direct routes to each offering.", why: "The cards explain the choices and can accommodate changes to the catalogue.", media: image("PLANSIMG.png", "OneHubTV modular package presentation") },
      { title: "Carry the interface language across devices.", context: "The service extended beyond the web homepage.", choice: "Explore mobile interfaces using the same modular content structure and visual language.", why: "Familiar patterns help the product remain recognizable when a viewer moves to another device.", media: image("iphoneshowcase.png", "Historical mobile interface designs for OneHubTV", 3548, 2180) },
    ],
  },
  engineering: { intro: "I partnered with engineering on the interface and its reusable patterns. This historical case study shows design artifacts; it does not claim sole ownership of the streaming platform's implementation.", nodes: [], edges: [], problems: [
    { title: "Navigation across different surfaces", problem: "A navigation treatment that worked over the homepage also had to remain legible around account and viewing content.", solution: "Explore the global component in context and consolidate search and profile access into a consistent panel." },
  ] },
  outcome: { intro: "The team delivered a redesigned OneHubTV experience and continued iterating its journeys. The old case study and resume describe different conversion measures; those figures are withheld here until their definitions and periods are reconciled.", metrics: [] },
  reflection: ["The important shift was from refreshing the interface to explaining the offer. Content visibility and package comprehension deserved as much attention as visual consistency.", "This is streaming-product experience. It does not by itself establish experience designing creator tools or live community systems."],
};

export const hyperjar: Project = {
  slug: "hyperjar", title: "HyperJar Kids Card", year: "2020", accent: "#B7A1EF",
  tagline: "Helping parents understand and join a new family money product.",
  role: "Product design for the Kids Card launch", team: "Product, marketing, engineering, and analytics at HyperJar",
  duration: "2020 launch", platforms: ["Web", "App presentation", "Physical card"],
  owned: ["UX", "UI", "Prototyping", "Design system", "Content"],
  stack: ["Interaction design", "Launch experience", "Verification flows", "Visual design"],
  cover: image("HPJ_1.png", "HyperJar Kids Card physical design exploration", 692, 672),
  headline: { value: "Clarity before commitment.", label: "Connect the card, app, and registration journey into an understandable offer." },
  tldr: {
    problem: "Parents needed to understand how a new Kids Card fit alongside the adult HyperJar product, what it offered, and what would happen when they registered their interest.",
    did: "I designed the physical card and digital launch experience with product, marketing, and engineering partners, including the waitlist and email-verification interactions.",
    result: "The work established a shared visual language for the card and launch experience. Historical waitlist figures need event and denominator clarification before being presented as conversion results.",
  },
  context: ["HyperJar was preparing to launch a free Kids Card alongside its adult product. The launch needed to communicate a financial proposition in language and visuals approachable to families.", "This case study covers the Kids Card launch. Broader budgeting, transaction categorization, and savings workflows are separate workstreams."],
  research: { methods: ["Existing analytics", "Questionnaire input", "Community feedback", "Design exploration"], findings: [
    { title: "Parents needed a clear account of the offer.", body: "The launch page had to connect the physical card to the app and explain the proposition before asking for personal information." },
    { title: "Registration depended on real service behavior.", body: "Waitlist and verification interactions were designed around the supporting email and authentication services, including confirmation and status messaging." },
  ] },
  insight: "A family money product\nstarts with <em>understanding</em>\nand confidence in the next step.",
  design: { intro: "The launch experience connects the physical product, approachable visual language, and a clear registration path.", decisions: [
    { title: "Make the card and digital experience feel connected.", context: "The physical card and launch website were different parts of the same proposition.", choice: "Use the card's visual direction to shape the launch design and app presentation.", why: "The product people see when registering should feel connected to the card they expect to receive.", media: image("HPJ_2.png", "HyperJar Kids Card final visual design", 692, 672) },
    { title: "Explain what happens after registering.", context: "A waitlist asks parents to share information before receiving the product.", choice: "Design explicit email-verification and status messages around the supporting services.", why: "Clear feedback helps people understand whether their registration worked and what to do next." },
  ] },
  engineering: { intro: "The interaction design accounted for email verification and authentication behavior. This recovered launch story does not establish ownership of the underlying banking or payment infrastructure.", nodes: [], edges: [], problems: [] },
  outcome: { intro: "The launch brought the physical card and digital proposition into a consistent experience. The historical page reported waitlist growth, but its click-through and registration definitions need clarification before those numbers return.", metrics: [] },
  reflection: ["For a financial product, friendly visuals need to support a clear explanation of the offer and the registration process. The launch story should stay focused on that contribution."],
};
