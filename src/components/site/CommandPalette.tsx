"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/content";

type Item = { id: string; group: string; title: string; hint: string; run: () => void };

const OPEN_EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...projects.map((p) => ({
        id: p.slug,
        group: "Case studies",
        title: p.title,
        hint: p.tagline,
        run: go(`/work/${p.slug}`),
      })),
      { id: "home", group: "Pages", title: "Home", hint: "The pipeline", run: go("/") },
      { id: "process", group: "Pages", title: "Process", hint: "How I work", run: go("/#process") },
      { id: "inventions", group: "Pages", title: "Inventions", hint: "Patents, granted and pending", run: go("/inventions") },
      { id: "resume", group: "Pages", title: "Resume", hint: "Experience, with a PDF download", run: go("/resume") },
      { id: "evidence", group: "Pages", title: "Evidence", hint: "Every number and its source", run: go("/evidence") },
      { id: "about", group: "Pages", title: "About", hint: "Story and career", run: go("/about") },
      { id: "colophon", group: "Pages", title: "Colophon", hint: "How this site is built", run: go("/colophon") },
      {
        id: "email",
        group: "Actions",
        title: "Copy email",
        hint: profile.email,
        run: () => navigator.clipboard.writeText(profile.email),
      },
      ...profile.links.map((l) => ({
        id: l.label,
        group: "Actions",
        title: `Open ${l.label}`,
        hint: l.href.replace(/^https?:\/\//, ""),
        run: () => window.open(l.href, "_blank", "noopener"),
      })),
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.title} ${i.hint} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  let lastGroup = "";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-ink-2 shadow-2xl shadow-black/60"
            initial={{ y: 16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, filtered.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter") {
                  run(filtered[active]);
                }
              }}
              placeholder="Jump to a project, page, or action…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-[16px] outline-none placeholder:text-paper-dim"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={filtered[active] ? `palette-${filtered[active].id}` : undefined}
            />
            <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-paper-dim">No matches.</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={item.id} role="presentation">
                    {header && <div className="label px-3 pt-3 pb-2">{header}</div>}
                    <div
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(item)}
                      className={`flex cursor-pointer items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-[15px] ${
                        i === active ? "bg-ink-3 text-paper" : "text-paper/80"
                      }`}
                    >
                      <span>{item.title}</span>
                      <span className="truncate text-[13px] text-paper-dim">{item.hint}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 border-t border-line px-5 py-3 label">
              <span>↑↓ move</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
