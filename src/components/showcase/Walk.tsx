"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { Shot } from "@/content/types";
import { Display, Phone } from "./Devices";

type Step = { shot: Shot; heading: string; body: string };

/**
 * Apple-style feature walk: the device pins in place while the story scrolls
 * past it. Each step wipes its screen up from below, and the device turns
 * slightly as the reader moves through the flow.
 */
export function Walk({
  eyebrow,
  title,
  steps,
  device,
  accent,
}: {
  eyebrow: string;
  title: string;
  steps: Step[];
  device: "phone" | "desktop";
  accent: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [active, setActive] = useState(0);
  const rotateY = useTransform(smooth, [0, 1], device === "phone" ? [-14, 14] : [-4, 4]);
  const rotateX = useTransform(smooth, [0, 0.5, 1], [6, 0, 6]);
  const glow = useTransform(smooth, [0, 1], [0.35, 0.7]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999))));
  });

  const isPhone = device === "phone";
  const step = steps[active];

  return (
    <section ref={ref} style={{ height: `${steps.length * 85 + 40}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: glow, background: `radial-gradient(50% 55% at ${isPhone ? "68%" : "50%"} 55%, ${accent}2e, transparent 70%)` }}
        />
        <div className={`shell grid w-full items-center gap-10 ${isPhone ? "lg:grid-cols-12" : ""}`}>
          {/* Copy */}
          <div className={isPhone ? "lg:col-span-5" : "mx-auto max-w-3xl text-center"}>
            <p className="label mb-5" style={{ color: accent }}>
              {eyebrow}
            </p>
            <h2 className={`font-display leading-[0.98] ${isPhone ? "text-[clamp(2.25rem,4vw,4rem)]" : "text-[clamp(2rem,3.4vw,3.5rem)]"}`}>
              {title}
            </h2>
            <div className={`relative mt-8 ${isPhone ? "min-h-[11rem]" : "min-h-[6.5rem]"}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[22px] font-medium">{step.heading}</p>
                  <p className={`mt-3 text-[17px] text-paper/65 ${isPhone ? "max-w-md" : "mx-auto max-w-2xl"}`}>{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className={`mt-8 flex gap-2 ${isPhone ? "" : "justify-center"}`} aria-label="Steps">
              {steps.map((s, i) => (
                <li key={s.heading} className="h-1 w-10 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full origin-left rounded-full"
                    style={{ backgroundColor: accent }}
                    animate={{ scaleX: i < active ? 1 : i === active ? 0.6 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* Device */}
          <div className={`flex justify-center [perspective:1600px] ${isPhone ? "lg:col-span-6 lg:col-start-7" : "mt-4"}`}>
            <motion.div
              style={{ rotateY, rotateX }}
              className={isPhone ? "w-[min(78vw,330px)] lg:w-[min(30vw,360px)]" : "w-[min(92vw,1180px,calc((100svh-330px)*1.7))]"}
            >
              {isPhone ? (
                <Phone ratio={`${steps[0].shot.width}/${steps[0].shot.height}`}>
                  <Screens steps={steps} active={active} sizes="360px" />
                </Phone>
              ) : (
                <Display stand={false} ratio={`${steps[0].shot.width}/${steps[0].shot.height}`}>
                  <Screens steps={steps} active={active} sizes="(min-width: 1024px) 1100px, 92vw" />
                </Display>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stacked screens; the active one wipes up over the last. All are mounted so swaps are instant. */
function Screens({ steps, active, sizes }: { steps: Step[]; active: number; sizes: string }) {
  return (
    <>
      {steps.map((s, i) => (
        <motion.div
          key={s.shot.src}
          className="absolute inset-0"
          initial={false}
          animate={{
            clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
            scale: i < active ? 0.96 : 1,
            opacity: i < active - 1 ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          style={{ zIndex: i }}
        >
          <Image src={s.shot.src} alt={s.shot.alt} fill sizes={sizes} className="object-cover object-top" priority={i === 0} />
        </motion.div>
      ))}
    </>
  );
}
