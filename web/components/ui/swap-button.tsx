import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath, type Locale } from "@/lib/i18n";

type Variant = "solid" | "outline" | "ghost" | "dark";

type SwapButtonProps = {
  label: string;
  href: string;
  locale?: Locale;
  variant?: Variant;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href">;

export const pillTone: Record<Variant, string> = {
  solid: "bg-white text-[var(--ink)] hover:bg-[#ebfeff]",
  outline: "border border-white/25 text-white hover:border-white/50",
  ghost: "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--teal)]",
  dark: "bg-[var(--teal-deep)] text-white hover:bg-[#0e4a4e]",
};

const iconTone: Record<Variant, string> = {
  solid: "bg-[var(--teal-deep)] text-white",
  outline: "bg-white/10 text-white",
  ghost: "bg-[var(--teal-soft)] text-[var(--teal-deep)]",
  dark: "bg-white text-[var(--teal-deep)]",
};

export function ButtonContent({ label, variant }: { label: string; variant: Variant }) {
  return (
    <>
      <span className="relative block h-[1.15em] overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${iconTone[variant]}`}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 15L15 5M15 5H7M15 5V13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

/** Pill CTA with a vertical text-swap reveal and a diagonally-shifting icon on hover. */
export function SwapButton({
  label,
  href,
  locale,
  variant = "solid",
  external = false,
  className = "",
  ...props
}: SwapButtonProps) {
  const resolvedHref = locale ? localePath(locale, href) : href;
  const classes = `group inline-flex cursor-pointer items-center gap-3 rounded-full py-2 pl-6 pr-2 text-base font-semibold transition-colors duration-200 ${pillTone[variant]} ${className}`;

  if (external) {
    return (
      <a href={resolvedHref} className={classes} target="_blank" rel="noreferrer">
        <ButtonContent label={label} variant={variant} />
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={classes} {...props}>
      <ButtonContent label={label} variant={variant} />
    </Link>
  );
}
