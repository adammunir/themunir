import { Lines, Reveal } from "@/components/motion/Reveal";
import type { IndexEntry } from "@/content/types";

export function IndexTable({ entries }: { entries: IndexEntry[] }) {
  return (
    <section className="pb-40" aria-labelledby="index-title">
      <div className="shell">
        <div className="mb-16 grid gap-8 sm:grid-cols-12">
          <p className="label sm:col-span-3">04 — Index</p>
          <Lines
            text={"Everything else\non the <em>line</em>."}
            className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] [&_em]:text-signal sm:col-span-9"
          />
        </div>

        <div role="table" aria-label="Other work" className="text-[15px]">
          <div role="row" className="label hidden grid-cols-12 gap-4 border-b border-line pb-4 md:grid">
            <span role="columnheader" className="col-span-1">Year</span>
            <span role="columnheader" className="col-span-3">Project</span>
            <span role="columnheader" className="col-span-2">Kind</span>
            <span role="columnheader" className="col-span-6">What it is</span>
          </div>
          {entries.map((e, i) => (
            <Reveal key={e.title} delay={Math.min(i, 8) * 0.03} y={12}>
              <div
                role="row"
                className="group relative grid grid-cols-12 gap-x-4 gap-y-1 border-b border-line py-6 transition-colors hover:bg-ink-2"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100"
                />
                <span role="cell" className="label col-span-3 pt-1 tabular md:col-span-1">{e.year}</span>
                <span role="cell" className="col-span-9 font-medium transition-transform duration-500 group-hover:translate-x-2 md:col-span-3">
                  {e.title}
                </span>
                <span role="cell" className="col-span-12 text-paper-dim md:col-span-2">{e.kind}</span>
                <span role="cell" className="col-span-12 text-paper/70 md:col-span-6">
                  {e.line}
                  <span className="mt-2 block label">{e.stack.join(" · ")}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
