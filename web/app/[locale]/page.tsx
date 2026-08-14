import Image from "next/image";
import { HomeBlog } from "@/components/home/home-blog";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeHero } from "@/components/home/home-hero";
import { IntroReveal } from "@/components/home/intro-reveal";
import { Roadmap } from "@/components/home/roadmap";
import { LocaleLink } from "@/components/i18n/locale-link";
import { Reveal } from "@/components/motion/reveal";
import { SwapButton } from "@/components/ui/swap-button";
import { WorkFeatureCard } from "@/components/work/work-feature-card";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllBlogPosts, getFeaturedCaseStudies } from "@/lib/mdx";
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
  const posts = getAllBlogPosts().slice(0, 3);

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

          <div className="mt-16 flex flex-col gap-8">
            {featured.map((study, index) => (
              <div
                key={study.slug}
                className="sticky"
                style={{ top: `calc(6.5rem + ${index * 1.25}rem)`, zIndex: index + 1 }}
              >
                <Reveal delay={index * 0.05}>
                  <WorkFeatureCard
                    study={study}
                    index={index}
                    locale={locale}
                    approachLabel={t.approachLabel}
                    learnMoreLabel={t.learnMore}
                    priority={index === 0}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeBlog
        locale={locale}
        posts={posts}
        eyebrow={t.blogEyebrow}
        titleBefore={t.blogTitleBefore}
        titleAccent={t.blogTitleAccent}
        lede={t.blogLede}
        readLabel={t.blogReadMore}
        allArticlesLabel={t.allArticles}
      />

      <section className="site-shell section-y">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal-deep)]">
            {t.messageEyebrow}
          </p>
          <h2 className="display-lg">
            {t.messageTitleBefore}{" "}
            <span className="italic-accent text-[var(--teal-deep)]">{t.messageTitleAccent}</span>
          </h2>
          <p className="lede">{t.messageLede}</p>
          <SwapButton locale={locale} href="/contact" label={t.messageCta} variant="dark" />
        </Reveal>

        <Reveal delay={0.06} className="mt-14">
          <div className="grid gap-x-14 gap-y-10 rounded-[2rem] bg-[var(--teal-soft)] p-8 sm:grid-cols-2 sm:p-12">
            {t.messageFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center bg-[var(--teal)] text-[var(--teal-deep)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M 2 5 L 9 2 L 15 5 L 21.303 2.299 C 21.557 2.19 21.851 2.307 21.96 2.561 C 21.986 2.624 22 2.691 22 2.758 L 22 19 L 15 22 L 9 19 L 2.697 21.701 C 2.443 21.81 2.149 21.692 2.04 21.439 C 2.014 21.377 2 21.309 2 21.242 Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-lg font-semibold text-[var(--ink)]">{feature.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-muted)]">
                    {feature.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
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

      <HomeFaq
        eyebrow={t.faqEyebrow}
        titleBefore={t.faqTitleBefore}
        titleAccent={t.faqTitleAccent}
        lede={t.faqLede}
        faqs={t.faqs}
      />

      <HomeCta locale={locale} dictionary={dictionary} />
    </>
  );
}
