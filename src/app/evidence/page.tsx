import type { Metadata } from "next";
import Link from "next/link";
import { Lines } from "@/components/motion/Reveal";
import { projects, proof } from "@/content";
import type { Metric } from "@/content/types";

export const metadata: Metadata = { title: "Evidence" };

const trust = {
  documented: { label: "Documented", note: "An internal record, report, or the repository." },
  public: { label: "Public record", note: "Anyone can check it." },
  "self-reported": { label: "Self-reported", note: "My own figure, with no record behind it." },
} as const;

const format = (m: Metric) =>
  `${m.prefix ?? ""}${m.value.toLocaleString("en-US", { minimumFractionDigits: m.decimals ?? 0, maximumFractionDigits: m.decimals ?? 0 })}${m.suffix ?? ""}`;

/** Every number on the site, grouped by where it appears, with its source. */
export default function Evidence() {
  const groups = [
    { title: "Across the work", href: "/", metrics: proof },
    ...projects.map((p) => ({
      title: p.title,
      href: `/work/${p.slug}`,
      // A case study may repeat a number in two chapters; list it once.
      metrics: [...(p.engineering.numbers ?? []), ...p.outcome.metrics].filter(
        (m, i, all) => all.findIndex((o) => o.label === m.label) === i,
      ),
    })),
  ].filter((g) => g.metrics.length > 0);

  const all = groups.flatMap((g) => g.metrics);
  const count = (c: keyof typeof trust) => all.filter((m) => (m.confidence ?? "documented") === c).length;
  const sources = new Set(all.map((m) => m.source)).size;

  return (
    <div className="shell pt-40 pb-32">
      <p className="label mb-8">Evidence</p>
      <Lines as="h1" text={"Every number,\nand where it <em>came from.</em>"} className="font-display text-title [&_em]:text-signal" immediate />
      <p className="mt-8 max-w-2xl text-lede text-paper/70">
        A portfolio is a set of claims. Here are all of mine that carry a number, each with its source and how far to trust it. Numbers I couldn&apos;t source didn&apos;t make it onto the site.
      </p>

      <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line lg:grid-cols-5">
        <Stat value={all.length} label="Numbers on the site" />
        <Stat value={sources} label="Distinct sources" />
        {(Object.keys(trust) as (keyof typeof trust)[]).map((c) => (
          <Stat key={c} value={count(c)} label={trust[c].label} note={trust[c].note} />
        ))}
      </dl>

      <div className="mt-24 space-y-20">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`ev-${g.href}`}>
            <div className="mb-6 flex items-baseline justify-between gap-6">
              <h2 id={`ev-${g.href}`} className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none">
                {g.title}
              </h2>
              <Link href={g.href} className="label hover:!text-paper">
                {g.href === "/" ? "Home" : "Case study"} →
              </Link>
            </div>
            <table className="w-full table-fixed border-t border-line text-left">
              <colgroup>
                <col className="w-[8.5rem]" />
                <col />
                <col className="w-0 md:w-[30%]" />
                <col className="w-[9.5rem]" />
              </colgroup>
              <thead className="sr-only">
                <tr>
                  <th>Number</th>
                  <th>Claim</th>
                  <th>Source</th>
                  <th>Trust</th>
                </tr>
              </thead>
              <tbody>
                {g.metrics.map((m) => {
                  const c = m.confidence ?? "documented";
                  return (
                    <tr key={m.label} className="border-b border-line align-baseline">
                      <td className="tabular py-5 pr-6 font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-none whitespace-nowrap">{format(m)}</td>
                      <td className="py-5 pr-6 text-[16px] text-paper/85">{m.label}</td>
                      <td className="hidden py-5 pr-6 text-[14px] text-paper-dim md:table-cell">{m.source}</td>
                      <td className="py-5 text-right whitespace-nowrap">
                        <span
                          className="label rounded-full px-2.5 py-1"
                          style={
                            c === "documented"
                              ? { border: "1px solid var(--color-line-strong)" }
                              : c === "public"
                                ? { backgroundColor: "var(--color-signal)", color: "var(--color-ink)" }
                                : { border: "1px dashed var(--color-line-strong)" }
                          }
                        >
                          {trust[c].label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      <p className="label mt-20 max-w-2xl normal-case tracking-normal leading-relaxed">
        The resume carries outcome figures from earlier roles that I report myself. They aren&apos;t listed here because there&apos;s no record on this site to back them.
      </p>
    </div>
  );
}

function Stat({ value, label, note }: { value: number; label: string; note?: string }) {
  return (
    <div className="bg-ink p-7" title={note}>
      <dd className="tabular font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none">{value}</dd>
      <dt className="mt-3 text-[14px] text-paper/65">{label}</dt>
    </div>
  );
}
