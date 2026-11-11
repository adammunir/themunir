"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";

type Phase = NonNullable<Project["process"]>[number];

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The process as a pinned track: the current phase sits large on the left
 * while the work behind it scrolls past on the right.
 */
export function ProcessTrack({ phases, accent }: { phases: Phase[]; accent: string }) {
  const [active, setActive] = useState(0);
  const now = phases[active];

  return (
    <div className="grid gap-12 lg:grid-cols-9">
      <div className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-32">
          <p className="label tabular" style={{ color: accent }}>
            Phase {String(active + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
          </p>
          <div className="relative mt-4 h-[clamp(6rem,9vw,9rem)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={now.phase}
                className="absolute inset-x-0 top-0 font-display text-[clamp(3rem,5vw,5rem)] leading-[0.95]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                {now.phase}
              </motion.p>
            </AnimatePresence>
          </div>
          <ol className="mt-6 space-y-2" aria-hidden>
            {phases.map((p, i) => (
              <li key={p.phase} className="flex items-center gap-3">
                <span
                  className="h-px transition-all duration-500"
                  style={{ width: i === active ? 40 : 16, backgroundColor: i <= active ? accent : "var(--color-line-strong)" }}
                />
                <span className={`label transition-colors duration-500 ${i === active ? "!text-paper" : ""}`}>{p.phase}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className="lg:col-span-6">
        {phases.map((p, i) => (
          <Step key={p.phase} phase={p} index={i} accent={accent} onActive={() => setActive(i)} />
        ))}
      </ol>
    </div>
  );
}

function Step({ phase, index, accent, onActive }: { phase: Phase; index: number; accent: string; onActive: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (centered) onActive();
  }, [centered, onActive]);

  return (
    <motion.li
      ref={ref}
      className="border-t border-line py-12 first:border-t-0 first:pt-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="flex items-baseline gap-4">
        <span className="label tabular" style={{ color: accent }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none lg:hidden">{phase.phase}</h3>
        {phase.when && <span className="label ml-auto">{phase.when}</span>}
      </div>
      <p className="mt-5 text-[18px] leading-[1.7] text-paper/85">{phase.did}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {phase.artifacts.map((a) => (
          <li key={a} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-paper/75">
            {a}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex gap-3 text-[16px] text-paper/90">
        <span className="label shrink-0 pt-1" style={{ color: accent }}>
          What it changed →
        </span>
        <span>{phase.changed}</span>
      </p>
    </motion.li>
  );
}
