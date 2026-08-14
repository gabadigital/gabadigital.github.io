"use client";

import { motion, useReducedMotion } from "motion/react";

export function LocationBadge({
  city,
  prefix,
  className = "",
  delay = 0,
}: {
  city: string;
  prefix: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute z-10 flex items-center gap-2 rounded-full border border-white/15 bg-[#0f1f2e]/80 py-2 pl-2.5 pr-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
      viewport={{ once: true }}
      transition={
        reduce
          ? { duration: 0.4, delay }
          : {
              opacity: { duration: 0.4, delay },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7be7c7] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7be7c7]" />
      </span>
      <span className="whitespace-nowrap text-xs font-medium text-white/90">
        {prefix} <span className="font-semibold">{city}</span>
      </span>
    </motion.div>
  );
}
