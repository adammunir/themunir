import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import type { Metric } from "@/content/types";

export function ProofBar({ metrics }: { metrics: Metric[] }) {
  return (
    <section aria-label="Proof" className="border-y border-line">
      <dl className="shell grid grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal
            key={m.label}
            delay={i * 0.08}
            className={`py-10 pr-6 ${i % 2 ? "pl-6 border-l border-line" : ""} ${i === 2 ? "lg:pl-6 lg:border-l lg:border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tabular">
              <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
            </dd>
            <dt className="mt-3 max-w-[16rem] text-[14px] text-paper-dim" title={m.source}>
              {m.href ? (
                <Link
                  href={m.href}
                  data-cursor="Patents"
                  data-cursor-icon="document"
                  className="group text-signal underline decoration-signal/40 decoration-1 underline-offset-[6px] transition-[color,text-decoration-color] hover:text-paper hover:decoration-signal"
                >
                  {m.label} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              ) : (
                m.label
              )}
            </dt>
          </Reveal>
        ))}
      </dl>
      <p className="shell border-t border-line py-4">
        <Link href="/evidence" className="label transition-colors hover:!text-signal">
          Every number on this site has a source. See them all →
        </Link>
      </p>
    </section>
  );
}
