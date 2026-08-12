"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { RevealWords } from "@/components/motion/word-reveal";

/**
 * Pinned scroll-reveal section modeled on mindraft.framer.ai's "Short intro"
 * (framer-fcv5i5): a tall scroll track holds a sticky viewport while each
 * word of the paragraph sharpens into focus as the track is scrolled through.
 */
export function IntroReveal({ eyebrow, text }: { eyebrow: string; text: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Finish revealing at 70% through the pin, then hold the full sentence
  // visible for the remainder — matching mindraft's Short intro, where the
  // whole line is legible while still pinned rather than only at the exit.
  const revealProgress = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  if (reduce) {
    return (
      <section className="font-intro bg-white">
        <div className="site-shell section-y">
          <span className="eyebrow font-intro-mono">{eyebrow}</span>
          <p className="mt-8 max-w-4xl text-3xl leading-snug tracking-tight text-[var(--ink)] sm:text-5xl">
            {text}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={trackRef} className="relative h-[240vh] bg-white font-intro">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <span className="eyebrow font-intro-mono text-[var(--teal-deep)]">{eyebrow}</span>
        <RevealWords
          progress={revealProgress}
          text={text}
          className="mt-8 max-w-4xl text-center text-3xl leading-snug tracking-tight text-[var(--ink)] sm:text-5xl"
        />
      </div>
    </section>
  );
}
