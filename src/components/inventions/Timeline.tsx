"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/** The filing history as a rail that draws itself as the reader scrolls. */
export function Timeline({ steps }: { steps: { date: string; event: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-[7px] border-l border-line pl-10">
      <motion.span aria-hidden className="absolute top-0 -left-px h-full w-px origin-top bg-signal" style={{ scaleY: draw }} />
      {steps.map((s, i) => (
        <motion.li
          key={s.event}
          className="relative pb-10 last:pb-0"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
        >
          <span aria-hidden className="absolute top-1.5 -left-[47px] size-[13px] rounded-full border border-line-strong bg-ink" />
          <p className="label tabular">{s.date}</p>
          <p className="mt-1 text-[17px] text-paper/85">{s.event}</p>
        </motion.li>
      ))}
    </ol>
  );
}
