export type Metric = {
  value: number;
  /** Rendered before the counted number, e.g. "<" or "$". */
  prefix?: string;
  /** Rendered after the counted number, e.g. "%", "×", "k". */
  suffix?: string;
  decimals?: number;
  label: string;
  /** Where the number comes from. Unsourced numbers are not allowed. */
  source: string;
  /** Somewhere on the site that tells the full story behind the number. */
  href?: string;
  /**
   * How far to trust it. "documented": an internal record, report, or the
   * repository (the default). "public": a public record anyone can check.
   * "self-reported": my own figure with no record behind it.
   */
  confidence?: "documented" | "public" | "self-reported";
};

export type Media =
  | { kind: "image"; src: string; alt: string; width: number; height: number; caption?: string }
  | { kind: "video"; src: string; poster?: string; alt: string; width: number; height: number; caption?: string }
  /** A coded, data-driven illustration — used where real screens can't be shown. */
  | { kind: "art"; id: "rebaseline"; src: string; alt: string; caption?: string }
  /**
   * A short, silent, coded loop built from real screens: a tilted wall of
   * phones, a desktop and phone pair, or a slow cinematic crossfade.
   */
  | {
      kind: "reel";
      variant: "wall" | "stage" | "cinema";
      src: string;
      alt: string;
      shots: Shot[];
      phones?: Shot[];
      caption?: string;
    };

/** One exported design frame or screenshot. */
export type Shot = { src: string; width: number; height: number; alt: string; title?: string; caption?: string };

/** Apple-style scroll scenes that present the product itself. */
export type ShowcaseBlock =
  | {
      kind: "phone-walk";
      eyebrow: string;
      title: string;
      steps: { shot: Shot; heading: string; body: string }[];
    }
  | {
      kind: "desktop-walk";
      eyebrow: string;
      title: string;
      steps: { shot: Shot; heading: string; body: string }[];
    }
  | {
      kind: "zoom";
      eyebrow: string;
      title: string;
      body: string;
      shot: Shot;
      /** Where the camera starts, in percent of the screen, and how close. */
      focus: { x: number; y: number; scale: number };
    }
  | { kind: "exploded"; eyebrow: string; title: string; body: string; shots: Shot[]; device: "phone" | "desktop" }
  | { kind: "wall"; eyebrow: string; title: string; body: string; count?: string; shots: Shot[]; device: "phone" | "desktop" }
  | { kind: "scrub"; eyebrow: string; title: string; body: string; src: string; poster: string; width: number; height: number }
  | { kind: "compare"; eyebrow: string; title: string; body: string; before: Shot; after: Shot; labels: [string, string] }
  | { kind: "breakpoints"; eyebrow: string; title: string; body: string; shots: (Shot & { viewport: number })[] }
  | { kind: "film"; src: string; poster: string; title: string }
  /**
   * A design-to-code loop replayed on one screen: the build is laid over the
   * design in difference mode and converges as the reader scrolls. Stages
   * marked `loop` repeat once per reading in `diffs`.
   */
  | {
      kind: "fixloop";
      eyebrow: string;
      title: string;
      body: string;
      shot: Shot;
      stages: { name: string; detail: string; loop?: boolean }[];
      /** Visual-diff readings, in percent, one per pass. The last one passes. */
      diffs: number[];
      threshold: number;
      note: string;
    }
  /** Wrap a word in *asterisks* to light it in the accent colour. */
  | { kind: "statement"; text: string }
  | { kind: "duo"; eyebrow: string; title: string; body: string; desktop: Shot; phone: Shot };

export type Decision = {
  title: string;
  context: string;
  choice: string;
  rejected?: string;
  why: string;
  media?: Media;
};

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  /** Grid position in the diagram, column then row (0-based). */
  col: number;
  row: number;
  tone?: "client" | "service" | "data" | "external" | "ai";
};

export type ArchEdge = { from: string; to: string; label?: string };

export type HardProblem = { title: string; problem: string; solution: string };

/** The parts of a project I did myself, research through code. */
export type Craft =
  | "Research"
  | "UX"
  | "UI"
  | "Prototyping"
  | "Design system"
  | "Content"
  | "Motion"
  | "Front-end"
  | "Back-end"
  | "AI"
  | "Testing";

export type Project = {
  slug: string;
  title: string;
  /** One line, the hook. */
  tagline: string;
  /** Per-project accent, used to tint the station and case study. */
  accent: string;
  year: string;
  role: string;
  /** Design crafts first, engineering after. */
  owned: Craft[];
  team: string;
  duration: string;
  platforms: string[];
  stack: string[];
  cover: Media;
  /** The product, presented: scroll scenes shown before the written case study. */
  showcase?: ShowcaseBlock[];
  /** The single outcome that opens the case study. */
  headline: { value: string; label: string };
  tldr: { problem: string; did: string; result: string };
  context: string[];
  /**
   * How the work actually ran, phase by phase, research through ship. Each
   * phase names what I did, what came out of it, and what it changed.
   */
  process?: { phase: string; when?: string; did: string; artifacts: string[]; changed: string }[];
  research: {
    methods: string[];
    findings: { title: string; body: string }[];
    quote?: { text: string; who: string };
    media?: Media[];
  };
  insight: string;
  design: { intro: string; decisions: Decision[]; gallery?: Media[] };
  engineering: {
    intro: string;
    nodes: ArchNode[];
    edges: ArchEdge[];
    problems: HardProblem[];
    numbers?: Metric[];
  };
  outcome: { intro: string; metrics: Metric[] };
  reflection: string[];
  nda?: string;
};

export type IndexEntry = {
  title: string;
  kind: string;
  year: string;
  line: string;
  stack: string[];
};
