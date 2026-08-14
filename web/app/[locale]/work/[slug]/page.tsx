import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/mdx-content";
import { UiFrame } from "@/components/media/ui-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { SwapButton } from "@/components/ui/swap-button";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/mdx";
import {
  breadcrumbJsonLd,
  buildMetadata,
  caseStudyJsonLd,
} from "@/lib/seo";
import { getDictionary } from "@/messages";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllCaseStudySlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    image: study.ogImage ?? study.heroImage,
    type: "article",
    locale: raw,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dictionary.nav.work, path: "/work" },
              { name: study.title, path: `/work/${study.slug}` },
            ],
            locale,
          ),
          caseStudyJsonLd(
            {
              title: study.title,
              summary: study.summary,
              slug: study.slug,
              client: study.client,
              publishedAt: study.publishedAt,
              image: study.ogImage ?? study.heroImage,
            },
            locale,
          ),
        ]}
      />

      <article>
        <header className="border-b border-[var(--line)] bg-white">
          <div className="site-shell grid gap-12 section-y lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-base font-medium text-[var(--teal)]">
                {study.industry}
              </p>
              <h1 className="display-lg mt-5">{study.title}</h1>
              <p className="lede mt-8">{study.summary}</p>
              <p className="mt-6 text-sm text-[var(--ink-muted)]">
                {locale === "fr" ? "Client" : "Client"}:{" "}
                <span className="text-[var(--ink)]">{study.client}</span>
              </p>
            </div>
            <UiFrame
              src={study.heroImage}
              alt={`${study.title} product interface`}
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
        </header>

        <div className="site-shell grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
          <div className="prose-section">
            <MdxContent source={study.content} />
          </div>
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {dictionary.servicesPage.outcomes}
              </p>
              <dl className="mt-4 space-y-4">
                {study.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <dt className="text-sm text-[var(--ink-muted)]">
                      {outcome.label}
                    </dt>
                    <dd className="font-display text-3xl text-[var(--teal-deep)]">
                      {outcome.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--teal-soft)] p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal-deep)]">
                {dictionary.nav.services}
              </p>
              <ul className="mt-3 space-y-2 text-[var(--ink)]">
                {study.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            {study.geoFacts?.length ? (
              <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                  {dictionary.about.factsTitle}
                </p>
                <ul className="mt-3 space-y-3 text-sm text-[var(--ink-muted)]">
                  {study.geoFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <SwapButton
              locale={locale}
              href="/contact"
              label={dictionary.nav.startProject}
              variant="dark"
              className="w-full justify-center"
            />
          </aside>
        </div>
      </article>
    </>
  );
}
