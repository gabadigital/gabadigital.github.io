import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SwapButton } from "@/components/ui/swap-button";
import { isLocale, type Locale } from "@/lib/i18n";
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
    title: dictionary.nav.about,
    description: dictionary.about.lede,
    path: "/about",
    locale: raw,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const t = dictionary.about;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dictionary.nav.about === "À propos" ? "Accueil" : "Home", path: "/" },
            { name: dictionary.nav.about, path: "/about" },
          ],
          locale,
        )}
      />
      <section className="relative min-h-[52vh] overflow-hidden">
        <Image
          src="/studio/studio.webp"
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,21,36,0.35),rgba(11,61,64,0.82))]" />
        <div className="site-shell relative flex min-h-[52vh] items-end pb-16 pt-32">
          <h1 className="display-lg max-w-4xl text-white">
            {t.titleBefore}{" "}
            <span className="italic-accent text-[#b8f0f3]">{t.titleAccent}</span>
          </h1>
        </div>
      </section>

      <section className="site-shell section-y">
        <p className="lede max-w-3xl">{t.lede}</p>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/studio/team.webp"
              alt={t.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/studio/workshop.webp"
              alt={dictionary.contact.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {t.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h2 className="font-display text-2xl">{pillar.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-[var(--ink-muted)]">
                {pillar.copy}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-16 max-w-3xl border-t border-[var(--line)] pt-10">
          <h2 className="font-display text-3xl">{t.factsTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
            {t.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <SwapButton
          locale={locale}
          href="/contact"
          label={t.cta}
          variant="dark"
          className="mt-10"
        />
      </section>
    </>
  );
}
