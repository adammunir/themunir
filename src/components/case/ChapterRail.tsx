"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

export type Chapter = { id: string; label: string };

/** The pipeline in miniature: a sticky list of chapters that lights up as you read. */
export function ChapterRail({ chapters, accent }: { chapters: Chapter[]; accent: string }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: accent }}
      />
      <nav aria-label="Chapters" className="sticky top-28 hidden xl:block">
        <ol className="relative space-y-4 border-l border-line pl-5">
          {chapters.map((c, i) => {
            const on = c.id === active;
            return (
              <li key={c.id} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[24.5px] size-2 -translate-y-1/2 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: on ? accent : "#0a0a0b",
                    boxShadow: on ? `0 0 14px ${accent}` : "none",
                    outline: `1px solid ${on ? accent : "rgba(237,234,228,.22)"}`,
                  }}
                />
                <a
                  href={`#${c.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`label block transition-colors ${on ? "!text-paper" : "hover:!text-paper"}`}
                >
                  <span className="tabular mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {c.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
