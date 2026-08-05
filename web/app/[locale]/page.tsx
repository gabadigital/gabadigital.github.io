import Image from "next/image";
import { HomeHero } from "@/components/home/home-hero";
import { LocaleLink } from "@/components/i18n/locale-link";
import { UiFrame } from "@/components/media/ui-frame";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFeaturedCaseStudies } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { getServiceNav, siteConfig } from "@/lib/site";
import { getDictionary } from "@/messages";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return buildMetadata({
    title: siteConfig.name,
    description: dictionary.meta.description,
    path: "/",
    image: "/og-default.svg",
    locale: raw,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const t = dictionary.home;
  const featured = getFeaturedCaseStudies();
  const serviceNav = getServiceNav(dictionary);

  return (
    <>
      <HomeHero locale={locale} dictionary={dictionary} />

      <section className="site-shell section-y">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="max-w-4xl">
            <h2 className="display-lg text-[var(--ink)]">
              {t.studioTitleBefore}{" "}
              <span className="italic-accent text-[var(--teal-deep)]">
                {t.studioTitleAccent}
              </span>
            </h2>
            <p className="lede mt-8">{t.studioLede}</p>
            <LocaleLink
              locale={locale}
              href="/about"
              className="mt-10 inline-flex cursor-pointer text-lg font-semibold text-[var(--teal-deep)] transition-colors duration-200 hover:text-[var(--ink)]"
            >
              {t.aboutLink}
            </LocaleLink>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/studio/team.webp"
                alt={dictionary.about.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { src: "/studio/studio.webp", alt: "Open creative studio workspace" },
            { src: "/studio/workshop.webp", alt: "Team workshop in a modern office" },
            { src: "/studio/meeting.webp", alt: "Client strategy conversation" },
          ].map((item, index) => (
            <Reveal key={item.src} delay={index * 0.04}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--ink-muted)]">{t.cultureCaption}</p>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            {
              src: "/work/retail-ui.webp",
              label: dictionary.services["ecommerce-development"].label,
              href: "/work/retail-commerce-replatform",
            },
            {
              src: "/work/fintech-ui.webp",
              label: dictionary.services["mobile-app-development"].label,
              href: "/work/fintech-onboarding-app",
            },
            {
              src: "/work/brand-ui.webp",
              label: dictionary.services["logo-branding"].label,
              href: "/work/brand-system-launch",
            },
          ].map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <LocaleLink
                locale={locale}
                href={item.href}
                className="group block cursor-pointer"
              >
                <UiFrame
                  src={item.src}
                  alt={item.label}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <p className="mt-4 text-lg font-medium text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--teal-deep)]">
                  {item.label} →
                </p>
              </LocaleLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="site-shell section-y">
          <Reveal className="flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="display-lg">
                {t.workTitleBefore}{" "}
                <span className="italic-accent text-[var(--teal-deep)]">
                  {t.workTitleAccent}
                </span>
              </h2>
            </div>
            <LocaleLink
              locale={locale}
              href="/work"
              className="shrink-0 text-lg font-semibold text-[var(--teal-deep)]"
            >
              {t.allCaseStudies}
            </LocaleLink>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {featured.map((study, index) => (
              <Reveal key={study.slug} delay={index * 0.05}>
                <CaseStudyCard
                  study={study}
                  locale={locale}
                  readLabel={dictionary.work.readCaseStudy}
                  priority={index === 0}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-y">
        <Reveal className="max-w-3xl">
          <h2 className="display-lg">
            {t.servicesTitleBefore}{" "}
            <span className="italic-accent text-[var(--teal-deep)]">
              {t.servicesTitleAccent}
            </span>
          </h2>
          <p className="lede mt-8">{t.servicesLede}</p>
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {serviceNav.slice(0, 6).map((service, index) => (
            <Reveal key={service.href} delay={index * 0.04}>
              <li>
                <LocaleLink
                  locale={locale}
                  href={service.href}
                  className="block h-full cursor-pointer rounded-[2rem] border border-[var(--line)] bg-white p-8 transition hover:border-[var(--teal)] sm:p-10"
                >
                  <p className="font-display text-3xl tracking-tight text-[var(--ink)]">
                    {service.label}
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                    {service.description}
                  </p>
                </LocaleLink>
              </li>
            </Reveal>
          ))}
        </ul>

        <LocaleLink
          locale={locale}
          href="/services"
          className="mt-12 inline-flex text-lg font-semibold text-[var(--teal-deep)]"
        >
          {t.exploreServices}
        </LocaleLink>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--line)]">
        <div className="absolute inset-0">
          <Image
            src="/studio/strategy.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--teal-deep)_88%,#041214)]" />
        </div>
        <div className="site-shell relative section-y flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="max-w-3xl text-white">
            <h2 className="display-lg text-white">
              {t.ctaTitleBefore}{" "}
              <span className="italic-accent text-[#b8f0f3]">
                {t.ctaTitleAccent}
              </span>
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/75">
              {t.ctaLede}
            </p>
          </div>
          <LocaleLink
            locale={locale}
            href="/contact"
            className="inline-flex cursor-pointer rounded-full bg-white px-8 py-4 text-base font-semibold text-[var(--ink)] transition-colors duration-200 hover:bg-[#ebfeff]"
          >
            {t.scheduleCall}
          </LocaleLink>
        </div>
      </section>
    </>
  );
}
