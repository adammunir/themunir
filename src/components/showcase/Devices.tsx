import Image from "next/image";
import type { ReactNode } from "react";
import type { Shot } from "@/content/types";

/**
 * A phone in the shape of a modern iPhone: titanium edge, black bezel,
 * dynamic island. Percent padding scales the bezel with the device width.
 */
export function Phone({
  shot,
  children,
  className = "",
  sizes = "400px",
  priority = false,
  ratio = "393/852",
  lock = false,
}: {
  /** Use `ratio` even when a shot is given, so a lineup of phones matches. */
  lock?: boolean;
  shot?: Shot;
  children?: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
}) {
  return (
    <div
      className={`relative rounded-[15%/7%] bg-[linear-gradient(145deg,#4a4a4f,#1b1b1e_35%,#2b2b2f_70%,#59595f)] p-[1.4%] shadow-[0_40px_120px_-20px_rgba(0,0,0,.8),0_0_0_1px_rgba(255,255,255,.06)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[13.6%/6.3%] bg-black p-[3%]">
        <div className="relative overflow-hidden rounded-[11.5%/5.3%] bg-ink-2" style={{ aspectRatio: shot && !lock ? `${shot.width}/${shot.height}` : ratio }}>
          {shot && (
            <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
          )}
          {children}
          <span aria-hidden className="absolute top-[1.6%] left-1/2 z-10 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

/** A thin-bezel display with a stand, in the spirit of a studio monitor. */
export function Display({
  shot,
  children,
  className = "",
  sizes = "(min-width: 1024px) 80vw, 100vw",
  stand = true,
  priority = false,
  ratio = "16/9",
}: {
  ratio?: string;
  shot?: Shot;
  children?: ReactNode;
  className?: string;
  sizes?: string;
  stand?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[1.4%/2.4%] bg-[linear-gradient(180deg,#3a3a3e,#1a1a1c)] p-[0.5%] shadow-[0_50px_140px_-30px_rgba(0,0,0,.85),0_0_0_1px_rgba(255,255,255,.06)]">
        <div className="relative overflow-hidden rounded-[1%/1.8%] bg-black p-[1.1%]">
          <div className="relative overflow-hidden bg-ink-2" style={{ aspectRatio: shot ? `${shot.width}/${shot.height}` : ratio }}>
            {shot && <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />}
            {children}
          </div>
        </div>
      </div>
      {stand && (
        <div aria-hidden className="mx-auto flex flex-col items-center">
          <div className="h-[clamp(1.5rem,5vw,4.5rem)] w-[16%] bg-[linear-gradient(90deg,#2a2a2d,#4b4b50_50%,#2a2a2d)] [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]" />
          <div className="h-2 w-[28%] rounded-b-md bg-[linear-gradient(180deg,#4b4b50,#232326)]" />
        </div>
      )}
    </div>
  );
}

/** Frameless screen with a hairline and soft shadow — for system frames and tablets. */
export function Sheet({ shot, className = "", sizes = "60vw" }: { shot: Shot; className?: string; sizes?: string }) {
  return (
    <div className={`overflow-hidden rounded-[14px] bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] ring-1 ring-white/8 ${className}`}>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
