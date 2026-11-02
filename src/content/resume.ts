/**
 * The resume, from themunir.com/resume, with the patent line corrected to the
 * public record. Bullets lead with the result; `**…**` marks the figure so it
 * can be set in bold. Outcome figures are my own reporting from each role, and
 * are not part of the sourced evidence on this site.
 */
export type Role = {
  org: string;
  role: string;
  place: string;
  dates: string;
  /** One line on what the company or product is. */
  context: string;
  points: string[];
  /** Products I designed, linked to their case study where there is one. */
  products?: { name: string; slug?: string }[];
};

export const resume = {
  name: "Adam Munir",
  headline: "UX Designer & Design Engineer",
  subline: "Senior Product Designer · Native, web, and AI-enabled products",
  updated: "November 2026",
  contact: [
    { label: "adam@themunir.com", href: "mailto:adam@themunir.com" },
    { label: "562-665-2310", href: "tel:+15626652310" },
    { label: "Orange, CA" },
    { label: "linkedin.com/in/adammunirr", href: "https://www.linkedin.com/in/adammunirr" },
    { label: "themunir.com", href: "https://themunir.com" },
  ],
  email: "adam@themunir.com",
  pdf: "/Adam_Munir_Resume.pdf",
  preview: "/Adam_Munir_Resume.png",
  summary:
    "Product designer and design engineer with 9+ years shipping AI-enabled, hardware-connected, and enterprise SaaS products across irrigation, IoT, fintech, streaming, and logistics. I lead the research, design the system, and then build what I design, front end and back end. Co-inventor on a granted US patent.",
  highlights: [
    { value: "9+", label: "Years designing products" },
    { value: "64→87%", label: "Controller setup success after the onboarding redesign" },
    { value: "8", label: "Product teams on the design system" },
    { value: "1", label: "US patent granted, one more pending" },
  ],
  experience: [
    {
      org: "The Toro Company",
      role: "Senior Product Designer",
      place: "Riverside, CA",
      dates: "Apr 2022 – Present",
      context: "Irrigation software for golf, commercial, and residential customers",
      points: [
        "Lead UX research and design for Toro's irrigation platforms across web, native mobile, and connected hardware, used by **5,000+ daily professional users** and **~400k homeowners**.",
        "Raised controller setup success from **64% to 87%** and cut first-time setup time **41%** by redesigning onboarding.",
        "Cut design-to-dev cycles **32%** and engineering rework **27%** with a modular design system adopted by **8 product teams**.",
        "Designed human-in-the-loop UX for AI irrigation recommendations: reasoning and confidence up front, with clear overrides.",
        "Build what I design, front end and APIs, shipping at **under 1% pixel difference** from the design.",
        "Raised weekly validated concepts **2.5x** with AI-assisted research and prototyping workflows, keeping handoff precise.",
        "Co-invented in-field smart notes, shipped in Toro Lynx: **US Patent 12,543,671 B2** (granted 2026), with a continuation pending.",
      ],
      products: [
        { name: "Lynx", slug: "lynx" },
        { name: "Oasis", slug: "oasis-mobile" },
        { name: "iCentral", slug: "icentral" },
        { name: "Spatial Adjust", slug: "spatial-adjust" },
        { name: "Helix", slug: "helix" },
        { name: "Toro Pipeline", slug: "toro-pipeline" },
        { name: "Precision ET" },
      ],
    },
    {
      org: "Vision247",
      role: "Senior UI/UX Designer",
      place: "London, UK",
      dates: "Oct 2020 – Apr 2022",
      context: "OneHubTV, an OTT streaming service across web, mobile, and TV",
      points: [
        "Lifted trial-to-paid conversion **21%** and cut checkout drop-off **28%** by redesigning onboarding and subscription purchase.",
        "Cut account support tickets **24%** and raised self-serve task completion from **63% to 89%** by simplifying multi-device sign-in.",
        "Cut design and build time for new features **30%** across web and mobile teams with a reusable design system.",
      ],
    },
    {
      org: "HyperJar",
      role: "Lead Product Designer",
      place: "London, UK",
      dates: "Nov 2019 – Sep 2020",
      context: "Consumer fintech: budgeting, savings automation, cards, and spending controls",
      points: [
        "Led product design for **150,000+ active customers** across budgeting, savings, cards, and spending controls.",
        "Raised budgeting engagement **21%** and savings activation **17%** by redesigning transaction categorization.",
        "Raised verified account completion **19%** by simplifying setup and identity verification.",
      ],
    },
    {
      org: "FSCOCEANS",
      role: "Product Designer",
      place: "London, UK",
      dates: "Jan 2019 – Nov 2019",
      context: "Internal freight pricing and sales platform, integrated with Salesforce",
      points: [
        "Cut average quote turnaround **52%** with a unified quoting engine and pricing calculator for commercial teams.",
        "Raised sales task completion **34%** in testing and cut onboarding and training needs **28%** with task-focused dashboards.",
        "Led discovery, UX and UI, and front-end delivery support for the MVP, with engineering on the data model.",
      ],
    },
    {
      org: "Geoff Banks",
      role: "Product Designer",
      place: "Ascot, UK",
      dates: "Dec 2016 – Sep 2017",
      context: "Racecourse website and mobile experience",
      points: [
        "Lifted ticket conversion **~28%** and cut bounce rate **~22%** by rebuilding the site for **10k+ monthly visitors** at peak.",
        "Cut manual odds update time **~80%** by automating racing odds ingestion and content workflows.",
      ],
    },
  ] satisfies Role[],
  skills: [
    { title: "Design", body: "Product and interaction design, design systems, information architecture, data visualization, accessibility (WCAG)" },
    { title: "Research", body: "User research, usability testing, prototyping, discovery, product measurement and experimentation" },
    { title: "AI", body: "AI UX, agentic UI patterns, explainability, human-in-the-loop review, trust interfaces for machine learning" },
    { title: "Build", body: "TypeScript, JavaScript, HTML, CSS, Next.js, native iOS and Android UX, Git and GitHub" },
    { title: "Tools", body: "Figma, ProtoPie, Rive, Jitter, Spline, Adobe Creative Suite" },
  ],
  education: [
    { title: "Certificate, UI/UX Design for AI Products", org: "Stanford University", year: "2026" },
    { title: "MBA, Business Administration and IT", org: "Westcliff University", year: "2020" },
    { title: "BSc Economics", org: "University of Plymouth", year: "2016" },
  ],
  inventions: [
    { title: "US Patent 12,543,671 B2", detail: "Smart notes for an irrigation control system", status: "Granted 2026" },
    { title: "US 2026/0137039 A1", detail: "Continuation, same family", status: "Pending" },
  ],
};

/** Splits a bullet into plain and `**bold**` runs. */
export const runs = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((t, i) => ({ text: t, bold: i % 2 === 1 }));
