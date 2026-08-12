"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion, useScroll } from "motion/react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { RevealWords } from "@/components/motion/word-reveal";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages";

/**
 * Closing CTA — heading reveals word by word on scroll (mindraft.framer.ai's
 * "Short intro" mechanic) and the single CTA button is replaced with two
 * outlined question-links, the concept from mindraft's hero ("Need expert
 * consultancy?" / "View case studies?").
 */
export function HomeCta({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const t = dictionary.home;
  const headingRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.3"],
  });

  return (
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

      <div className="site-shell relative section-y">
        <div ref={headingRef} className="max-w-3xl font-intro">
          {reduce ? (
            <>
              <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl">
                {t.ctaTitleBefore}
              </h2>
              <h2 className="mt-1 text-4xl leading-[1.05] font-semibold tracking-tight text-[#b8f0f3] italic sm:text-6xl">
                {t.ctaTitleAccent}
              </h2>
            </>
          ) : (
            <>
              <RevealWords
                progress={scrollYProgress}
                text={t.ctaTitleBefore}
                className="text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl"
              />
              <RevealWords
                progress={scrollYProgress}
                text={t.ctaTitleAccent}
                className="mt-1 text-4xl leading-[1.05] font-semibold tracking-tight text-[#b8f0f3] italic sm:text-6xl"
              />
            </>
          )}
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/75">{t.ctaLede}</p>
        </div>

        <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <LocaleLink
            locale={locale}
            href="/contact"
            className="group cursor-pointer rounded-2xl border border-white/25 p-6 transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
          >
            <p className="font-intro text-lg font-medium text-white">{t.ctaConsultLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{t.ctaConsultCopy}</p>
          </LocaleLink>
          <LocaleLink
            locale={locale}
            href="/work"
            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/25 p-6 transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
          >
            <p className="font-intro text-lg font-medium text-white">{t.ctaCaseStudiesLabel}</p>
            <span
              aria-hidden
              className="text-white/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
            >
              →
            </span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
