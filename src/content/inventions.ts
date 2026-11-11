import type { Shot } from "./types";

/** One public patent record. Everything here is on the public record. */
export type Filing = {
  id: string;
  number: string;
  kind: string;
  status: "Granted" | "Pending";
  date: string;
  note: string;
  href: string;
};

export type Invention = {
  slug: string;
  title: string;
  /** The idea in one line, for people who don't read claims. */
  line: string;
  snapshot: { label: string; body: string }[];
  /** Where the idea lives in a product, shown with real UI. */
  shipped: { product: string; body: string; shots: Shot[] };
  credit: string;
  filings: Filing[];
  timeline: { date: string; event: string }[];
};

const lynx = (name: string, width: number, height: number, alt: string): Shot => ({ src: `/work/lynx/figma/${name}.webp`, width, height, alt });

export const inventions: Invention[] = [
  {
    slug: "smart-notes",
    title: "Smart notes for an irrigation control system",
    line: "Notes that live on the sprinkler, not in someone's head.",
    snapshot: [
      {
        label: "The problem",
        body: "On a golf course, what a crew learns about a sprinkler, a leak, a broken head, a dry patch, rarely leaves the person who saw it. The next shift starts from zero.",
      },
      {
        label: "The idea",
        body: "Irrigation software lets people create notes, pin them to a sprinkler or an area of the map, assign them to someone, and add text or photos. Notes sync to a central server that authorized phones can reach.",
      },
      {
        label: "Why it matters",
        body: "Closed notes are archived, so every sprinkler and area builds its own maintenance history. You can see what keeps failing, where, and what was done about it.",
      },
    ],
    shipped: {
      product: "Toro Lynx",
      body: "In Lynx, a crew member flags a station from the map or the diagnostics view, writes what they found, and the note joins the station's activity for whoever comes next.",
      shots: [
        lynx("desktop-morning-05-note-logged", 2880, 1620, "Lynx desktop: a note logged against a station, shown in its activity history next to the course map."),
        lynx("mobile-note-02-add-note", 1170, 2685, "Lynx mobile: adding a note to a flagged station in the field."),
      ],
    },
    credit: "One of five named inventors · Assigned to The Toro Company",
    filings: [
      {
        id: "us-12543671",
        number: "US 12,543,671 B2",
        kind: "Patent",
        status: "Granted",
        date: "Feb 10, 2026",
        note: "The original application, published in 2024 as US 2024/0260521 A1.",
        href: "https://patents.google.com/patent/US12543671B2/en",
      },
      {
        id: "us-20260137039",
        number: "US 2026/0137039 A1",
        kind: "Continuation application",
        status: "Pending",
        date: "Published May 21, 2026",
        note: "A continuation in the same family, filed January 2026 and in examination.",
        href: "https://patents.google.com/patent/US20260137039A1/en",
      },
    ],
    timeline: [
      { date: "Feb 2023", event: "Provisional application filed" },
      { date: "Feb 2024", event: "Full application filed" },
      { date: "Aug 2024", event: "Published as US 2024/0260521 A1" },
      { date: "Jan 2026", event: "Continuation filed" },
      { date: "Feb 2026", event: "Granted as US 12,543,671 B2" },
      { date: "May 2026", event: "Continuation published" },
    ],
  },
];

/** Filings on the public record, plus what's on the way. */
export const filed = inventions.flatMap((i) => i.filings).length;
export const upcoming = 1;
