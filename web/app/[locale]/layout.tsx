import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/header/site-header";
import { HtmlLang } from "@/components/i18n/html-lang";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getFeaturedCaseStudies } from "@/lib/mdx";
import { getDictionary } from "@/messages";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  const featuredWork = getFeaturedCaseStudies().map((study) => ({
    title: study.title,
    slug: study.slug,
    summary: study.summary,
    industry: study.industry,
  }));

  return (
    <>
      <HtmlLang locale={locale} />
      <JsonLd data={[organizationJsonLd(dictionary), websiteJsonLd(dictionary)]} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        {dictionary.nav.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        featuredWork={featuredWork}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
