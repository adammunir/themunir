import { helix } from "./projects/helix";
import { icentral } from "./projects/icentral";
import { lynxDrive } from "./projects/lynx-drive";
import { oasisMobile } from "./projects/oasis-mobile";
import { oasis } from "./projects/oasis";
import { spatialAdjust } from "./projects/spatial-adjust";
import { toroPipeline } from "./projects/toro-pipeline";
import type { IndexEntry, Metric, Project } from "./types";

export { profile } from "./profile";

/** Stations, in the order the reader meets them. */
export const projects: Project[] = [oasisMobile, lynxDrive, icentral, spatialAdjust, helix, toroPipeline, oasis];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Numbers that span the whole body of work. Each must carry a source. */
export const proof: Metric[] = [
  { value: 9, suffix: "+", label: "Years designing products across irrigation, IoT, fintech, streaming, and logistics", source: "Resume", confidence: "self-reported" },
  { value: 2, label: "Patent filings in smart irrigation, one granted", source: "US 12,543,671 B2 (granted 2026); US 2026/0137039 A1 (pending)", href: "/inventions", confidence: "public" },
  { value: 5, label: "Toro product lines shipped into: golf, home, commercial, delivery, and AI tooling", source: "The case studies on this site: Lynx, Oasis, iCentral, Toro Pipeline, Helix" },
  { value: 11, label: "Languages shipped in a single guide system", source: "Guide release bundle" },
];

export const index: IndexEntry[] = [
  {
    title: "iCentral + Oasis feedback",
    kind: "Full-stack feature",
    year: "2026",
    line: "One in-app feedback panel across two products. It shows exactly what gets sent, keeps drafts through failures, and feeds a single triage tab in Toro Pipeline.",
    stack: ["UX", "Web front-end", "APIs", "Workflow automation"],
  },
  {
    title: "Precision ET",
    kind: "Product design",
    year: "2026",
    line: "Translates FAO-56 evapotranspiration science into a seven-step setup wizard for residential irrigation.",
    stack: ["UX", "Native iOS & Android", "APIs"],
  },
  {
    title: "Drone Pipeline Wizard",
    kind: "Geospatial tooling",
    year: "2026",
    line: "Turns drone imagery into map layers crews can use, through a guided wizard with a zero-cost processing backend and a provider cost model.",
    stack: ["UX", "Desktop app", "Maps", "Geospatial processing"],
  },
  {
    title: "Toro Factory",
    kind: "AI engineering",
    year: "2026",
    line: "A software-factory experiment: shared reasoning, Swift code metrics, and an iOS verification harness that scores itself against a real codebase.",
    stack: ["AI agents", "Code metrics", "Verification"],
  },
  {
    title: "Toro Design Ops",
    kind: "Design systems & motion",
    year: "2026",
    line: "A design-engineering workspace for the Lynx open design bundle, Android design-system modules, Figma plugins, and 3D and motion pipelines.",
    stack: ["Figma", "Tokens", "Blender", "Spline", "After Effects"],
  },
  {
    title: "Intelligence augmentation",
    kind: "AI UX concept · Stanford",
    year: "2026",
    line: "A concept arguing for AI that shows its reasoning and trade-offs instead of acting on your behalf. It's the thread that runs through all my AI work.",
    stack: ["Concept", "Interaction design"],
  },
  {
    title: "OneHubTV",
    kind: "Streaming · Vision247",
    year: "2021",
    line: "Led UX for a streaming service across web, mobile, and TV: checkout, trial conversion, sign-in, and a reusable design system.",
    stack: ["Web", "iOS", "Android", "TV"],
  },
  {
    title: "HyperJar Kids Card",
    kind: "Fintech · HyperJar",
    year: "2020",
    line: "Designed the launch of a free kids' card alongside the adult card for a 150,000+ customer fintech: card, app, and waitlist.",
    stack: ["iOS", "Android", "Card design"],
  },
  {
    title: "IFSC Freight Calculator",
    kind: "Logistics · FSCOCEANS",
    year: "2019",
    line: "Put shipment quoting in the field, replacing trips back to the office and handoffs between teams, with a quoting engine integrated with Salesforce.",
    stack: ["Salesforce", "Python", "Dashboards"],
  },
  {
    title: "Geoff Banks",
    kind: "Racing · Web",
    year: "2017",
    line: "Redesigned a racecourse website and mobile experience to improve ticket conversion, and automated odds ingestion.",
    stack: ["Web", "Mobile"],
  },
];
