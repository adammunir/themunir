import Link from "next/link";
import { Lines } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { profile } from "@/content";

export function Footer() {
  return (
    <footer id="contact" data-print="hide" className="relative overflow-hidden border-t border-line pt-32 pb-10">
      <div className="shell">
        <p className="label mb-8">Next station</p>
        <Lines
          text={"Have a hard problem\nworth <em>designing</em> properly?"}
          className="font-display text-title [&_em]:text-signal"
        />
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Write"
              className="inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-[16px] font-medium text-ink transition-colors hover:bg-signal"
            >
              {profile.email}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          {profile.links.map((l) => (
            <Magnetic key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-line-strong px-6 py-4 text-[15px] transition-colors hover:border-paper"
              >
                {l.label} ↗
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="mt-32 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[13px] text-paper-dim sm:flex-row">
          <span>
            {profile.name} · {profile.location}
          </span>
          <span className="flex gap-6">
            <Link href="/colophon" className="hover:text-paper">Colophon</Link>
            <Link href="/about" className="hover:text-paper">About</Link>
            <span>Designed and built by hand, 2026</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
