"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Shot } from "@/content/types";
import { Display, Phone, Sheet } from "./Devices";

const ease = [0.16, 1, 0.3, 1] as const;

export function Heading({ eyebrow, title, body, accent, center = false }: { eyebrow: string; title: string; body?: string; accent: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="label mb-5" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.98]">{title}</h2>
      {body && <p className={`mt-6 text-[18px] text-paper/65 ${center ? "mx-auto max-w-2xl" : ""}`}>{body}</p>}
    </div>
  );
}

/* ── Zoom: start inside a detail, pull back to the whole product ─────────────── */

export function Zoom({
  eyebrow,
  title,
  body,
  shot,
  focus,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  shot: Shot;
  focus: { x: number; y: number; scale: number };
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const scale = useTransform(p, [0, 0.7], [focus.scale, 1]);
  const radius = useTransform(p, [0.4, 0.7], [0, 18]);
  const frame = useTransform(p, [0.45, 0.75], [0, 1]);
  const copyOpacity = useTransform(p, [0, 0.12, 0.3], [1, 1, 0]);
  const copyY = useTransform(p, [0, 0.3], [0, -40]);
  const capOpacity = useTransform(p, [0.75, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(to_bottom,rgba(10,10,11,0.88)_0%,rgba(10,10,11,0.88)_65%,transparent_90%)]"
          style={{ opacity: copyOpacity }}
        />
        <motion.div className="shell absolute top-[12svh] z-10" style={{ opacity: copyOpacity, y: copyY }}>
          <Heading eyebrow={eyebrow} title={title} accent={accent} />
        </motion.div>
        <motion.div
          className="relative w-[min(92vw,1240px,calc((100svh-200px)*1.7))] overflow-hidden"
          style={{ scale, borderRadius: radius, transformOrigin: `${focus.x}% ${focus.y}%` }}
        >
          <motion.div aria-hidden className="absolute inset-0 z-10 rounded-[inherit] ring-1 ring-white/10" style={{ opacity: frame }} />
          <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1280px) 1240px, 92vw" className="block h-auto w-full" />
        </motion.div>
        <motion.p className="shell mt-8 max-w-2xl text-center text-[17px] text-paper/65" style={{ opacity: capOpacity }}>
          {body}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Exploded: a stack rises, fans into a lineup, then a spotlight walks it ─── */

export function Exploded({
  eyebrow,
  title,
  body,
  shots,
  device,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  shots: Shot[];
  device: "phone" | "desktop";
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.0005 });
  // Reduced motion: hold the finished lineup with its captions and copy.
  const settled = useMotionValue(0.62);
  const p = reduce ? settled : spring;
  const phone = device === "phone";
  const n = shots.length;

  // Act 1: the stack stands up out of the floor. Act 2: it fans out. Act 3: a spotlight walks the row.
  // While the heading is up, the stack stands smaller and lower so the two never collide.
  const rise = useTransform(p, [0, 0.2], [1, 0]);
  const settle = useTransform(p, [0.22, 0.42], [0, 1]);
  const groupY = useTransform([rise, settle], ([r, st]: number[]) => `${r * 40 + (1 - st) * 24}%`);
  const groupRotateX = useTransform(rise, [1, 0], [52, 0]);
  const groupScale = useTransform([rise, settle], ([r, st]: number[]) => (0.7 - r * 0.1) + st * 0.3);
  const groupOpacity = useTransform(p, [0, 0.08], [0, 1]);
  const spread = useTransform(p, [0.26, 0.6], [0, 1]);
  const pool = useTransform(spread, [0, 1], [0.15, 0.4]);
  const headOpacity = useTransform(p, [0, 0.2, 0.32], [1, 1, 0]);
  const headY = useTransform(p, [0.2, 0.32], [0, -48]);
  const captions = useTransform(p, [0.56, 0.66], [0, 1]);
  const bodyOpacity = useTransform(p, [0.62, 0.72], [0, 1]);

  const [active, setActive] = useState(-1);
  useMotionValueEvent(p, "change", (v) => {
    const next = v < 0.66 ? -1 : Math.min(n - 1, Math.floor(((v - 0.66) / 0.3) * n));
    if (next !== active) setActive(next);
  });

  const width = phone ? "min(19vw, calc((100svh - 210px) * 0.42))" : "min(30vw, calc((100svh - 210px) * 1.5))";

  return (
    <section ref={ref} className="relative h-[440svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="shell absolute inset-x-0 top-[12svh] z-20" style={{ opacity: headOpacity, y: headY }}>
          <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
        </motion.div>

        {/* A soft pool of accent light the lineup stands in. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-20svh] mx-auto h-[70svh] w-[80vw] rounded-[50%] blur-3xl"
          style={{ opacity: pool, background: `radial-gradient(closest-side, ${accent}55, transparent)` }}
        />

        <div className="absolute inset-0 flex items-center justify-center pt-[4svh] [perspective:2400px]">
          <motion.div
            className="relative [transform-style:preserve-3d]"
            style={{ width, y: groupY, rotateX: groupRotateX, scale: groupScale, opacity: groupOpacity }}
          >
            {shots.map((s, i) => (
              <Card
                key={s.src}
                shot={s}
                i={i}
                n={n}
                spread={spread}
                captions={captions}
                phone={phone}
                accent={accent}
                state={active === -1 ? "idle" : active === i ? "on" : "off"}
              />
            ))}
          </motion.div>
        </div>

        <motion.p
          className="shell absolute inset-x-0 bottom-[5svh] z-20 mx-auto max-w-2xl text-center text-[17px] text-paper/65"
          style={{ opacity: bodyOpacity }}
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}

function Card({
  shot,
  i,
  n,
  spread,
  captions,
  phone,
  accent,
  state,
}: {
  shot: Shot;
  i: number;
  n: number;
  spread: MotionValue<number>;
  captions: MotionValue<number>;
  phone: boolean;
  accent: string;
  state: "idle" | "on" | "off";
}) {
  const c = i - (n - 1) / 2;
  const gap = phone ? 116 : 106;
  // Stacked: the first screen in front, the rest peeking up behind it.
  // Fanned: a gentle convex arc, the centre nearest the viewer.
  const x = useTransform(spread, (v) => `${c * gap * v + c * 4 * (1 - v)}%`);
  const y = useTransform(spread, (v) => `${-i * 4 * (1 - v)}%`);
  const z = useTransform(spread, [0, 1], [-i * 90, -Math.abs(c) * 170]);
  const rotateY = useTransform(spread, [0, 1], [0, c * 9]);
  const scale = useTransform(spread, [0, 1], [1 - i * 0.03, 1 - Math.abs(c) * 0.05]);

  return (
    <motion.div
      className={`${i === 0 ? "relative" : "absolute inset-x-0 top-0"} [transform-style:preserve-3d]`}
      style={{ x, y, z, scale, zIndex: n - i }}
    >
      <motion.div
        style={{ rotateY }}
        animate={{
          y: state === "on" ? "-5%" : "0%",
          scale: state === "on" ? 1.05 : 1,
          opacity: state === "off" ? 0.38 : 1,
          filter: state === "off" ? "saturate(0.4)" : "saturate(1)",
        }}
        transition={{ duration: 0.7, ease }}
      >
        {phone ? <Phone shot={shot} sizes="320px" lock /> : <Sheet shot={shot} sizes="560px" />}
      </motion.div>
      <motion.p className="label mt-7 text-center whitespace-nowrap" style={{ opacity: captions }}>
        <motion.span
          className="inline-flex items-center gap-2"
          animate={{ color: state === "on" ? "#edeae4" : "rgba(237,234,228,.45)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block size-1.5 rounded-full"
            style={{ backgroundColor: accent }}
            animate={{ scale: state === "on" ? 1.6 : 1, boxShadow: state === "on" ? `0 0 14px ${accent}` : "0 0 0 transparent" }}
          />
          {shot.title ?? shot.alt}
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

/* ── Wall: rows of screens on a tilted plane, drifting against each other ────── */

export function Wall({
  eyebrow,
  title,
  body,
  count,
  shots,
  device,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  count?: string;
  shots: Shot[];
  device: "phone" | "desktop";
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rows = device === "phone" ? 3 : 3;
  const perRow = Math.ceil(shots.length / rows);
  const a = useTransform(scrollYProgress, [0, 1], ["-4%", "-34%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-34%", "-4%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <div className="shell relative z-10 mb-16 flex flex-wrap items-end justify-between gap-10">
        <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
        {count && (
          <p className="font-display text-[clamp(4rem,10vw,9rem)] leading-none" style={{ color: accent }}>
            {count}
          </p>
        )}
      </div>
      <div className="[perspective:1800px]">
        <div className="space-y-6 [transform:rotateX(24deg)_rotateZ(-7deg)_scale(1.15)] [transform-style:preserve-3d]">
          {Array.from({ length: rows }, (_, r) => {
            const row = [...shots.slice(r * perRow, r * perRow + perRow), ...shots.slice(r * perRow, r * perRow + perRow)];
            return (
              <motion.div key={r} className="flex w-max gap-6" style={{ x: r % 2 ? b : a }}>
                {row.map((s, k) => (
                  <div key={`${s.src}-${k}`} className={device === "phone" ? "w-[180px] shrink-0" : "w-[520px] shrink-0"}>
                    {device === "phone" ? <Phone shot={s} sizes="180px" /> : <Sheet shot={s} sizes="520px" />}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink),transparent_18%,transparent_82%,var(--color-ink))]" />
    </section>
  );
}

/* ── Scrub: the product film plays as you scroll ─────────────────────────────── */

export function Scrub({
  eyebrow,
  title,
  body,
  src,
  poster,
  width,
  height,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const scale = useTransform(scrollYProgress, [0, 0.12], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.12], [28, 14]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(p, "change", (v) => {
    const el = video.current;
    if (!el || reduce || !el.duration) return;
    el.currentTime = Math.min(el.duration - 0.05, Math.max(0, v * el.duration));
  });

  return (
    <section ref={ref} className="relative h-[420svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-8 overflow-hidden">
        <div className="shell">
          <Heading eyebrow={eyebrow} title={title} accent={accent} />
        </div>
        <motion.div
          className="shell relative"
          style={{ scale }}
        >
          <motion.div className="relative mx-auto w-[min(100%,calc((100svh-320px)*1.78))] overflow-hidden bg-ink-2 ring-1 ring-white/10" style={{ borderRadius: radius }}>
            <video
              ref={video}
              src={src}
              poster={poster}
              width={width}
              height={height}
              muted
              playsInline
              preload="auto"
              aria-label={title}
              className="block h-auto w-full"
              autoPlay={reduce ?? false}
              loop={reduce ?? false}
            />
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
              <motion.div className="h-full origin-left" style={{ scaleX: bar, backgroundColor: accent }} />
            </div>
          </motion.div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[16px] text-paper/60">{body}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Film: the full piece, with sound, on demand ─────────────────────────────── */

export function Film({ src, poster, title, accent }: { src: string; poster: string; title: string; accent: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <section className="shell py-24">
      <div className="relative overflow-hidden rounded-[24px] bg-ink-2 ring-1 ring-white/10">
        <video
          ref={ref}
          src={playing ? src : undefined}
          poster={poster}
          controls={playing}
          playsInline
          className="block aspect-video h-auto w-full"
          aria-label={title}
        />
        {!playing && (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              requestAnimationFrame(() => ref.current?.play());
            }}
            data-cursor="Play"
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/35 transition-colors hover:bg-black/20"
          >
            <span className="flex size-24 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: `0 0 60px ${accent}66` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span className="label !text-paper">Watch the film · with sound</span>
          </button>
        )}
      </div>
      <p className="label mt-4">{title}</p>
    </section>
  );
}

/* ── Compare: drag between before and after ──────────────────────────────────── */

export function Compare({
  eyebrow,
  title,
  body,
  before,
  after,
  labels,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  before: Shot;
  after: Shot;
  labels: [string, string];
  accent: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const smooth = useSpring(pos, { stiffness: 300, damping: 34 });
  const clip = useTransform(smooth, (v) => `inset(0 0 0 ${v}%)`);
  const left = useTransform(smooth, (v) => `${v}%`);
  const inView = useInView(box, { once: true, margin: "0px 0px -30% 0px" });
  const dragging = useRef(false);

  // Sweep once on arrival so the reader sees it is interactive.
  useEffect(() => {
    if (!inView) return;
    const seq = [15, 85, 50];
    const timers = seq.map((v, i) => setTimeout(() => !dragging.current && pos.set(v), 300 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, [inView, pos]);

  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="shell py-32">
      <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
      <div
        ref={box}
        className="relative mt-14 cursor-ew-resize touch-none overflow-hidden rounded-[20px] ring-1 ring-white/10 select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        role="slider"
        aria-label={`${labels[0]} versus ${labels[1]}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 5));
          if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 5));
        }}
        data-cursor="Drag"
      >
        <Image src={before.src} alt={before.alt} width={before.width} height={before.height} sizes="(min-width: 1440px) 1344px, 100vw" className="block h-auto w-full" />
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover object-top" />
        </motion.div>
        <motion.div className="absolute inset-y-0 w-px bg-paper" style={{ left }}>
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-xl">
            ⟷
          </span>
        </motion.div>
        <span className="label absolute top-4 left-4 rounded-full bg-black/60 px-3 py-2 !text-paper backdrop-blur">{labels[0]}</span>
        <span className="label absolute top-4 right-4 rounded-full px-3 py-2 !text-ink" style={{ backgroundColor: accent }}>
          {labels[1]}
        </span>
      </div>
    </section>
  );
}

/* ── Breakpoints: one screen, re-flowing through device widths ───────────────── */

export function Breakpoints({
  eyebrow,
  title,
  body,
  shots,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  shots: (Shot & { viewport: number })[];
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  const max = shots[0].viewport;
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(shots.length - 1, Math.floor(v * shots.length * 0.999))));
  const s = shots[i];

  return (
    <section ref={ref} style={{ height: `${shots.length * 70 + 40}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell mb-10 flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
          <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tabular" style={{ color: accent }}>
            {s.viewport}
            <span className="label ml-2 align-middle">px</span>
          </p>
        </div>
        <div className="shell flex justify-center">
          <motion.div
            className="relative overflow-hidden rounded-[18px] bg-ink-2 ring-1 ring-white/12"
            animate={{ width: `${(s.viewport / max) * 100}%` }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ maxWidth: "min(100%, calc((100svh - 340px) * 1.7))" }}
          >
            <motion.div key={s.src} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 1280px) 1180px, 100vw" className="block h-auto max-h-[calc(100svh-340px)] w-full object-cover object-top" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Statement: words light up as you read them ──────────────────────────────── */

export function Statement({ text, accent }: { text: string; accent: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <section className="shell py-[22svh]">
      <p ref={ref} className="mx-auto max-w-5xl font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.08]">
        <span className="sr-only">{text.replace(/[*]/g, "")}</span>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent} />
        ))}
      </p>
    </section>
  );
}

function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: string }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const hot = word.startsWith("*");
  return (
    <motion.span aria-hidden style={{ opacity, color: hot ? accent : undefined }} className={hot ? "italic" : undefined}>
      {word.replace(/\*/g, "")}{" "}
    </motion.span>
  );
}

/* ── Duo: the same product on desk and in pocket ─────────────────────────────── */

export function Duo({
  eyebrow,
  title,
  body,
  desktop,
  phone,
  accent,
}: {
  eyebrow: string;
  title: string;
  body: string;
  desktop: Shot;
  phone: Shot;
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [160, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [8, -4]);
  return (
    <section ref={ref} className="shell py-32">
      <Heading eyebrow={eyebrow} title={title} body={body} accent={accent} />
      <div className="relative mt-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
          <Display shot={desktop} className="w-[88%]" />
        </motion.div>
        <motion.div className="absolute right-0 bottom-[8%] w-[22%] min-w-[140px]" style={{ y, rotate }}>
          <Phone shot={phone} sizes="300px" />
        </motion.div>
      </div>
    </section>
  );
}
