"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Rebaseline } from "@/components/art/Rebaseline";
import { Reel } from "./Reel";
import type { Media as MediaT } from "@/content/types";

/** Image or silent looping video. Videos only play while on screen. */
export function Media({
  media,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  media: MediaT;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        priority={priority}
        className={`block h-auto w-full ${className}`}
      />
    );
  }
  if (media.kind === "reel") {
    return <Reel media={media} sizes={sizes} priority={priority} className={className} />;
  }
  if (media.kind === "art") {
    const Art = arts[media.id];
    return (
      <div className={className}>
        <Art />
      </div>
    );
  }
  return <Video media={media} className={className} />;
}

const arts = { rebaseline: Rebaseline };

function Video({ media, className }: { media: Extract<MediaT, { kind: "video" }>; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={media.src}
      poster={media.poster}
      width={media.width}
      height={media.height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      className={`block h-auto w-full ${className}`}
    />
  );
}
