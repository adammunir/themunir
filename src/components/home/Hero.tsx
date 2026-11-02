"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lines } from "@/components/motion/Reveal";
import { profile } from "@/content";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // three.js is decorative; load it once the page is interactive so it never
  // competes with hydration and the first paint of the headline.
  const [field, setField] = useState(false);
  useEffect(() => {
    const start = () => setField(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0" style={{ opacity: fieldOpacity }}>
        {field && <HeroField />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,transparent_45%,transparent_80%,var(--color-ink)_100%)]" />
      </motion.div>

      <motion.div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-12" style={{ y: textY }}>
        <motion.p
          className="label mb-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          Selected work · 2016 — 2026
        </motion.p>

        <Lines
          as="h1"
          text={profile.thesis}
          immediate
          delay={0.3}
          className="font-display text-[clamp(3rem,7.2vw,8.5rem)] leading-[0.92] tracking-[-0.01em] [&_em]:text-signal"
        />

        <motion.div
          className="mt-14 grid gap-8 border-t border-line pt-6 sm:grid-cols-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          <p className="max-w-xl text-[17px] leading-relaxed text-paper/80 sm:col-span-6">{profile.intro}</p>
          <dl className="grid grid-cols-2 gap-6 text-[14px] sm:col-span-4 sm:col-start-8">
            <div>
              <dt className="label mb-2">Now</dt>
              <dd>{profile.employer}</dd>
            </div>
            <div>
              <dt className="label mb-2">Based</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
          <a
            href="#work"
            className="label hidden items-end justify-end gap-2 !text-paper sm:col-span-2 sm:flex"
            data-cursor="Follow"
          >
            Follow the line
            <motion.span
              aria-hidden
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
