import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/mdx-content";
import { JsonLd } from "@/components/seo/json-ld";
import { SwapButton } from "@/components/ui/swap-button";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/mdx";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { getDictionary, type ServiceSlug } from "@/messages";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllServiceSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const localized = dictionary.services[slug as ServiceSlug];
  return buildMetadata({
    title: localized?.label ?? service.title,
    description: localized?.description ?? service.summary,
    path: `/services/${service.slug}`,
    locale: raw,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const localized = dictionary.services[slug as ServiceSlug];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dictionary.nav.services, path: "/services" },
              {
                name: localized?.label ?? service.title,
                path: `/services/${service.slug}`,
              },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              title: localized?.label ?? service.title,
              description: localized?.description ?? service.description,
              slug: service.slug,
            },
            locale,
          ),
          faqJsonLd(service.faqs),
        ]}
      />

      <article className="site-shell grid gap-16 section-y lg:grid-cols-[1fr_280px] lg:gap-20">
        <div>
          <h1 className="display-lg">
            {localized?.label ?? service.title}
          </h1>
          <p className="lede mt-8">
            {localized?.description ?? service.summary}
          </p>
          <div className="prose-section mt-12">
            <MdxContent source={service.content} />
          </div>

          <section className="mt-12">
            <h2 className="font-display text-3xl">FAQ</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-[var(--line)] bg-white p-4"
                >
                  <summary className="cursor-pointer font-semibold">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-[var(--ink-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
              {dictionary.servicesPage.outcomes}
            </p>
            <ul className="mt-4 space-y-2 text-[var(--ink)]">
              {service.outcomes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <SwapButton
            locale={locale}
            href="/contact"
            label={dictionary.servicesPage.discuss}
            variant="dark"
            className="w-full justify-center"
          />
          <SwapButton
            locale={locale}
            href="/work"
            label={dictionary.servicesPage.relatedWork}
            variant="ghost"
            className="w-full justify-center"
          />
        </aside>
      </article>
    </>
  );
}
