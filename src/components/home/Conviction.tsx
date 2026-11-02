import { Lines, Reveal } from "@/components/motion/Reveal";

const principles = [
  {
    title: "Design is the decision, not the deliverable.",
    body: "A Figma file is a hypothesis. I write down what I chose, what I rejected, and the evidence that tipped it.",
  },
  {
    title: "The gap between mock and production is my job.",
    body: "I hold builds to measured fidelity. Pixel diffs, not screenshots on a call, decide when a screen is done.",
  },
  {
    title: "Complex systems deserve calm interfaces.",
    body: "Irrigation runs on soil science, weather, radios, and hardware. The person using it should feel none of that weight.",
  },
  {
    title: "AI is a collaborator with a short leash.",
    body: "I build agents that plan, draft, and verify, with humans approving every change that matters and a trail behind each one.",
  },
  {
    title: "Honest numbers only.",
    body: "Every figure on this site has a source. Where a result was modelled rather than measured, I say so.",
  },
];

export function Conviction() {
  return (
    <section className="py-40" aria-labelledby="conviction-title">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label mb-8">03 — Conviction</p>
          <Lines
            text={"What I believe\nabout <em>the craft</em>."}
            className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] [&_em]:text-signal lg:sticky lg:top-32"
          />
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={0.04 * i}
              className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-10 last:border-b"
            >
              <span className="label pt-3 tabular transition-colors group-hover:!text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.05] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xl text-paper/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
