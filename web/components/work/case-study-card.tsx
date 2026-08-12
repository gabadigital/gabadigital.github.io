import { LocaleLink } from "@/components/i18n/locale-link";
import { UiFrame } from "@/components/media/ui-frame";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyMeta } from "@/lib/mdx";

type CaseStudyCardProps = {
  study: Pick<
    CaseStudyMeta,
    "title" | "slug" | "summary" | "industry" | "outcomes" | "services" | "heroImage"
  >;
  locale: Locale;
  readLabel: string;
  priority?: boolean;
};

export function CaseStudyCard({
  study,
  locale,
  readLabel,
  priority = false,
}: CaseStudyCardProps) {
  return (
    <article className="group">
      <LocaleLink
        locale={locale}
        href={`/work/${study.slug}`}
        className="block cursor-pointer transition-opacity duration-200 hover:opacity-95"
      >
        <UiFrame
          src={study.heroImage}
          alt={`${study.title} product interface`}
          priority={priority}
        />
      </LocaleLink>
      <div className="space-y-5 pt-8 sm:space-y-6 sm:pt-10">
        <p className="text-sm font-medium text-[var(--teal)]">{study.industry}</p>
        <h3 className="font-display text-3xl leading-[1.15] tracking-tight text-[var(--ink)] sm:text-4xl">
          <LocaleLink
            locale={locale}
            href={`/work/${study.slug}`}
            className="cursor-pointer transition-colors duration-200 hover:text-[var(--teal-deep)]"
          >
            {study.title}
          </LocaleLink>
        </h3>
        <p className="text-lg leading-relaxed text-[var(--ink-muted)]">
          {study.summary}
        </p>
        {study.outcomes?.length ? (
          <dl className="grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
            {study.outcomes.slice(0, 3).map((outcome) => (
              <div key={outcome.label}>
                <dt className="text-xs text-[var(--ink-muted)]">{outcome.label}</dt>
                <dd className="mt-2 font-display text-2xl tracking-tight text-[var(--teal-deep)] sm:text-3xl">
                  {outcome.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {study.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="rounded-full bg-[var(--teal-soft)] px-3 py-1.5 text-xs font-medium text-[var(--teal-deep)]"
            >
              {service}
            </span>
          ))}
        </div>
        <LocaleLink
          locale={locale}
          href={`/work/${study.slug}`}
          className="inline-flex cursor-pointer items-center gap-1 text-base font-semibold text-[var(--teal-deep)] transition-colors duration-200 hover:text-[var(--ink)]"
        >
          {readLabel}
          <span aria-hidden>→</span>
        </LocaleLink>
      </div>
    </article>
  );
}
