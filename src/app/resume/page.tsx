import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { CopyEmail } from "@/components/resume/CopyEmail";
import { resume, runs } from "@/content/resume";

export const metadata: Metadata = { title: "Resume" };

/**
 * The resume, twice from the same content: an editorial page on screen, and a
 * one-page, single-column sheet on paper. The PDF is printed from this page
 * (scripts/resume-pdf.sh), so the download can never drift from the content.
 */
export default function Resume() {
  return (
    <>
      <Screen />
      <Paper />
    </>
  );
}

/* ── Screen ───────────────────────────────────────────────────────────────── */

function Screen() {
  return (
    <article className="shell pt-40 pb-32 print:hidden">
      <header className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label mb-8">Resume · Updated {resume.updated}</p>
          <Lines as="h1" text={resume.name} className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]" immediate />
          <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-signal">{resume.headline}</p>
          <p className="mt-8 max-w-2xl text-[19px] leading-[1.65] text-paper/80">{resume.summary}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={resume.pdf}
              download
              data-cursor="Download"
              data-cursor-icon="document"
              className="group inline-flex items-center gap-3 rounded-full bg-signal px-6 py-3.5 text-[15px] font-medium text-ink shadow-[0_0_40px_-8px_rgba(255,77,46,.6)] transition-transform hover:scale-[1.03]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download PDF
            </a>
            <a
              href={resume.pdf}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line-strong px-6 py-3.5 text-[15px] transition-colors hover:border-paper"
            >
              View PDF
            </a>
            <CopyEmail
              email={resume.email}
              className="min-w-[8.5rem] overflow-hidden rounded-full px-5 py-3.5 text-[15px] text-paper/70 transition-colors hover:text-paper"
            />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-paper/65">
            {resume.contact.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a href={c.href} className="transition-colors hover:text-signal">
                    {c.label}
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* The sheet itself, so you know what you're downloading */}
        <div className="lg:col-span-5">
          <a
            href={resume.pdf}
            target="_blank"
            rel="noopener"
            data-cursor="Open"
            data-cursor-icon="document"
            className="group relative mx-auto block max-w-[420px] [perspective:1600px]"
            aria-label="Open the resume PDF"
          >
            <span aria-hidden className="absolute inset-x-[12%] -bottom-6 h-16 rounded-full bg-signal/25 blur-3xl transition-opacity duration-700 group-hover:opacity-60" />
            <span className="relative block overflow-hidden rounded-[6px] bg-white shadow-[0_50px_120px_-30px_rgba(0,0,0,.85)] ring-1 ring-white/10 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(2deg)] group-hover:[transform:rotateY(0)_rotateX(0)_rotateZ(0)_translateY(-8px)]">
              {/* Unoptimized: the script rewrites this file, and an optimized copy would go stale. */}
              <Image src={resume.preview} alt="" width={850} height={1100} priority unoptimized className="block h-auto w-full" />
            </span>
          </a>
          <p className="label mt-8 text-center">1 page · US Letter · PDF</p>
        </div>
      </header>

      <section aria-label="Highlights" className="mt-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line lg:grid-cols-4">
          {resume.highlights.map((h) => (
            <div key={h.label} className="bg-ink p-7">
              <dd className="tabular font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none">{h.value}</dd>
              <dt className="mt-3 text-[14px] text-paper/65">{h.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <ScreenSection title="Experience">
        <ol>
          {resume.experience.map((r) => (
            <Reveal as="li" key={r.org} className="grid gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none">{r.org}</h3>
                  <p className="mt-3 text-[17px]">{r.role}</p>
                  <p className="label tabular mt-4">{r.dates}</p>
                  <p className="label mt-1.5">{r.place}</p>
                  {r.products && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {r.products.map((p) => (
                        <li key={p.name}>
                          {p.slug ? (
                            <Link
                              href={`/work/${p.slug}`}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[13px] transition-colors hover:border-signal hover:text-signal"
                            >
                              {p.name} <span aria-hidden>↗</span>
                            </Link>
                          ) : (
                            <span className="inline-flex rounded-full border border-dashed border-line px-3 py-1.5 text-[13px] text-paper/55">{p.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="text-[15px] text-paper-dim">{r.context}</p>
                <ul className="mt-5 space-y-4">
                  {r.points.map((pt) => (
                    <li key={pt} className="relative pl-6 text-[17px] leading-[1.6] text-paper/70">
                      <span aria-hidden className="absolute top-[0.72em] left-0 size-1.5 rounded-full bg-signal" />
                      <Bullet text={pt} strong="font-medium text-paper" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </ScreenSection>

      <ScreenSection title="Skills">
        <dl>
          {resume.skills.map((s) => (
            <div key={s.title} className="grid gap-2 border-t border-line py-6 md:grid-cols-12">
              <dt className="label pt-1.5 text-signal md:col-span-3">{s.title}</dt>
              <dd className="text-[17px] text-paper/80 md:col-span-9">{s.body}</dd>
            </div>
          ))}
        </dl>
      </ScreenSection>

      <div className="grid gap-16 lg:grid-cols-2">
        <ScreenSection title="Education">
          <ul>
            {resume.education.map((e) => (
              <li key={e.title} className="border-t border-line py-5">
                <p className="text-[17px]">{e.title}</p>
                <p className="label mt-2">
                  {e.org} · {e.year}
                </p>
              </li>
            ))}
          </ul>
        </ScreenSection>
        <ScreenSection title="Patents">
          <ul>
            {resume.inventions.map((i) => (
              <li key={i.title} className="border-t border-line py-5">
                <Link href="/inventions" data-cursor="Patents" data-cursor-icon="document" className="group block">
                  <p className="text-[17px] transition-colors group-hover:text-signal">
                    {i.title} <span className="text-paper/55">· {i.detail}</span>
                  </p>
                  <p className="label mt-2">{i.status}</p>
                </Link>
              </li>
            ))}
          </ul>
        </ScreenSection>
      </div>

      <p className="label mt-20 normal-case tracking-normal">Outcome figures on this page are my own reporting from each role.</p>
    </article>
  );
}

function ScreenSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-32" aria-label={title}>
      <h2 className="label mb-10 flex items-center gap-4">
        {title}
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  );
}

/* ── Paper ────────────────────────────────────────────────────────────────── */

/**
 * One page, one column, standard headings, real text: the format applicant
 * tracking systems parse cleanly and recruiters scan in seconds. Print rules
 * in globals.css flip the palette to ink on white.
 */
function Paper() {
  return (
    <div className="hidden text-[9.3pt] leading-[1.37] text-paper print:block">
      <header className="flex items-end justify-between gap-6 border-b-[1.5pt] border-paper pb-[7pt]">
        <div>
          <h1 className="font-display text-[30pt] leading-[0.9]">{resume.name}</h1>
          <p className="mt-[5pt] text-[10.5pt] font-medium text-signal">{resume.headline}</p>
        </div>
        <ul className="text-right text-[8.6pt] leading-[1.5] text-paper-dim">
          <li>{resume.contact.slice(0, 3).map((c, i) => <Contact key={c.label} c={c} first={i === 0} />)}</li>
          <li>{resume.contact.slice(3).map((c, i) => <Contact key={c.label} c={c} first={i === 0} />)}</li>
        </ul>
      </header>

      <p className="mt-[7pt] text-[9.4pt] leading-[1.42]">{resume.summary}</p>

      <PaperSection title="Experience">
        {resume.experience.map((r) => (
          <div key={r.org} className="break-inside-avoid pt-[5pt] first:pt-0">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[10.2pt]">
                <span className="font-semibold">{r.org}</span>
                <span className="text-paper-dim"> · </span>
                {r.role}
              </p>
              <p className="tabular shrink-0 text-[8.8pt] font-medium">{r.dates}</p>
            </div>
            <div className="flex items-baseline justify-between gap-4 text-[8.6pt] text-paper-dim">
              <p className="italic">{r.context}</p>
              <p className="shrink-0">{r.place}</p>
            </div>
            <ul className="mt-[2pt] space-y-[1pt]">
              {r.points.map((pt) => (
                <li key={pt} className="relative pl-[9pt]">
                  <span aria-hidden className="absolute top-0 left-0 text-signal">
                    •
                  </span>
                  <Bullet text={pt} strong="font-semibold" />
                </li>
              ))}
            </ul>
            {r.products && (
              <p className="mt-[2.5pt] pl-[9pt] text-[8.6pt] text-paper-dim">
                <span className="font-medium text-paper">Products: </span>
                {r.products.map((p) => p.name).join(" · ")}
              </p>
            )}
          </div>
        ))}
      </PaperSection>

      <PaperSection title="Skills">
        <dl className="grid grid-cols-[5.2em_1fr] gap-x-[8pt] gap-y-[1.5pt]">
          {resume.skills.map((s) => (
            <div key={s.title} className="contents">
              <dt className="font-semibold">{s.title}</dt>
              <dd>{s.body}</dd>
            </div>
          ))}
        </dl>
      </PaperSection>

      <div className="grid grid-cols-[1.5fr_1fr] gap-[18pt]">
        <PaperSection title="Education">
          <ul className="space-y-[1pt]">
            {resume.education.map((e) => (
              <li key={e.title}>
                <span className="font-medium">{e.title}</span>
                <span className="text-paper-dim">
                  {" "}
                  · {e.org} · {e.year}
                </span>
              </li>
            ))}
          </ul>
        </PaperSection>
        <PaperSection title="Patents">
          <ul className="space-y-[1pt]">
            {resume.inventions.map((i) => (
              <li key={i.title}>
                <span className="font-medium">{i.title}</span>
                <span className="text-paper-dim"> · {i.status}</span>
              </li>
            ))}
            <li className="text-paper-dim">{resume.inventions[0].detail}</li>
          </ul>
        </PaperSection>
      </div>
    </div>
  );
}

function PaperSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-[9pt]">
      <h2 className="mb-[4pt] flex items-center gap-[6pt] font-mono text-[8pt] font-medium tracking-[0.12em] text-signal uppercase">
        {title}
        <span aria-hidden className="h-px flex-1 bg-line-strong" />
      </h2>
      {children}
    </section>
  );
}

function Contact({ c, first }: { c: (typeof resume.contact)[number]; first: boolean }) {
  return (
    <>
      {!first && <span aria-hidden> · </span>}
      {"href" in c && c.href ? <a href={c.href}>{c.label}</a> : c.label}
    </>
  );
}

/** A bullet with its figures set in `strong`. */
function Bullet({ text, strong }: { text: string; strong: string }) {
  return (
    <>
      {runs(text).map((r, i) =>
        r.bold ? (
          <strong key={i} className={strong}>
            {r.text}
          </strong>
        ) : (
          r.text
        ),
      )}
    </>
  );
}
