"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ArchEdge, ArchNode } from "@/content/types";

const CELL_W = 250;
const CELL_H = 130;
const NODE_W = 200;
const NODE_H = 68;
const PAD = 24;

const tones: Record<NonNullable<ArchNode["tone"]>, { stroke: string; tag: string }> = {
  client: { stroke: "rgba(237,234,228,.55)", tag: "Client" },
  service: { stroke: "rgba(237,234,228,.35)", tag: "Service" },
  data: { stroke: "rgba(140,138,133,.6)", tag: "Data" },
  external: { stroke: "rgba(140,138,133,.35)", tag: "External" },
  ai: { stroke: "#ff4d2e", tag: "AI" },
};

const center = (n: ArchNode) => ({ x: PAD + n.col * CELL_W + NODE_W / 2, y: PAD + n.row * CELL_H + NODE_H / 2 });

/** Exit/enter on the facing sides of each box, joined by a smooth S-curve. */
function edgePath(a: ArchNode, b: ArchNode) {
  const p = center(a);
  const q = center(b);
  if (a.row === b.row || Math.abs(q.x - p.x) > Math.abs(q.y - p.y) * 1.2) {
    const dir = Math.sign(q.x - p.x) || 1;
    const x1 = p.x + (dir * NODE_W) / 2;
    const x2 = q.x - (dir * NODE_W) / 2;
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${x2} ${q.y}`;
  }
  const dir = Math.sign(q.y - p.y) || 1;
  const y1 = p.y + (dir * NODE_H) / 2;
  const y2 = q.y - (dir * NODE_H) / 2;
  const my = (y1 + y2) / 2;
  return `M ${p.x} ${y1} C ${p.x} ${my}, ${q.x} ${my}, ${q.x} ${y2}`;
}

export function ArchDiagram({ nodes, edges, accent }: { nodes: ArchNode[]; edges: ArchEdge[]; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const w = PAD * 2 + (cols - 1) * CELL_W + NODE_W;
  const h = PAD * 2 + (rows - 1) * CELL_H + NODE_H;
  const nodeDelay = (i: number) => (reduce ? 0 : 0.12 * i);
  const edgeStart = reduce ? 0 : 0.12 * nodes.length + 0.2;

  return (
    <div ref={ref} className="overflow-x-auto rounded-[20px] border border-line bg-ink-2/60 p-4 sm:p-8" data-lenis-prevent-touch>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mx-auto block h-auto w-full min-w-[640px]"
        role="img"
        aria-label={`Architecture: ${edges.map((e) => `${byId[e.from].label} to ${byId[e.to].label}`).join("; ")}`}
      >
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(237,234,228,.06)" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill="url(#dots)" />

        {edges.map((e, i) => {
          const d = edgePath(byId[e.from], byId[e.to]);
          return (
            <g key={`${e.from}-${e.to}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(237,234,228,.28)"
                strokeWidth={1.25}
                initial={{ pathLength: 0 }}
                animate={shown ? { pathLength: 1 } : {}}
                transition={{ duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1], delay: edgeStart + i * 0.08 }}
              />
              {shown && !reduce && (
                <circle r={3.5} fill={accent} style={{ filter: `drop-shadow(0 0 6px ${accent})` }}>
                  <animateMotion
                    dur={`${2.4 + (i % 3) * 0.5}s`}
                    begin={`${edgeStart + 0.9 + i * 0.25}s`}
                    repeatCount="indefinite"
                    path={d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.65 0 0.35 1"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const x = PAD + n.col * CELL_W;
          const y = PAD + n.row * CELL_H;
          const tone = tones[n.tone ?? "service"];
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={shown ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: nodeDelay(i) }}
            >
              <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={12} fill="#121214" stroke={n.tone === "ai" ? accent : tone.stroke} strokeWidth={1} />
              <text x={x + 14} y={y + 20} fill="#8c8a85" fontSize={9} fontFamily="var(--font-geist-mono)" letterSpacing="0.08em">
                {tone.tag.toUpperCase()}
              </text>
              <text x={x + 14} y={y + 40} fill="#edeae4" fontSize={14} fontWeight={500} fontFamily="var(--font-geist)">
                {n.label}
              </text>
              {n.sub && (
                <text x={x + 14} y={y + 57} fill="#8c8a85" fontSize={11} fontFamily="var(--font-geist)">
                  {n.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
