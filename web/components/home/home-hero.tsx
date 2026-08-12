import Image from "next/image";
import { LocaleLink } from "@/components/i18n/locale-link";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
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
            <LocaleLink
              locale={locale}
              href="/work"
              className="inline-flex cursor-pointer rounded-full bg-white px-8 py-4 text-base font-semibold text-[var(--ink)] transition-colors duration-200 hover:bg-[#ebfeff]"
            >
              {t.seeWork}
            </LocaleLink>
            <LocaleLink
              locale={locale}
              href="/contact"
              className="inline-flex cursor-pointer rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:border-white/50"
            >
              {t.startProject}
            </LocaleLink>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0f172a] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-3 text-[11px] text-white/50">
                retail · commerce console
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src="/work/retail-ui.webp"
                alt="Retail commerce product UI — catalog, metrics, and checkout console"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-white/45">{t.heroCaption}</p>
        </Reveal>
      </div>
    </section>
  );
}
