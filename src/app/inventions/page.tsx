import type { Metadata } from "next";
import { NotesFlow } from "@/components/inventions/NotesFlow";
import { Timeline } from "@/components/inventions/Timeline";
import { Counter } from "@/components/motion/Counter";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Display, Phone } from "@/components/showcase/Devices";
import { filed, inventions, upcoming } from "@/content/inventions";

export const metadata: Metadata = { title: "Inventions" };

export default function Inventions() {
  const slots = inventions.flatMap((inv) => inv.filings.map((f) => ({ ...f, title: inv.title })));

  return (
    <div className="pt-40 pb-32">
      <header className="shell">
        <p className="label mb-8">Inventions</p>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <p className="font-display text-[clamp(9rem,26vw,22rem)] leading-[0.8] text-signal lg:col-span-5" aria-hidden>
            <Counter value={filed} />
          </p>
          <div className="lg:col-span-7">
            <Lines
              as="h1"
              text={`${filed} patent filings.\nAnd <em>counting.</em>`}
              className="font-display text-title [&_em]:text-signal"
              immediate
            />
            <p className="mt-8 max-w-xl text-lede text-paper/70">
              One granted, one pending, and {upcoming === 1 ? "one more" : upcoming} on the way. The first started as a problem crews had in the field, and it lives in a product I designed.
            </p>
          </div>
        </div>

        <ol className="mt-24 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-3">
          {slots.map((s, i) => (
            <li key={s.id} className="bg-ink">
              <a href={`#${s.id}`} className="group flex h-full flex-col justify-between gap-12 p-8 transition-colors hover:bg-ink-2" data-cursor="Snapshot" data-cursor-icon="document">
                <div className="flex items-center justify-between">
                  <span className="label tabular">No. {String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="label rounded-full px-3 py-1.5"
                    style={s.status === "Granted" ? { backgroundColor: "var(--color-signal)", color: "var(--color-ink)" } : { border: "1px solid var(--color-line-strong)" }}
                  >
                    {s.status}
                  </span>
                </div>
                <div>
                  <p className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">{s.number}</p>
                  <p className="mt-3 text-[15px] text-paper/65">{s.title}</p>
                  <p className="label mt-6 transition-colors group-hover:!text-paper">Snapshot ↓</p>
                </div>
              </a>
            </li>
          ))}
          {Array.from({ length: upcoming }, (_, i) => (
            <li key={`soon-${i}`} className="relative bg-ink">
              <div className="flex h-full flex-col justify-between gap-12 p-8">
                <div className="flex items-center justify-between">
                  <span className="label tabular">No. {String(slots.length + i + 1).padStart(2, "0")}</span>
                  <span className="label flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1.5">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                    </span>
                    Coming soon
                  </span>
                </div>
                <div>
                  {/* Decoration, so it's generated content rather than text. */}
                  <p
                    aria-hidden
                    data-mask="US ##,###,###"
                    className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] text-paper/30 blur-[3px] select-none before:content-[attr(data-mask)]"
                  />
                  <p className="mt-3 text-[15px] text-paper/50">In the works. Details once it&apos;s public.</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </header>

      {inventions.map((inv) => (
        <section key={inv.slug} id={inv.slug} className="mt-40 border-t border-line pt-28" aria-labelledby={`${inv.slug}-title`}>
          <div className="shell">
            <p className="label mb-6 text-signal">Snapshot</p>
            <h2 id={`${inv.slug}-title`} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1]">
              {inv.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lede text-paper/75">{inv.line}</p>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-3">
              {inv.snapshot.map((s) => (
                <li key={s.label} className="bg-ink p-8">
                  <p className="label mb-4 text-signal">{s.label}</p>
                  <p className="text-[17px] leading-relaxed text-paper/80">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-28">
              <p className="label mb-8">How it works</p>
              <NotesFlow />
            </div>

            <Reveal className="mt-28">
              <p className="label mb-4">Where it lives · {inv.shipped.product}</p>
              <p className="max-w-2xl text-[19px] leading-[1.7] text-paper/80">{inv.shipped.body}</p>
              <div className="relative mt-14 pb-[6%]">
                <Display shot={inv.shipped.shots[0]} stand={false} className="w-[86%]" sizes="(min-width: 1280px) 1100px, 86vw" />
                <div className="absolute right-0 bottom-0 w-[22%]">
                  <Phone shot={inv.shipped.shots[1]} sizes="300px" lock ratio="1170/2532" />
                </div>
              </div>
            </Reveal>

            <div className="mt-28 grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="label mb-8">The record</p>
                <Timeline steps={inv.timeline} />
              </div>
              <div className="space-y-4 lg:col-span-6 lg:col-start-7">
                {inv.filings.map((f) => (
                  <article key={f.id} id={f.id} className="scroll-mt-28 rounded-[20px] border border-line p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="label">{f.kind}</p>
                      <p className="label">{f.status} · {f.date}</p>
                    </div>
                    <p className="mt-6 font-display text-[clamp(2rem,3vw,2.75rem)] leading-none">{f.number}</p>
                    <p className="mt-4 text-[16px] text-paper/65">{f.note}</p>
                    <a href={f.href} target="_blank" rel="noopener noreferrer" data-cursor="Record" data-cursor-icon="document" className="label mt-6 inline-flex items-center gap-2 !text-paper hover:!text-signal">
                      Read the public record ↗
                    </a>
                  </article>
                ))}
                <p className="label pt-4 normal-case tracking-normal">{inv.credit}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="shell mt-40 border-t border-line pt-28 text-center">
        <p className="label mb-6">No. {String(filed + 1).padStart(2, "0")}</p>
        <p className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02]">
          The next one is <em className="text-signal">already in the works.</em> You&apos;ll see it here when it&apos;s public.
        </p>
      </section>
    </div>
  );
}
