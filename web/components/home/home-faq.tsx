import { Reveal } from "@/components/motion/reveal";

type FaqItem = { question: string; answer: string };

export function HomeFaq({
  eyebrow,
  titleBefore,
  titleAccent,
  lede,
  faqs,
}: {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  lede: string;
  faqs: FaqItem[];
}) {
  return (
    <section className="border-y border-[var(--line)] bg-white">
      <div className="site-shell section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal-deep)]">
              {eyebrow}
            </p>
            <h2 className="display-lg mt-4">
              {titleBefore}{" "}
              <span className="italic-accent text-[var(--teal-deep)]">{titleAccent}</span>
            </h2>
            <p className="lede mt-6">{lede}</p>
          </Reveal>

          <Reveal delay={0.06} className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--ink)]">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-transform duration-300 ease-out group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M10 4V16M4 10H16"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--ink-muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
