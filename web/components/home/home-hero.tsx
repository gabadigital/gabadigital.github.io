import Image from "next/image";
import { LocationBadge } from "@/components/home/location-badge";
import { Reveal } from "@/components/motion/reveal";
import { SwapButton } from "@/components/ui/swap-button";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/messages";

export function HomeHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = dictionary.home;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0c1524_0%,#0b3d40_52%,#123047_100%)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(20,200,209,0.3), transparent 45%)",
        }}
      />

      <div className="site-shell relative grid min-h-[100svh] items-center gap-12 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28">
        <Reveal>
          <h1 className="display-xl text-white">
            {t.heroTitleBefore}{" "}
            <span className="italic-accent text-[#b8f0f3]">{t.heroTitleAccent}</span>
            <br />
            <span className="mt-2 block text-[0.72em] font-normal tracking-tight text-white/90">
              {t.heroTitleAfter}
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/72 sm:text-2xl">
            {t.heroLede}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <SwapButton locale={locale} href="/work" label={t.seeWork} variant="solid" />
            <SwapButton locale={locale} href="/contact" label={t.startProject} variant="outline" />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/hero/founder-portrait.webp"
                alt="Smiling Gabadigital team lead"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,20,32,0)_55%,rgba(6,12,20,0.55)_100%)]"
                aria-hidden
              />
            </div>
          </div>

          {siteConfig.locations.map((location, index) => (
            <LocationBadge
              key={location.city}
              city={location.city}
              prefix={t.heroBasedIn}
              delay={index * 0.6}
              className={
                [
                  "-left-4 top-8 sm:-left-8",
                  "-right-2 top-[46%] sm:-right-6",
                  "-left-2 bottom-8 sm:-left-6",
                ][index]
              }
            />
          ))}

          <p className="mt-4 text-sm text-white/45">{t.heroCaption}</p>
        </Reveal>
      </div>
    </section>
  );
}
