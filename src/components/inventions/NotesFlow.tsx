"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { name: "Pin", body: "Someone in the field spots a problem and pins a note, with a photo, to the exact sprinkler." },
  { name: "Assign", body: "The note goes to a person. It syncs to their phone, wherever they are on the property." },
  { name: "Resolve", body: "They fix it and close the note from the field, with what they did." },
  { name: "Remember", body: "Closed notes are archived on that sprinkler, so it builds its own maintenance history." },
];

/** Sprinkler heads along a fairway, in percent of the stage. */
const heads = [
  [18, 62], [26, 50], [33, 40], [41, 33], [49, 29], [57, 30], [65, 35], [72, 43], [78, 53],
  [24, 72], [33, 62], [41, 53], [49, 48], [57, 48], [64, 52], [71, 60],
];
const target = heads[13];

/**
 * The Smart Notes idea in four beats, on loop: pin, assign, resolve, and
 * remember. Illustrative, not a screen from a product.
 */
export function NotesFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12">
      <ol className="space-y-2 lg:col-span-4">
        {steps.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className="w-full rounded-2xl p-5 text-left transition-colors duration-500"
              style={{ backgroundColor: i === step ? "color-mix(in oklab, var(--color-signal) 12%, transparent)" : "transparent" }}
              aria-current={i === step ? "step" : undefined}
            >
              <span className="flex items-center gap-3">
                <span className="label tabular" style={{ color: i <= step ? "var(--color-signal)" : undefined }}>
                  0{i + 1}
                </span>
                <span className={`font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-none transition-colors ${i === step ? "text-paper" : "text-paper/45"}`}>{s.name}</span>
              </span>
              <span className={`mt-3 block text-[15px] leading-relaxed transition-colors ${i === step ? "text-paper/80" : "text-paper/55"}`}>{s.body}</span>
            </button>
          </li>
        ))}
      </ol>

      <figure className="lg:col-span-8">
        <div aria-hidden className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#0f1a14] ring-1 ring-line">
          <svg viewBox="0 0 100 62.5" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="nf-turf" cx="50%" cy="45%" r="70%">
                <stop offset="0" stopColor="#2f5a3f" />
                <stop offset="1" stopColor="#1b3426" />
              </radialGradient>
            </defs>
            <path d="M12 44 C 10 28, 34 12, 58 13 C 78 14, 90 26, 86 38 C 83 46, 72 44, 60 40 C 46 36, 32 44, 26 50 C 20 55, 13 52, 12 44 Z" fill="url(#nf-turf)" />
            <path d="M76 21 c 4 -2.5 9 -1 9 1.8 s -6 4 -9 1.6 z" fill="#d9cfa8" opacity="0.85" />
          </svg>

          {heads.map(([x, y], i) => {
            const isTarget = x === target[0] && y === target[1];
            return (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                {isTarget && step < 3 && (
                  <motion.span
                    className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal"
                    animate={reduce ? undefined : { scale: [0.6, 1.6], opacity: [0.9, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className="block size-2.5 rounded-full border transition-colors duration-500"
                  style={{
                    backgroundColor: isTarget ? (step === 2 || step === 3 ? "#5ad18a" : "var(--color-signal)") : "rgba(237,234,228,.55)",
                    borderColor: "rgba(0,0,0,.35)",
                  }}
                />
              </span>
            );
          })}

          {/* The note: pinned beside the head, then filed into its history */}
          <AnimatePresence>
            {step < 3 && (
              <motion.div
                key="note"
                className="absolute w-[34%] rounded-2xl bg-paper p-[1.6%] text-ink shadow-[0_24px_60px_-12px_rgba(0,0,0,.6)]"
                style={{ left: `${target[0] - 40}%`, top: `${target[1] - 38}%` }}
                initial={{ opacity: 0, y: -24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: "70%", y: "40%", scale: 0.4 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[clamp(9px,1vw,13px)] font-medium">Leak at the head</span>
                  <motion.span
                    layout
                    className="rounded-full px-2 py-0.5 text-[clamp(7px,0.8vw,10px)] font-medium"
                    style={{ backgroundColor: step === 2 ? "#5ad18a" : "var(--color-signal)", color: "#0a0a0b" }}
                  >
                    {step === 2 ? "Resolved" : "Open"}
                  </motion.span>
                </div>
                <div className="mt-[4%] flex gap-[4%]">
                  <span className="block aspect-square w-[30%] shrink-0 rounded-lg bg-[linear-gradient(135deg,#3d6b4c,#20382a)]" />
                  <span className="text-[clamp(7px,0.85vw,11px)] leading-snug text-ink/70">Water pooling by the cart path after the overnight cycle.</span>
                </div>
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div
                      className="mt-[5%] flex items-center gap-2 border-t border-ink/10 pt-[4%]"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <span className="flex size-[clamp(14px,1.6vw,22px)] items-center justify-center rounded-full bg-ink text-[clamp(6px,0.7vw,9px)] font-medium text-paper">IT</span>
                      <span className="text-[clamp(7px,0.85vw,11px)] text-ink/70">
                        {step === 2 ? "Fixed: replaced the seal" : "Assigned to the irrigation tech"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The sprinkler's history */}
          <motion.div
            className="absolute right-[3%] bottom-[5%] w-[30%] rounded-2xl border border-white/10 bg-black/55 p-[1.6%] backdrop-blur"
            animate={{ opacity: step === 3 ? 1 : 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label !text-[clamp(7px,0.75vw,10px)] !text-paper/60">This head · history</p>
            <ul className="mt-[5%] space-y-[4%] text-[clamp(7px,0.85vw,11px)] text-paper/85">
              <AnimatePresence initial={false}>
                {step === 3 && (
                  <motion.li key="new" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
                    <span className="text-[#5ad18a]">●</span> Leak at the head · resolved
                  </motion.li>
                )}
              </AnimatePresence>
              <li className="text-paper/55">● Nozzle swapped</li>
              <li className="text-paper/55">● Low pressure, checked</li>
            </ul>
          </motion.div>
        </div>
        <figcaption className="label mt-4 normal-case tracking-normal">Illustration of the idea, not a product screen.</figcaption>
      </figure>
    </div>
  );
}
