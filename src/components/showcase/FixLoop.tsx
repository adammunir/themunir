"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { Shot } from "@/content/types";
import { Heading } from "./Scenes";

type Stage = { name: string; detail: string; loop?: boolean };

/** Where the stage walk starts and ends, in section progress. */
const START = 0.16;
const END = 0.9;
/** How far the first build sits off the design, in percent of the screen. */
const DRIFT = { x: 3.2, y: 1.4 };

/**
 * Lays out the run as a flat list of stage indices: the lead-in stages once,
 * the loop once per reading (the last pass passes, so it skips the fix), then
 * the closing stages.
 */
function plan(stages: Stage[], passes: number) {
  const loop = stages.flatMap((s, i) => (s.loop ? [i] : []));
  const lead = stages.flatMap((s, i) => (i < loop[0] ? [i] : []));
  const tail = stages.flatMap((s, i) => (i > loop[loop.length - 1] ? [i] : []));
  const seq: { stage: number; pass: number }[] = lead.map((stage) => ({ stage, pass: -1 }));
  for (let pass = 0; pass < passes; pass++) {
    for (const stage of pass === passes - 1 ? loop.slice(0, -1) : loop) seq.push({ stage, pass });
  }
  seq.push(...tail.map((stage) => ({ stage, pass: -1 })));
  return { seq, firstLoop: lead.length, fix: loop[loop.length - 1] };
}

/**
 * The design-to-code loop, replayed on a real screen: the build sits over the
 * design in difference mode, so every misaligned edge glows, and each fix pulls
 * it closer until the diff drops under the threshold and the screen resolves.
 */
export function FixLoop({
  eyebrow,
  title,
  body,
  shot,
  stages,
  diffs,
  threshold,
  note,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  shot: Shot;
  stages: Stage[];
  diffs: number[];
  threshold: number;
  note: string;
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const still = useMotionValue(1);
  const p = reduce ? still : spring;

  const { seq, firstLoop, fix } = plan(stages, diffs.length);
  const step = (END - START) / seq.length;
  const at = (k: number) => START + k * step;

  // Each fix pulls the reading down to the next pass's number.
  const keys = [0];
  const values = [diffs[0]];
  seq.forEach((s, k) => {
    if (s.stage !== fix) return;
    keys.push(at(k), at(k + 1));
    values.push(diffs[s.pass], diffs[s.pass + 1]);
  });
  keys.push(1);
  values.push(diffs[diffs.length - 1]);
  const diff = useTransform(p, keys, values);

  const x = useTransform(diff, (d) => `${(d / diffs[0]) * DRIFT.x}%`);
  const y = useTransform(diff, (d) => `${(d / diffs[0]) * -DRIFT.y}%`);
  const last = seq.length - 1;
  const overlay = useTransform(p, [at(firstLoop), at(firstLoop + 1), at(last), at(last + 0.7)], [0, 1, 1, 0]);
  const headOpacity = useTransform(p, [0, 0.04, 0.13], [1, 1, 0]);
  const headY = useTransform(p, [0, 0.13], [0, -40]);
  const stageY = useTransform(p, [0, 0.14], ["30svh", "0svh"]);
  const stageScale = useTransform(p, [0, 0.14], [0.9, 1]);

  const [active, setActive] = useState(-1);
  const [reading, setReading] = useState(diffs[0]);
  useMotionValueEvent(p, "change", (v) => setActive(v < START ? -1 : Math.min(last, Math.floor((v - START) / step))));
  useMotionValueEvent(diff, "change", setReading);

  const now = reduce ? seq[last] : seq[active];
  const measured = (reduce ? last : active) > firstLoop;
  const passed = (reduce ? last : active) === last;
  const pass = now && now.pass >= 0 ? now.pass : passed ? diffs.length - 1 : -1;

  return (
    <section ref={ref} className="relative h-[480svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(48% 42% at 42% 55%, ${accent}22, transparent 70%)` }}
        />
        <motion.div className="shell absolute top-[11svh] z-10" style={{ opacity: headOpacity, y: headY }}>
          <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
        </motion.div>

        <motion.div className="shell grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]" style={{ y: stageY, scale: stageScale }}>
          <figure className="mx-auto w-full" style={{ maxWidth: "calc((100svh - 230px) * 1.92)" }}>
            <div className="relative isolate overflow-hidden rounded-[18px] bg-black ring-1 ring-white/10">
              <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1280px) 1000px, 92vw" className="block h-auto w-full" />
              <motion.div aria-hidden className="absolute inset-0" style={{ mixBlendMode: "difference", opacity: overlay, x, y }}>
                <Image src={shot.src} alt="" fill sizes="(min-width: 1280px) 1000px, 92vw" className="object-cover" />
              </motion.div>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="label rounded-full bg-black/70 px-3 py-2 !text-paper backdrop-blur">
                  {passed ? "Build = design" : measured ? "Design ⊖ build" : "Design · Figma"}
                </span>
                {now && <span className="label rounded-full bg-black/70 px-3 py-2 backdrop-blur lg:hidden" style={{ color: accent }}>{stages[now.stage].name}</span>}
              </div>

              <div className="absolute right-4 bottom-4 rounded-2xl bg-black/75 px-4 py-3 text-right backdrop-blur" aria-live="polite">
                <p className="label !text-paper/55">Visual diff</p>
                <p className="tabular font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none" style={{ color: passed ? accent : undefined }}>
                  {measured ? `${reading.toFixed(1)}%` : "—"}
                </p>
                <p className="label mt-1 !text-paper/45">
                  {passed ? "Passed" : `Pass at < ${threshold}%`}
                </p>
              </div>
            </div>
            <figcaption className="label mt-4 !text-paper/40">{note}</figcaption>
          </figure>

          <aside className="hidden lg:block">
            <p className="label mb-5 !text-paper/50">
              {pass >= 0 ? `Pass ${pass + 1} of ${diffs.length}` : "Designer skill"}
            </p>
            <ol className="relative space-y-1">
              {stages.map((s, i) => {
                const on = now?.stage === i;
                const done = !on && seq.findIndex((q) => q.stage === i) < active && active >= 0;
                return (
                  <li
                    key={s.name}
                    className="relative rounded-xl px-3 py-2 transition-colors duration-300"
                    style={{ backgroundColor: on ? `${accent}1f` : "transparent" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-2 shrink-0 rounded-full transition-all duration-300"
                        style={{ backgroundColor: on || done ? accent : "rgb(255 255 255 / 0.2)", boxShadow: on ? `0 0 12px ${accent}` : "none" }}
                      />
                      <span className={`text-[15px] transition-colors duration-300 ${on ? "text-paper" : done ? "text-paper/70" : "text-paper/40"}`}>{s.name}</span>
                      {s.loop && <span className="label ml-auto !text-[10px] !text-paper/30">loop</span>}
                    </div>
                    <p className={`overflow-hidden pl-5 text-[13px] text-paper/55 transition-all duration-300 ${on ? "mt-1 max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>{s.detail}</p>
                  </li>
                );
              })}
            </ol>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
