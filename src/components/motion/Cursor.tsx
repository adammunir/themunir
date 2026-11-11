"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A small signal dot that trails the pointer and swells over interactive
 * elements. Elements can set data-cursor="Label" to show a word inside it, and
 * data-cursor-icon="document" to show an icon above the word.
 * Mouse only; touch and reduced-motion users keep the system cursor alone.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);
  const [icon, setIcon] = useState<string | null>(null);
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setHot(!!el);
      setLabel(el?.dataset.cursor ?? null);
      setIcon(el?.dataset.cursorIcon ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  const lit = !!(label || icon);
  const size = icon ? 104 : label ? 88 : hot ? 40 : 10;
  return (
    <motion.div
      data-print="hide"
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center rounded-full"
      style={{ x, y, translateX: "-50%", translateY: "-50%", mixBlendMode: lit ? "normal" : "difference" }}
      animate={{ width: size, height: size, backgroundColor: lit ? "#ff4d2e" : "#edeae4", boxShadow: icon ? "0 0 40px rgba(255,77,46,.55)" : "0 0 0 rgba(0,0,0,0)" }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <div className="flex flex-col items-center gap-1">
        <AnimatePresence>{icon === "document" && <DocumentIcon key="doc" />}</AnimatePresence>
        {label && <span className="label !text-ink !text-[10px]">{label}</span>}
      </div>
    </motion.div>
  );
}

/** A page with a folded corner that writes its own lines as it appears. */
function DocumentIcon() {
  const line = (i: number, w: number) => (
    <motion.path
      d={`M7 ${11 + i * 3.2} h${w}`}
      stroke="#0a0a0b"
      strokeWidth={1.4}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: "easeOut" }}
    />
  );
  return (
    <motion.svg
      width="26"
      height="30"
      viewBox="0 0 24 28"
      fill="none"
      initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <path d="M4 2h11l5 5v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#edeae4" stroke="#0a0a0b" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M15 2v5h5" stroke="#0a0a0b" strokeWidth={1.4} strokeLinejoin="round" />
      {line(0, 10)}
      {line(1, 8)}
      {line(2, 10)}
      {line(3, 6)}
    </motion.svg>
  );
}
