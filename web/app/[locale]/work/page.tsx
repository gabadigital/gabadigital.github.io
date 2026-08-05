import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllCaseStudies } from "@/lib/mdx";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return buildMetadata({
    title: dictionary.work.metaTitle,
    description: dictionary.work.metaDescription,
    path: "/work",
    locale: raw,
  });
}

export default async function WorkIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const studies = getAllCaseStudies();
  const t = dictionary.work;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
            { name: dictionary.nav.work, path: "/work" },
          ],
          locale,
        )}
      />
      <section className="site-shell section-y">
        <h1 className="display-lg max-w-4xl">
          {t.titleBefore}{" "}
          <span className="italic-accent text-[var(--teal-deep)]">
            {t.titleAccent}
          </span>
        </h1>
        <p className="lede mt-8">{t.lede}</p>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {studies.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              locale={locale}
              readLabel={t.readCaseStudy}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
