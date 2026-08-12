"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Renders words whose opacity ramps from dim to fully visible as `progress`
 * (0-1) advances — the scroll-linked text-reveal mechanic from
 * mindraft.framer.ai's "Short intro" section. Callers own the scroll wiring
 * (pinned or in-view) and should pass a progress value that reaches 1 with
 * room to spare, so the full sentence is readable before the section ends.
 */
export function RevealWords({
  progress,
  text,
  className,
}: {
  progress: MotionValue<number>;
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          count={words.length}
          progress={progress}
        />
      ))}
    </p>
  );
}

function RevealWord({
  word,
  index,
  count,
  progress,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = Math.min(1, start + 1.2 / count);
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block will-change-[opacity]">
      {word}
    </motion.span>
  );
}
