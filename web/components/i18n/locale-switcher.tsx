"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, stripLocale, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() || "/";
  const bare = stripLocale(pathname);

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-white p-1 text-xs font-semibold uppercase tracking-wide">
      <span className="sr-only">{label}</span>
      {locales.map((code) => {
        const href = `/${code}${bare === "/" ? "" : bare}`;
        const active = code === locale;
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code}
            className={
              active
                ? "rounded-full bg-[var(--teal-deep)] px-2.5 py-1 text-white"
                : "rounded-full px-2.5 py-1 text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
            }
            aria-current={active ? "true" : undefined}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
