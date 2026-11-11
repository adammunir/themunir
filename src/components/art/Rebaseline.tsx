"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/*
 * Reconstructed from 11 monthly NPD decks (Nov 2025 – Sep 2026), simplified to
 * the primary release row. Values are months after Dec 2025.
 * Source: Toro.Pipeline docs/analysis/lynx-drive-timeline-data-sources.md, tools/lynx_series.json.
 */
const meetings = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const baseline = [0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3];
const forecast = [0, 0, 2, 3, 6, 7, 7, 7, 7, 9, 10];
const yLabels = ["Dec ’25", "", "Feb", "", "Apr", "", "Jun", "", "Aug", "", "Oct ’26"];

const W = 1600;
const H = 900;
const L = 170;
const R = 1300;
const T = 150;
const B = 760;
const x = (i: number) => L + (i / (meetings.length - 1)) * (R - L);
const y = (m: number) => B - (m / 10) * (B - T);

const step = (vals: number[]) =>
  vals.map((v, i) => (i === 0 ? `M ${x(i)} ${y(v)}` : `H ${x(i)} V ${y(v)}`)).join(" ");
const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"} ${x(i)} ${y(v)}`).join(" ");

export function Rebaseline() {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  // Redraw on a loop while the chart is on screen, so it reads as a live cover.
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!on || reduce) return;
    const t = setInterval(() => setCycle((c) => c + 1), 9000);
    return () => clearInterval(t);
  }, [on, reduce]);
  const draw = (delay: number, duration = 1.6) => ({
    initial: { pathLength: reduce ? 1 : 0 },
    animate: on ? { pathLength: 1 } : {},
    transition: { duration: reduce ? 0 : duration, ease: [0.65, 0, 0.35, 1] as const, delay: reduce ? 0 : delay },
  });
  const fade = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0 },
    animate: on ? { opacity: 1 } : {},
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay },
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Chart: a testing milestone committed for December 2025 was rebaselined to January and then March 2026, while the forecast drifted to October 2026 — about eleven months of real slip, of which each monthly deck showed only the gap against the latest baseline."
    >
      <defs>
        <linearGradient id="rb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141416" />
          <stop offset="1" stopColor="#0c0c0d" />
        </linearGradient>
        <linearGradient id="rb-slip" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff4d2e" stopOpacity="0" />
          <stop offset="1" stopColor="#ff4d2e" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#rb-bg)" />

      <text x={L} y={84} fill="#8c8a85" fontSize={18} fontFamily="var(--font-geist-mono)" letterSpacing="2">
        TESTING COMPLETION · COMMITTED DATE, BY MONTHLY REVIEW
      </text>

      {/* Grid */}
      {yLabels.map((label, m) => (
        <g key={m}>
          <line x1={L} x2={R} y1={y(m)} y2={y(m)} stroke="rgba(237,234,228,.06)" />
          {label && (
            <text x={L - 24} y={y(m) + 6} textAnchor="end" fill="#8c8a85" fontSize={17} fontFamily="var(--font-geist-mono)">
              {label}
            </text>
          )}
        </g>
      ))}
      {meetings.map((m, i) => (
        <text key={m} x={x(i)} y={B + 44} textAnchor="middle" fill="#8c8a85" fontSize={17} fontFamily="var(--font-geist-mono)">
          {m}
        </text>
      ))}

      <AnimatePresence initial={false}>
      <motion.g key={cycle} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      {/* Playhead: sweeps the reviews as the forecast draws */}
      {!reduce && (
        <motion.g
          initial={{ x: 0, opacity: 0 }}
          animate={on ? { x: R - L, opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 2, ease: [0.65, 0, 0.35, 1], delay: 0.9, opacity: { duration: 2, times: [0, 0.1, 0.85, 1], delay: 0.9 } }}
        >
          <line x1={L} x2={L} y1={T - 30} y2={B} stroke="#ff4d2e" strokeOpacity={0.5} strokeWidth={1.5} />
          <circle cx={L} cy={T - 30} r={5} fill="#ff4d2e" />
        </motion.g>
      )}
      {/* Area between the original commitment and the forecast: the real slip */}
      <motion.path
        d={`${line(forecast)} L ${x(10)} ${y(0)} L ${x(0)} ${y(0)} Z`}
        fill="url(#rb-slip)"
        {...fade(1.8)}
      />

      {/* Original commitment */}
      <motion.path d={`M ${L} ${y(0)} H ${R}`} stroke="#edeae4" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" fill="none" {...draw(0.1, 1.2)} />
      {/* Plan of record, moved twice */}
      <motion.path d={step(baseline)} stroke="#edeae4" strokeOpacity={0.75} strokeWidth={3} fill="none" {...draw(0.5)} />
      {/* Forecast */}
      <motion.path d={line(forecast)} stroke="#ff4d2e" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" fill="none" {...draw(0.9, 2)} />

      {[2, 4].map((i, k) => (
        <motion.g key={i} {...fade(1.4 + k * 0.25)}>
          <circle cx={x(i)} cy={y(baseline[i])} r={9} fill="#0c0c0d" stroke="#edeae4" strokeWidth={3} />
          <text x={x(i) + 18} y={y(baseline[i]) + 34} fill="#edeae4" fontSize={18} fontFamily="var(--font-geist-mono)">
            REBASELINED
          </text>
        </motion.g>
      ))}
      <motion.circle cx={x(10)} cy={y(10)} r={10} fill="#ff4d2e" {...fade(2.8)} style={{ filter: "drop-shadow(0 0 14px #ff4d2e)" }} />

      {/* Brackets */}
      <motion.g {...fade(2.9)} fontFamily="var(--font-geist)">
        <path d={`M ${R + 40} ${y(3)} h 14 V ${y(10)} h -14`} stroke="#edeae4" strokeOpacity={0.6} strokeWidth={2} fill="none" />
        <text x={R + 72} y={(y(3) + y(10)) / 2 - 4} fill="#edeae4" fontSize={22}>What each deck</text>
        <text x={R + 72} y={(y(3) + y(10)) / 2 + 24} fill="#edeae4" fontSize={22}>reported</text>
        <path d={`M ${R + 40} ${y(0) + 4} h 34 V ${y(10)} h -10`} stroke="#ff4d2e" strokeWidth={2} fill="none" />
        <text x={R + 88} y={y(1.4)} fill="#ff4d2e" fontSize={44} fontFamily="var(--font-instrument)">~11 months</text>
        <text x={R + 88} y={y(1.4) + 30} fill="#ff4d2e" fontSize={20}>actual slip</text>
      </motion.g>
      </motion.g>
      </AnimatePresence>

      <motion.g {...fade(0.2)} fontFamily="var(--font-geist)" fontSize={18}>
        <line x1={L} x2={L + 36} y1={H - 52} y2={H - 52} stroke="#edeae4" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="2 8" />
        <text x={L + 48} y={H - 46} fill="#8c8a85">Original commitment</text>
        <line x1={L + 280} x2={L + 316} y1={H - 52} y2={H - 52} stroke="#edeae4" strokeOpacity={0.75} strokeWidth={3} />
        <text x={L + 328} y={H - 46} fill="#8c8a85">Plan of record</text>
        <line x1={L + 520} x2={L + 556} y1={H - 52} y2={H - 52} stroke="#ff4d2e" strokeWidth={5} />
        <text x={L + 568} y={H - 46} fill="#8c8a85">Forecast</text>
      </motion.g>
    </svg>
  );
}
