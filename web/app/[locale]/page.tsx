import Image from "next/image";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { IntroReveal } from "@/components/home/intro-reveal";
import { Roadmap } from "@/components/home/roadmap";
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

      <IntroReveal eyebrow={t.introEyebrow} text={t.introText} />

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

      <Roadmap
        eyebrow={dictionary.roadmap.eyebrow}
        titleBefore={dictionary.roadmap.titleBefore}
        titleAccent={dictionary.roadmap.titleAccent}
        lede={dictionary.roadmap.lede}
        steps={dictionary.roadmap.steps}
      />

      <HomeCta locale={locale} dictionary={dictionary} />
    </>
  );
}
