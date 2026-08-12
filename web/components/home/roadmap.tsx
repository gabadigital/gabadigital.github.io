import { Reveal } from "@/components/motion/reveal";

/**
 * Four-step process timeline modeled on conceptzilla.com's "roadmap-layout":
 * a connecting line strung through evenly spaced steps, softened with
 * decorative glows.
 */
export function Roadmap({
  eyebrow,
  titleBefore,
  titleAccent,
  lede,
  steps,
}: {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  lede: string;
  steps: { title: string; copy: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--paper)]">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--teal)]/15 blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[var(--sand)]/60 blur-[110px]"
        aria-hidden
      />

      <div className="site-shell section-y relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display-lg mt-4 text-[var(--ink)]">
            {titleBefore}{" "}
            <span className="italic-accent text-[var(--teal-deep)]">{titleAccent}</span>
          </h2>
          <p className="lede mt-6">{lede}</p>
        </Reveal>

        <div className="relative mt-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-[7px] hidden h-px bg-[var(--line)] lg:block"
            aria-hidden
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <li className="relative border-l border-[var(--line)] pl-8 lg:border-0 lg:pl-0">
                  <span
                    className="absolute left-[-7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--teal-deep)] bg-[var(--paper)] lg:relative lg:left-0 lg:top-0 lg:mb-6 lg:block"
                    aria-hidden
                  />
                  <p className="font-intro-mono text-xs uppercase tracking-[0.2em] text-[var(--teal-deep)]">
                    Step 0{index + 1}
                  </p>
                  <h3 className="font-display mt-3 text-2xl text-[var(--ink)]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{step.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
