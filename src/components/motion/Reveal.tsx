"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Fades and lifts its children once, when they enter the viewport.
 * Use `as="li"` inside a list so the list items stay direct children of it.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits text on explicit line breaks ("\n") and raises each line out of a mask.
 * Lines are authored, not measured, so the reveal never reflows on resize.
 */
export function Lines({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.07,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on entering the viewport. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  // An <em> may run across a line break; close and reopen it per line so each
  // line is valid HTML on its own and hydrates the same as it was rendered.
  const lines = text.split("\n").reduce<{ out: string[]; open: boolean }>(
    ({ out, open }, raw) => {
      const line = (open ? "<em>" : "") + raw;
      const stillOpen = (line.match(/<em>/g) ?? []).length > (line.match(/<\/em>/g) ?? []).length;
      return { out: [...out, stillOpen ? `${line}</em>` : line], open: stillOpen };
    },
    { out: [], open: false },
  ).out;
  const trigger = immediate
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className}>
      {/* aria-label is not allowed on a <p> or <div>, so the plain text is a screen-reader-only span instead. */}
      <span className="sr-only">{text.replace(/\n/g, " ").replace(/<[^>]+>/g, "")}</span>
      <motion.span className="block" initial="hidden" {...trigger} aria-hidden>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
                shown: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1.1, ease, delay: delay + i * stagger },
                },
              }}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
