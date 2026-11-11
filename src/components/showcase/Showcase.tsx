import type { ShowcaseBlock } from "@/content/types";
import { FixLoop } from "./FixLoop";
import { Breakpoints, Compare, Duo, Exploded, Film, Scrub, Statement, Wall, Zoom } from "./Scenes";
import { Walk } from "./Walk";

/** Renders a project's scroll scenes in order. */
export function Showcase({ blocks, accent }: { blocks: ShowcaseBlock[]; accent: string }) {
  return (
    <div aria-label="Product showcase">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "phone-walk":
            return <Walk key={i} {...b} device="phone" accent={accent} />;
          case "desktop-walk":
            return <Walk key={i} {...b} device="desktop" accent={accent} />;
          case "zoom":
            return <Zoom key={i} {...b} accent={accent} />;
          case "exploded":
            return <Exploded key={i} {...b} accent={accent} />;
          case "wall":
            return <Wall key={i} {...b} accent={accent} />;
          case "scrub":
            return <Scrub key={i} {...b} accent={accent} />;
          case "film":
            return <Film key={i} {...b} accent={accent} />;
          case "compare":
            return <Compare key={i} {...b} accent={accent} />;
          case "breakpoints":
            return <Breakpoints key={i} {...b} accent={accent} />;
          case "statement":
            return <Statement key={i} text={b.text} accent={accent} />;
          case "duo":
            return <Duo key={i} {...b} accent={accent} />;
          case "fixloop":
            return <FixLoop key={i} {...b} accent={accent} />;
        }
      })}
    </div>
  );
}
