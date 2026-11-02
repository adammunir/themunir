import type { Metadata } from "next";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { quality, type Vitals } from "@/content/quality";

export const metadata: Metadata = { title: "Colophon" };

const rows = [
  ["Framework", "Next.js 16 App Router, React 19 Server Components, fully static"],
  ["Motion", "Motion for scroll and springs, Lenis for smoothing, React <ViewTransition> for route morphs"],
  ["3D", "three.js with a hand-written point shader, lazy-loaded and paused off-screen"],
  ["Type", "Instrument Serif, Geist, Geist Mono"],
  ["Content", "Typed TypeScript. Every metric carries a source, and the build fails without one"],
  ["Media", "Cut, encoded, and redacted by one script (scripts/assets.sh), so provenance stays reviewable"],
  ["Accessibility", "Keyboard-first, ⌘K palette, skip link, and reduced motion respected everywhere"],
  ["Budget", "Lighthouse 100 target, LCP under 1.2 s, CLS 0, and three.js only on the hero"],
];

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const measured = dateFormat.format(new Date(`${quality.measuredOn}T00:00:00Z`));

const size = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);

/** Lighthouse's own banding: below 90 needs work. */
const score = (n: number) => <span className={n < 90 ? "text-signal" : undefined}>{n}</span>;

function ScoreTable({ preset }: { preset: "mobile" | "desktop" }) {
  const title = preset === "mobile" ? "Mobile" : "Desktop";
  const head = ["Perf", "A11y", "BP", "SEO", "LCP", "CLS", "TBT", "Transfer"];
  return (
    <div className="mt-16">
      <h3 className="label mb-6">{title}</h3>
      <div role="region" aria-label={`${title} scores`} tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left text-[15px]">
          <thead>
            <tr>
              <th scope="col" className="label pb-4 font-normal">Page</th>
              {head.map((h) => (
                <th key={h} scope="col" className="label pb-4 text-right font-normal">
                  {h === "BP" ? <abbr title="Best practices" className="no-underline">BP</abbr> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quality.pages.map((pg) => {
              const v: Vitals = pg[preset];
              return (
                <tr key={pg.path} className="border-t border-line">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    {pg.name} <span className="label ml-1 normal-case tracking-normal">{pg.path}</span>
                  </th>
                  <td className="tabular py-4 text-right">{score(v.performance)}</td>
                  <td className="tabular py-4 text-right">{score(v.accessibility)}</td>
                  <td className="tabular py-4 text-right">{score(v.bestPractices)}</td>
                  <td className="tabular py-4 text-right text-paper-dim">{v.seo}</td>
                  <td className="tabular py-4 text-right">{v.lcp.toFixed(2)} s</td>
                  <td className="tabular py-4 text-right">{v.cls}</td>
                  <td className="tabular py-4 text-right">{v.tbt} ms</td>
                  <td className="tabular py-4 pl-2 text-right">{size(v.transferKb)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Colophon() {
  return (
    <div className="shell pt-40 pb-32">
      <p className="label mb-8">Colophon</p>
      <Lines as="h1" immediate text={"How this site\nis <em>built</em>."} className="font-display text-title [&_em]:text-signal" />
      <dl className="mt-20 max-w-4xl">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[12rem_1fr]">
            <dt className="label pt-1">{k}</dt>
            <dd className="text-paper/85">{v}</dd>
          </div>
        ))}
      </dl>

      <Reveal>
        <section className="mt-40 border-t border-line pt-16" aria-labelledby="quality-title">
          <p className="label mb-8">Quality report</p>
          <h2 id="quality-title" className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none [&_em]:text-signal">
            Measured on <em className="tabular">{measured}</em>.
          </h2>
          <dl className="mt-16 max-w-4xl">
            {quality.conditions.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="label pt-1">{k}</dt>
                <dd className="text-paper/85">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-6xl">
            <ScoreTable preset="mobile" />
            <ScoreTable preset="desktop" />
          </div>

          <div className="mt-16 max-w-4xl">
            <h3 className="label mb-6">First-load JavaScript</h3>
            <dl>
              {quality.firstLoadJs.map((r) => (
                <div key={r.route} className="grid gap-2 border-t border-line py-4 sm:grid-cols-[1fr_auto]">
                  <dt>{r.route}</dt>
                  <dd className="tabular text-paper/85">
                    {r.gzipKb} KB gzipped <span className="text-paper-dim">· {r.rawKb} KB raw</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[15px] text-paper-dim">{quality.firstLoadJsNote}</p>
          </div>

          <div className="mt-16 max-w-4xl space-y-4 border-t border-line pt-6 text-paper/85">
            <p>{quality.seoNote}</p>
            {quality.notes.map((n) => (
              <p key={n} className="text-[15px] text-paper-dim">{n}</p>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
