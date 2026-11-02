"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { ViewTransition, useRef } from "react";
import { Media } from "@/components/case/Media";
import { Lines } from "@/components/motion/Reveal";
import type { Project } from "@/content/types";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const count = (n: number) => words[n] ?? String(n);

/**
 * Selected work as stations on one line. The spine draws with scroll; its tip
 * sits at the viewport's vertical center, and each station node ignites as the
 * tip passes it.
 */
export function Pipeline({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const tipTop = useTransform(draw, (v) => `${v * 100}%`);

  return (
    <section id="work" className="relative py-32" aria-labelledby="work-title">
      <div className="shell mb-24 grid gap-10 sm:grid-cols-12">
        <p className="label sm:col-span-3">01 — The pipeline</p>
        <div className="sm:col-span-9">
          <Lines
            text={`${count(projects.length)} products.\nOne line from research\nto <em>shipped</em> code.`}
            className="font-display text-title [&_em]:text-signal"
          />
          <p className="mt-8 max-w-2xl text-lede text-paper/70">
            Each station is a case study written for two readers: the one with sixty seconds, and the one who wants
            to see the decisions behind the pixels and the architecture behind the screens.
          </p>
        </div>
      </div>

      <div ref={ref} className="shell relative">
        {/* Spine */}
        <div aria-hidden className="absolute top-0 bottom-0 left-[calc(clamp(1.25rem,4vw,3rem)+7px)] w-px bg-line sm:left-[calc(clamp(1.25rem,4vw,3rem)+11px)]">
          <motion.div className="absolute inset-x-0 top-0 origin-top bg-signal" style={{ height: "100%", scaleY: draw }} />
          <motion.div
            className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_24px_6px_rgba(255,77,46,0.55)]"
            style={{ top: tipTop }}
          />
        </div>

        <ol className="space-y-40 sm:space-y-56">
          {projects.map((p, i) => (
            <Station key={p.slug} project={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Station({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "0px 0px -50% 0px" });
  const flip = index % 2 === 1;

  return (
    <li ref={ref} className="relative pl-10 sm:pl-16">
      <motion.span
        aria-hidden
        className="absolute top-2 left-0 flex size-[15px] items-center justify-center rounded-full border sm:size-[23px]"
        animate={{
          borderColor: lit ? p.accent : "rgba(237,234,228,.22)",
          backgroundColor: lit ? "#0a0a0b" : "#0a0a0b",
          boxShadow: lit ? `0 0 0 6px ${p.accent}22, 0 0 28px ${p.accent}88` : "0 0 0 0 transparent",
        }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="size-1.5 rounded-full sm:size-2"
          animate={{ backgroundColor: lit ? p.accent : "rgba(237,234,228,.22)", scale: lit ? 1 : 0.6 }}
        />
      </motion.span>

      <Link href={`/work/${p.slug}`} className="group block" data-cursor="Read">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className={`lg:col-span-4 ${flip ? "lg:order-2 lg:col-start-9" : ""}`}>
            <p className="label mb-6 flex gap-4">
              <span style={{ color: p.accent }}>Station {String(index + 1).padStart(2, "0")}</span>
              <span>{p.year}</span>
            </p>
            <h3 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.95]">
              <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                <span className="inline-block">{p.title}</span>
              </ViewTransition>
            </h3>
            <p className="mt-5 max-w-sm text-[17px] text-paper/70">{p.tagline}</p>

            <div className="mt-10 border-t border-line pt-5">
              <p className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none" style={{ color: p.accent }}>
                {p.headline.value}
              </p>
              <p className="mt-2 max-w-xs text-[14px] text-paper-dim">{p.headline.label}</p>
            </div>

            <p className="label mt-10 flex flex-wrap gap-x-4 gap-y-2" aria-label={`What I owned: ${p.owned.join(", ")}`}>
              {p.owned.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </p>
          </div>

          <div className={`lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
            <ViewTransition name={`cover-${p.slug}`} share="morph" default="none">
              <div className="relative overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-line" style={{ ["--accent" as string]: p.accent }}>
                <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]">
                  <Media media={p.cover} sizes="(min-width: 1024px) 66vw, 100vw" priority={index === 0} />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(120% 80% at 50% 120%, ${p.accent}33, transparent 60%)` }}
                />
              </div>
            </ViewTransition>
          </div>
        </div>
      </Link>
    </li>
  );
}
