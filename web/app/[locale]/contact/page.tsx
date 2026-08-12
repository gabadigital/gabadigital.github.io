import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return buildMetadata({
    title: dictionary.contact.metaTitle,
    description: dictionary.contact.metaDescription,
    path: "/contact",
    locale: raw,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const t = dictionary.contact;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dictionary.nav.contact, path: "/contact" },
            ],
            locale,
          ),
          faqJsonLd(t.faqs),
        ]}
      />
      <section className="site-shell grid gap-16 section-y lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <h1 className="display-lg">
            {t.titleBefore}{" "}
            <span className="italic-accent text-[var(--teal-deep)]">
              {t.titleAccent}
            </span>
          </h1>
          <p className="lede mt-8">{t.lede}</p>

          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.5rem]">
            <Image
              src="/studio/meeting.webp"
              alt={t.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <dl className="mt-12 space-y-6">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {t.email}
              </dt>
              <dd className="mt-1">
                <a
                  className="text-lg text-[var(--teal-deep)]"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {t.phone}
              </dt>
              <dd className="mt-2 space-y-1">
                {siteConfig.phones.map((phone) => (
                  <a key={phone.href} className="block" href={phone.href}>
                    {phone.label}: {phone.display}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {t.locations}
              </dt>
              <dd className="mt-2 space-y-1 text-[var(--ink-muted)]">
                {siteConfig.locations.map((location) => (
                  <p key={location.city}>
                    {location.area}, {location.city}, {location.region}
                  </p>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-12">
            <h2 className="font-display text-2xl">{t.faq}</h2>
            <div className="mt-4 space-y-4">
              {t.faqs.map((faq) => (
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
          </div>
        </div>

        <ContactForm labels={t.form} />
      </section>
    </>
  );
}
