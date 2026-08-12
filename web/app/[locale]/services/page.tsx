import Image from "next/image";
import { notFound } from "next/navigation";
import { LocaleLink } from "@/components/i18n/locale-link";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllServices } from "@/lib/mdx";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { getDictionary, type ServiceSlug } from "@/messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return buildMetadata({
    title: dictionary.servicesPage.metaTitle,
    description: dictionary.servicesPage.metaDescription,
    path: "/services",
    locale: raw,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const services = getAllServices();
  const t = dictionary.servicesPage;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dictionary.nav.services, path: "/services" },
            ],
            locale,
          ),
          faqJsonLd(t.faqs),
        ]}
      />
      <section className="site-shell section-y">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="display-lg max-w-4xl">
              {t.titleBefore}{" "}
              <span className="italic-accent text-[var(--teal-deep)]">
                {t.titleAccent}
              </span>
            </h1>
            <p className="lede mt-8">{t.lede}</p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem]">
            <Image
              src="/studio/strategy.webp"
              alt={dictionary.contact.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service) => {
            const slug = service.slug as ServiceSlug;
            const localized = dictionary.services[slug];
            return (
              <li key={service.slug}>
                <LocaleLink
                  locale={locale}
                  href={`/services/${service.slug}`}
                  className="block h-full cursor-pointer rounded-[2rem] border border-[var(--line)] bg-white p-8 transition hover:border-[var(--teal)] sm:p-10"
                >
                  <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                    {localized?.label ?? service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                    {localized?.description ?? service.summary}
                  </p>
                  <p className="mt-8 text-base font-semibold text-[var(--teal-deep)]">
                    {t.learnMore}
                  </p>
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
