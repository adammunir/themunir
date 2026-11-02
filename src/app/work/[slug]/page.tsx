import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArchDiagram } from "@/components/case/ArchDiagram";
import { ChapterRail, type Chapter } from "@/components/case/ChapterRail";
import { Media } from "@/components/case/Media";
import { ProcessTrack } from "@/components/case/ProcessTrack";
import { Counter } from "@/components/motion/Counter";
import { Showcase } from "@/components/showcase/Showcase";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { getProject, projects } from "@/content";
import type { Metric, Project } from "@/content/types";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: `${p.tagline} ${p.tldr.result}` };
}

const allChapters: Chapter[] = [
  { id: "context", label: "Context" },
  { id: "process", label: "Process" },
  { id: "research", label: "Research" },
  { id: "insight", label: "Insight" },
  { id: "design", label: "Design" },
  { id: "engineering", label: "Build" },
  { id: "outcome", label: "Outcome" },
  { id: "reflection", label: "Reflection" },
];

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const chapters = allChapters.filter((c) => c.id !== "process" || p.process);
  const n = (id: string) => String(chapters.findIndex((c) => c.id === id) + 1).padStart(2, "0");

  return (
    <article style={{ ["--accent" as string]: p.accent }}>
      <Hero p={p} />
      <Tldr p={p} />
      {p.showcase && <Showcase blocks={p.showcase} accent={p.accent} />}

      <div className="shell grid gap-12 xl:grid-cols-12">
        <aside className="xl:col-span-2">
          <ChapterRail chapters={chapters} accent={p.accent} />
        </aside>

        <div className="min-w-0 xl:col-span-9 xl:col-start-4">
          <Chapter id="context" n={n("context")} title="Context">
            <Prose paragraphs={p.context} />
          </Chapter>

          {p.process && (
            <Chapter id="process" n={n("process")} title="How the work ran">
              <ProcessTrack phases={p.process} accent={p.accent} />
            </Chapter>
          )}

          <Chapter id="research" n={n("research")} title="Research">
            <ul className="mb-12 flex flex-wrap gap-2">
              {p.research.methods.map((m) => (
                <li key={m} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-paper/80">
                  {m}
                </li>
              ))}
            </ul>
            <ol className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-2">
              {p.research.findings.map((f, i) => (
                <li key={f.title} className="bg-ink p-8">
                  <span className="label tabular" style={{ color: p.accent }}>
                    Finding {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[20px] leading-snug font-medium">{f.title}</h3>
                  <p className="mt-3 text-[16px] text-paper/65">{f.body}</p>
                </li>
              ))}
            </ol>
            {p.research.quote && (
              <Reveal>
                <blockquote className="mt-16 border-l-2 pl-8" style={{ borderColor: p.accent }}>
                  <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight italic">“{p.research.quote.text}”</p>
                  <footer className="label mt-5">{p.research.quote.who}</footer>
                </blockquote>
              </Reveal>
            )}
            {p.research.media && <Gallery items={p.research.media} />}
          </Chapter>

          <section id="insight" className="scroll-mt-28 border-t border-line py-32" aria-label="Insight">
            <p className="label mb-10">
              <span className="tabular mr-3">{n("insight")}</span>The insight
            </p>
            <Lines
              text={p.insight}
              className="font-display text-[clamp(2.25rem,5vw,5rem)] leading-[1.02] [&_em]:text-[var(--accent)]"
            />
          </section>

          <Chapter id="design" n={n("design")} title="Design">
            <Prose paragraphs={[p.design.intro]} />
            <div className="mt-16 space-y-24">
              {p.design.decisions.map((d, i) => (
                <Reveal key={d.title}>
                  <div className="grid gap-10 lg:grid-cols-9">
                    <div className="lg:col-span-4">
                      <p className="label tabular mb-4" style={{ color: p.accent }}>
                        Decision {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">{d.title}</h3>
                      <p className="mt-4 text-[16px] text-paper/65">{d.context}</p>
                      <dl className="mt-8 space-y-5 text-[16px]">
                        <div className="border-t border-line pt-4">
                          <dt className="label mb-2">Chose</dt>
                          <dd>{d.choice}</dd>
                        </div>
                        {d.rejected && (
                          <div className="border-t border-line pt-4">
                            <dt className="label mb-2">Rejected</dt>
                            <dd className="text-paper-dim line-through decoration-paper-dim/50">{d.rejected}</dd>
                          </div>
                        )}
                        <div className="border-t border-line pt-4">
                          <dt className="label mb-2">Because</dt>
                          <dd className="text-paper/80">{d.why}</dd>
                        </div>
                      </dl>
                    </div>
                    {d.media && (
                      <figure className="lg:col-span-5">
                        <div className="overflow-hidden rounded-[16px] bg-ink-2 ring-1 ring-line">
                          <Media media={d.media} sizes="(min-width: 1024px) 40vw, 100vw" />
                        </div>
                        {d.media.caption && <figcaption className="label mt-3 normal-case tracking-normal">{d.media.caption}</figcaption>}
                      </figure>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            {p.design.gallery && <Gallery items={p.design.gallery} />}
          </Chapter>

          <Chapter id="engineering" n={n("engineering")} title="Building it">
            <Prose paragraphs={[p.engineering.intro]} />
            <div className="mt-12">
              <ArchDiagram nodes={p.engineering.nodes} edges={p.engineering.edges} accent={p.accent} />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {p.stack.map((s) => (
                <li key={s} className="label">{s}</li>
              ))}
            </ul>
            <ol className="mt-20">
              {p.engineering.problems.map((h, i) => (
                <Reveal as="li" key={h.title} className="grid gap-6 border-t border-line py-10 md:grid-cols-9">
                  <div className="md:col-span-3">
                    <p className="label tabular mb-3" style={{ color: p.accent }}>
                      Build challenge {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[22px] leading-snug font-medium">{h.title}</h3>
                  </div>
                  <div className="grid gap-6 text-[16px] md:col-span-6 md:grid-cols-2">
                    <div>
                      <p className="label mb-2">Problem</p>
                      <p className="text-paper/65">{h.problem}</p>
                    </div>
                    <div>
                      <p className="label mb-2">Solution</p>
                      <p className="text-paper/85">{h.solution}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            {p.engineering.numbers && <Metrics metrics={p.engineering.numbers} accent={p.accent} />}
          </Chapter>

          <Chapter id="outcome" n={n("outcome")} title="Outcome">
            <Prose paragraphs={[p.outcome.intro]} />
            <Metrics metrics={p.outcome.metrics} accent={p.accent} big />
          </Chapter>

          <Chapter id="reflection" n={n("reflection")} title="Reflection">
            <Prose paragraphs={p.reflection} />
            {p.nda && <p className="label mt-12 max-w-2xl normal-case tracking-normal leading-relaxed">{p.nda}</p>}
          </Chapter>
        </div>
      </div>

      <NextStation p={next} />
    </article>
  );
}

function Hero({ p }: { p: Project }) {
  return (
    <header className="pt-40 pb-16">
      <div className="shell">
        <p className="label mb-8 flex gap-4">
          <Link href="/#work" className="hover:!text-paper">← The pipeline</Link>
          <span style={{ color: p.accent }}>Case study</span>
          <span>{p.year}</span>
        </p>
        <h1 className="font-display text-display">
          <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
            <span className="inline-block">{p.title}</span>
          </ViewTransition>
        </h1>
        <p className="mt-8 max-w-3xl text-lede text-paper/75">{p.tagline}</p>
        <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-6 text-[15px] md:grid-cols-4">
          {[
            ["Role", p.role],
            ["Team", p.team],
            ["Timeline", p.duration],
            ["Platforms", p.platforms.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label mb-2">{k}</dt>
              <dd className="text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="label mr-3">What I owned</span>
          {p.owned.map((c) => (
            <span key={c} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-paper/85">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="shell mt-16">
        <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
          <div className="overflow-hidden rounded-[24px] bg-ink-2 ring-1 ring-line">
            <Media media={p.cover} priority sizes="(min-width: 1440px) 1344px, 100vw" />
          </div>
        </ViewTransition>
      </div>
    </header>
  );
}

function Tldr({ p }: { p: Project }) {
  return (
    <section aria-label="Summary" className="shell pb-32">
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line lg:grid-cols-12">
        <div className="flex flex-col justify-between bg-ink-2 p-8 lg:col-span-4 lg:p-10">
          <p className="label">The 60-second read</p>
          <div className="mt-16">
            <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none" style={{ color: p.accent }}>
              {p.headline.value}
            </p>
            <p className="mt-3 max-w-xs text-paper/70">{p.headline.label}</p>
          </div>
        </div>
        <dl className="grid gap-px bg-line lg:col-span-8">
          {[
            ["The problem", p.tldr.problem],
            ["What I did", p.tldr.did],
            ["The result", p.tldr.result],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-3 bg-ink p-8 sm:grid-cols-[9rem_1fr] lg:px-10">
              <dt className="label pt-1.5">{k}</dt>
              <dd className="text-[17px] leading-relaxed text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Chapter({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-28" aria-labelledby={`${id}-title`}>
      <div className="mb-14 flex items-baseline gap-6">
        <span className="label tabular">{n}</span>
        <h2 id={`${id}-title`} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-[44rem] space-y-6 text-[19px] leading-[1.7] text-paper/80 [&_strong]:font-medium [&_strong]:text-paper">
      {paragraphs.map((t, i) => (
        <Reveal key={i} delay={i * 0.05} y={14}>
          <p dangerouslySetInnerHTML={{ __html: t }} />
        </Reveal>
      ))}
    </div>
  );
}

function Metrics({ metrics, accent, big = false }: { metrics: Metric[]; accent: string; big?: boolean }) {
  return (
    <div className="mt-14">
      <dl className={`grid gap-px overflow-hidden rounded-[20px] border border-line bg-line ${metrics.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
        {metrics.map((m, i) => (
          <div key={m.label} className="bg-ink p-8">
            <dd
              className={`font-display leading-none tabular ${big ? "text-[clamp(3.5rem,6vw,5.5rem)]" : "text-[clamp(2.75rem,4vw,4rem)]"}`}
              style={{ color: i === 0 ? accent : undefined }}
            >
              <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
              <sup className="label ml-1 align-super !text-paper-dim">{i + 1}</sup>
            </dd>
            <dt className="mt-4 text-[15px] text-paper/70">{m.label}</dt>
          </div>
        ))}
      </dl>
      <ol className="mt-5 space-y-1 text-[12px] leading-relaxed text-paper-dim">
        {metrics.map((m, i) => (
          <li key={m.label}>
            <span className="tabular mr-2">{i + 1}.</span>
            {m.source}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Gallery({ items }: { items: import("@/content/types").Media[] }) {
  return (
    <div className={`mt-16 grid gap-4 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
      {items.map((m) => (
        <Reveal key={m.src}>
          <figure>
            <div className="overflow-hidden rounded-[16px] bg-ink-2 ring-1 ring-line">
              <Media media={m} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            {m.caption && <figcaption className="mt-3 text-[13px] text-paper-dim">{m.caption}</figcaption>}
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

function NextStation({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block border-t border-line" data-cursor="Next">
      <div className="shell grid items-center gap-10 py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label mb-6">Next station</p>
          <p className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] transition-colors group-hover:text-[var(--next)]" style={{ ["--next" as string]: p.accent }}>
            <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
              <span className="inline-block">{p.title}</span>
            </ViewTransition>
          </p>
          <p className="mt-5 max-w-sm text-paper/65">{p.tagline}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
            <div className="overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-line" style={{ ["--accent" as string]: p.accent }}>
              <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                <Media media={p.cover} sizes="50vw" />
              </div>
            </div>
          </ViewTransition>
        </div>
      </div>
    </Link>
  );
}
