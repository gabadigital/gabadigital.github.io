import { LocaleLink } from "@/components/i18n/locale-link";
import type { Locale } from "@/lib/i18n";

/**
 * Rounded-rect CTA with a trailing icon, shaped after mindraft.framer.ai's
 * "Book a Consultation" header button — but in the studio's own green.
 */
export function CtaButton({
  locale,
  href,
  label,
  className = "",
  onClick,
}: {
  locale: Locale;
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <LocaleLink
      locale={locale}
      href={href}
      onClick={onClick}
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-[var(--teal-deep)] py-3 pl-5 pr-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--ink)] ${className}`}
    >
      {label}
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path
          d="M4 12L12 4M12 4H5.5M12 4V10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </LocaleLink>
  );
}
