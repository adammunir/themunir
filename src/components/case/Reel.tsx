"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Display, Phone } from "@/components/showcase/Devices";
import type { Media, Shot } from "@/content/types";

type ReelMedia = Extract<Media, { kind: "reel" }>;
type Variant = { media: ReelMedia; playing: boolean; priority: boolean; sizes: string };

const ease = [0.16, 1, 0.3, 1] as const;

/** Steps through `count` items every `every` ms while playing. */
function useLoop(count: number, every: number, playing: boolean, offset = 0) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!playing || count < 2) return;
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setI((v) => (v + 1) % count);
      tick = setInterval(() => setI((v) => (v + 1) % count), every);
    }, offset || every);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [count, every, playing, offset]);
  return i;
}

/**
 * A short, silent cover loop built from real screens. It only moves while on
 * screen, and holds still for people who prefer reduced motion.
 */
export function Reel({ media, sizes = "100vw", priority = false, className = "" }: { media: ReelMedia; sizes?: string; priority?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "10% 0px" });
  const reduce = useReducedMotion();
  const Scene = { wall: Wall, stage: Stage, cinema: Cinema }[media.variant];

  return (
    <div ref={ref} role="img" aria-label={media.alt} className={`relative aspect-[16/10] w-full overflow-hidden bg-ink-2 ${className}`}>
      <Scene media={media} playing={inView && !reduce} priority={priority} sizes={sizes} />
    </div>
  );
}

// Tinted by the nearest --accent, so each station glows in its own colour.
const glow = "radial-gradient(55% 60% at 50% 45%, color-mix(in oklab, var(--accent, #ffffff) 26%, transparent), transparent 72%)";

/* ── Wall: columns of phones on a tilted plane, drifting in opposite directions ── */

function Wall({ media, playing }: Variant) {
  const reduce = useReducedMotion();
  const cols = 5;
  const columns = Array.from({ length: cols }, (_, c) => media.shots.filter((_, i) => i % cols === c));

  return (
    <>
      <div aria-hidden className="absolute inset-0" style={{ background: glow }} />
      <div aria-hidden className="absolute inset-0 [perspective:1800px]">
        <div
          className="absolute top-1/2 left-1/2 flex w-[135%] gap-[2.4%]"
          style={{ transform: "translate(-50%, -50%) rotateX(30deg) rotateZ(-16deg)", transformStyle: "preserve-3d" }}
        >
          {columns.map((list, c) => (
            <div key={c} className="flex-1" style={{ marginTop: c % 2 ? "-22%" : "4%" }}>
              <div
                style={{
                  animation: reduce ? "none" : `reel-column ${44 + c * 6}s linear infinite`,
                  animationDirection: c % 2 ? "reverse" : "normal",
                  animationPlayState: playing ? "running" : "paused",
                }}
              >
                {[...list, ...list].map((s, i) => (
                  <div key={i} className="pb-[16%]">
                    <Phone shot={s} lock ratio={`${s.width}/${s.height}`} sizes="220px" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink-2)_92%)]" />
    </>
  );
}

/* ── Stage: a display and a phone, each stepping through its own screens ───── */

function Stage({ media, playing, priority, sizes }: Variant) {
  const every = 3600;
  const d = useLoop(media.shots.length, every, playing);
  const phones = media.phones ?? [];
  const m = useLoop(phones.length, every, playing, every * 1.5);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={d}
          aria-hidden
          className="absolute -inset-[12%] blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <Image src={media.shots[d].src} alt="" fill sizes="240px" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0" style={{ background: glow }} />

      <motion.div
        className="absolute top-[11%] left-[5%] w-[76%]"
        animate={playing ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Display stand={false} ratio={`${media.shots[0].width}/${media.shots[0].height}`}>
          <AnimatePresence initial={false}>
            <Screen key={d} shot={media.shots[d]} sizes={sizes} priority={priority && d === 0} />
          </AnimatePresence>
        </Display>
        <Segments count={media.shots.length} active={d} every={every} playing={playing} className="mt-[3%]" />
      </motion.div>

      {phones.length > 0 && (
        <motion.div
          className="absolute right-[6%] bottom-[-6%] w-[21%]"
          style={{ rotate: -3 }}
          animate={playing ? { y: [0, -12, 0] } : undefined}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Phone lock ratio={`${phones[0].width}/${phones[0].height}`}>
            <AnimatePresence initial={false}>
              <motion.div
                key={m}
                className="absolute inset-0"
                initial={{ opacity: 0, y: "6%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                <Image src={phones[m].src} alt="" fill sizes="260px" className="object-cover object-top" />
              </motion.div>
            </AnimatePresence>
          </Phone>
        </motion.div>
      )}
    </>
  );
}

function Screen({ shot, sizes, priority }: { shot: Shot; sizes: string; priority: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease }}
    >
      <Image src={shot.src} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </motion.div>
  );
}

/* ── Cinema: slow push-ins, crossfades, and a segmented progress bar ────────── */

function Cinema({ media, playing, priority, sizes }: Variant) {
  const every = 5000;
  const i = useLoop(media.shots.length, every, playing);
  const shot = media.shots[i];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.14, x: i % 2 ? "2%" : "-2%" }}
            animate={playing ? { scale: 1, x: "0%" } : { scale: 1.04, x: "0%" }}
            transition={{ duration: (every + 1600) / 1000, ease: "linear" }}
          >
            <Image src={shot.src} alt="" fill sizes={sizes} priority={priority && i === 0} className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,.7))]" />
      <div className="absolute inset-x-[5%] bottom-[7%] flex items-end justify-between gap-6">
        <AnimatePresence mode="wait" initial={false}>
          {shot.caption && (
            <motion.p
              key={i}
              className="font-display text-[clamp(1.25rem,2.4vw,2.25rem)] leading-none text-paper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, ease }}
            >
              {shot.caption}
            </motion.p>
          )}
        </AnimatePresence>
        <Segments count={media.shots.length} active={i} every={every} playing={playing} />
      </div>
    </>
  );
}

/** Apple TV-style progress: past segments full, the current one filling. */
function Segments({ count, active, every, playing, className = "" }: { count: number; active: number; every: number; playing: boolean; className?: string }) {
  return (
    <div aria-hidden className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: count }, (_, k) => (
        <span key={k} className="h-[3px] w-[clamp(1rem,2.4vw,2.25rem)] overflow-hidden rounded-full bg-white/20">
          <motion.span
            key={k === active ? `on-${active}` : k}
            className="block h-full origin-left bg-paper"
            initial={{ scaleX: k < active ? 1 : 0 }}
            animate={{ scaleX: k <= active ? 1 : 0 }}
            transition={k === active && playing ? { duration: every / 1000, ease: "linear" } : { duration: 0 }}
          />
        </span>
      ))}
    </div>
  );
}
