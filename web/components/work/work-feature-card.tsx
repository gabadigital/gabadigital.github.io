import Image from "next/image";
import { SwapButton } from "@/components/ui/swap-button";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyMeta } from "@/lib/mdx";

type WorkFeatureCardProps = {
  study: Pick<CaseStudyMeta, "title" | "slug" | "summary" | "industry" | "heroImage">;
  index: number;
  locale: Locale;
  approachLabel: string;
  learnMoreLabel: string;
  priority?: boolean;
};

export function WorkFeatureCard({
  study,
  index,
  locale,
  approachLabel,
  learnMoreLabel,
  priority = false,
}: WorkFeatureCardProps) {
  return (
    <article className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_24px_70px_rgba(15,35,35,0.1)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--ink-muted)]">
            ({String(index + 1).padStart(2, "0")})
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
            {study.title}
          </h3>
          <p className="mt-2 text-lg text-[var(--ink-muted)]">{study.industry}</p>
        </div>
        <SwapButton
          locale={locale}
          href={`/work/${study.slug}`}
          label={learnMoreLabel}
          variant="ghost"
          className="shrink-0"
        />
      </div>

      <div className="mt-10 flex items-start gap-4 rounded-[1.5rem] bg-[var(--paper)] p-6 sm:p-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--teal-soft)] text-[var(--teal-deep)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M4 7L12 11L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 11V21" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <div>
          <h4 className="text-base font-semibold text-[var(--ink)]">{approachLabel}</h4>
          <p className="mt-2 text-base leading-relaxed text-[var(--ink-muted)]">{study.summary}</p>
        </div>
      </div>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem]">
        <Image
          src={study.heroImage}
          alt={`${study.title} product interface`}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover"
        />
      </div>
    </article>
  );
}
