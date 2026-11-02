"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const steps = [
  {
    word: "Research",
    claim: "Evidence before opinion.",
    body: "Product analytics, field crash reports, competitive audits of whole categories, and structured usability studies. I want the telemetry before the roadmap and the failure mode before the fix.",
    artifacts: ["Analytics funnels", "Crash triage", "Competitive audits", "Usability plans"],
  },
  {
    word: "Design",
    claim: "Systems, not screens.",
    body: "Flows, information architecture, and a token-driven design system shared across iOS, Android, and web. Every decision is written down with what was rejected and why.",
    artifacts: ["Figma systems", "Design tokens", "Prototypes", "Decision records"],
  },
  {
    word: "Build",
    claim: "I ship the thing I drew.",
    body: "Front end and back end, native and web. I help build what I design, so it ships the way it was drawn, held to pixel-diff thresholds, not \"close enough\".",
    artifacts: ["Native + web", "Pixel-diff CI", "Architecture", "AI agents"],
  },
  {
    word: "Measure",
    claim: "Outcomes or it didn't happen.",
    body: "Instrumentation ships with the feature. I read the funnels the week after launch and feed what I learn back into the next round of research.",
    artifacts: ["Event schemas", "Dashboards", "Release notes", "Retros"],
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const fill = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const step = steps[active];

  return (
    <section id="process" ref={ref} className="relative h-[400svh]" aria-labelledby="process-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell">
          <div className="mb-16 flex items-baseline justify-between">
            <p id="process-title" className="label">02 — How I work</p>
            <p className="label tabular">
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
          </div>

          {/* The line, now horizontal */}
          <div className="relative mb-20">
            <div className="h-px w-full bg-line" />
            <motion.div className="absolute inset-0 h-px origin-left bg-signal" style={{ scaleX: fill }} />
            <ol className="absolute inset-x-0 -top-[7px] flex justify-between">
              {steps.map((s, i) => (
                <li key={s.word} className="flex flex-col items-center gap-4 first:items-start last:items-end">
                  <motion.span
                    className="block size-[15px] rounded-full border bg-ink"
                    animate={{
                      borderColor: i <= active ? "#ff4d2e" : "rgba(237,234,228,.22)",
                      boxShadow: i === active ? "0 0 24px 4px rgba(255,77,46,.5)" : "0 0 0 0 transparent",
                    }}
                  />
                  <span className={`label transition-colors ${i <= active ? "!text-paper" : ""}`}>{s.word}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <div className="relative h-[clamp(5rem,15vw,15rem)] overflow-hidden lg:col-span-7">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h3
                  key={step.word}
                  className="absolute font-display text-[clamp(4.5rem,15vw,15rem)] leading-[0.9]"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                >
                  {step.word}
                  <span className="text-signal">.</span>
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight italic">{step.claim}</p>
                  <p className="mt-5 text-paper/70">{step.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {step.artifacts.map((a) => (
                      <li key={a} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-paper/80">
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
