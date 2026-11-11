"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { profile } from "@/content";
import { openPalette } from "./CommandPalette";

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Step out of the way while reading down; come back on any upward scroll.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  return (
    <motion.header
      data-print="hide"
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="shell flex h-16 items-center justify-between text-paper" aria-label="Primary">
        <Link href="/" className="flex items-baseline gap-2 text-[15px] tracking-tight" data-cursor="Home">
          <span className="font-medium">{profile.name}</span>
          <span className="label hidden sm:inline !text-paper/60">{profile.role}</span>
        </Link>
        <div className="flex items-center gap-6 text-[14px]">
          <Link href="/#work" className="hidden sm:inline hover:opacity-60 transition-opacity">Work</Link>
          <Link href="/#process" className="hidden sm:inline hover:opacity-60 transition-opacity">Process</Link>
          <Link href="/inventions" className="hidden sm:inline hover:opacity-60 transition-opacity">Inventions</Link>
          <Link href="/resume" className="hidden sm:inline hover:opacity-60 transition-opacity">Resume</Link>
          <Link href="/about" className="hidden sm:inline hover:opacity-60 transition-opacity">About</Link>
          <button
            type="button"
            onClick={openPalette}
            className="label !text-paper flex items-center gap-2 rounded-full border border-paper/30 px-3 py-2 hover:border-paper transition-colors"
          >
            <kbd className="font-mono">⌘K</kbd>
            <span className="sr-only">Open command menu</span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
