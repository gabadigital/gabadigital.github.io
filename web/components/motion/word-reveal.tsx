"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Renders words whose opacity/blur ramp from dim to sharp as `progress` (0-1)
 * advances — the scroll-linked text-reveal mechanic from mindraft.framer.ai's
 * "Short intro" section. Callers own the scroll wiring (pinned or in-view).
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
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const blur = useTransform(progress, [start, end], [6, 0]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.span
      style={{ opacity, filter }}
      className="mr-[0.28em] inline-block will-change-[opacity,filter]"
    >
      {word}
    </motion.span>
  );
}
