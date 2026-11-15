/**
 * The resume, from themunir.com/resume, with the patent line corrected to the
 * public record. Bullets lead with the result; `**…**` marks the figure so it
 * can be set in bold. Outcome figures are my own reporting from each role, and
 * are not part of the sourced evidence on this site.
 */
import { assetPath } from "@/lib/asset-path";

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
  headline: "Senior Product Designer | UX Engineering",
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
  pdf: assetPath("/Adam_Munir_Resume.pdf"),
  preview: assetPath("/Adam_Munir_Resume.png"),
  summary:
    "Senior Product Designer combining UX research, interaction design, and hands-on web development. I design enterprise and consumer experiences across connected products, fintech, and streaming, carrying user needs from discovery and prototypes into working interfaces.",
  highlights: [
    { value: "Research", label: "Field observation, interviews, and product analytics" },
    { value: "Interaction", label: "Clear workflows and understandable system behavior" },
    { value: "Build", label: "Web interfaces, APIs, and design systems" },
    { value: "Invention", label: "Co-inventor on a granted US patent" },
  ],
  experience: [
    {
      org: "The Toro Company",
      role: "Senior Product Designer",
      place: "Riverside, CA",
      dates: "Apr 2022 – Present",
      context: "Irrigation software for golf, commercial, and residential customers",
      points: [
        "Lead UX research and interaction design for connected irrigation products with product and engineering teams.",
        "Designed and helped implement iCentral access controls across the web app and API, making permission choices clearer while preserving the legacy model.",
        "Redesigned controller onboarding; setup success increased from **64% to 87%**, tracked in Mixpanel.",
        "Used field research to shape Lynx workflows; contributed to map-selection performance and analytics for investigating field failures.",
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
        "Designed OneHubTV web and mobile experiences with creative, engineering, and QA partners, connecting content discovery, package presentation, and subscription journeys.",
        "Used participant feedback and analytics to iterate global navigation and help viewers explore content before choosing a package.",
      ],
    },
    {
      org: "HyperJar",
      role: "Lead Product Designer",
      place: "London, UK",
      dates: "Nov 2019 – Sep 2020",
      context: "Consumer fintech: budgeting, savings automation, cards, and spending controls",
      points: [
        "Designed the Kids Card launch across the physical card, website, and app presentation with product, marketing, and engineering partners.",
        "Designed waitlist and email-verification interactions with clear confirmation and status messaging for parents.",
      ],
    },
    {
      org: "FSCOCEANS",
      role: "Product Designer",
      place: "London, UK",
      dates: "Jan 2019 – Nov 2019",
      context: "Internal freight pricing and sales platform, integrated with Salesforce",
      points: [
        "Designed a freight-pricing and sales platform integrated with Salesforce, connecting shipment quoting, pricing calculations, and operational dashboards.",
        "Led discovery and UX/UI design for the MVP, collaborating on the data model and supporting frontend delivery.",
      ],
    },
    {
      org: "Geoff Banks",
      role: "Product Designer",
      place: "Ascot, UK",
      dates: "Dec 2016 – Sep 2017",
      context: "Racecourse website and mobile experience",
      points: [
        "Designed responsive web and mobile experiences and automated racing-odds content updates.",
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
