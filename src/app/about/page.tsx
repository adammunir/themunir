import type { Metadata } from "next";
import Link from "next/link";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="shell pt-40 pb-32">
      <p className="label mb-8">About</p>
      <Lines
        as="h1"
        immediate
        text={"I started in data.\nNow I design the <em>software layer</em>\nthat makes it usable."}
        className="font-display text-title [&_em]:text-signal"
      />
      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <Reveal className="space-y-6 text-[19px] leading-[1.7] text-paper/80 lg:col-span-6">
          <p>{profile.intro}</p>
          <p>
            My career began in analytics and data operations. That gave me a systems-thinking, metrics-first approach that
            I&apos;ve carried through fintech, streaming, logistics, and, since 2022, irrigation for golf, landscape, and the
            home at The Toro Company.
          </p>
          <p>
            I work at the seam between UX and engineering. I run the research, design the system, write the code, and
            instrument the result, increasingly with AI agents I build and hold to account. Originally from the UK, I&apos;m
            now based in {profile.location}.
          </p>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="label mb-6">Career</p>
          <ol>
            {profile.career.map((c) => (
              <li key={c.org} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-line py-4 text-[15px]">
                <span className="label pt-1 tabular">{c.years}</span>
                <span>
                  <span className="font-medium">{c.org}</span>
                  <span className="block text-paper-dim">
                    {c.role} · {c.place}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <p className="label mt-14 mb-6">Credentials</p>
          <ul className="space-y-3 text-[15px] text-paper/80">
            {profile.credentials.map((c) => (
              <li key={c} className="border-t border-line pt-3">
                {c.startsWith("US Patent") ? (
                  <Link href="/inventions" data-cursor="Patents" data-cursor-icon="document" className="group hover:text-paper">
                    {c} <span className="label inline-block !text-signal transition-transform group-hover:translate-x-1">Snapshot →</span>
                  </Link>
                ) : (
                  c
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
