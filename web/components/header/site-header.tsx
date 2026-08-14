"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { LocaleLink } from "@/components/i18n/locale-link";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { SwapButton } from "@/components/ui/swap-button";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyMeta } from "@/lib/mdx";
import { getPrimaryNav, getServiceNav, siteConfig } from "@/lib/site";
import type { Dictionary } from "@/messages";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  featuredWork: Pick<
    CaseStudyMeta,
    "title" | "slug" | "summary" | "industry"
  >[];
};

type Panel = "services" | "work" | null;

export function SiteHeader({
  locale,
  dictionary,
  featuredWork,
}: SiteHeaderProps) {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const servicesId = useId();
  const workId = useId();
  const primaryNav = getPrimaryNav(dictionary);
  const serviceNav = getServiceNav(dictionary);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPanel(null);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/70 bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-md">
      <div className="site-shell flex min-h-20 items-center justify-between gap-4 py-5 lg:min-h-24 lg:py-6">
        <LocaleLink
          locale={locale}
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => {
            setOpenPanel(null);
            setMobileOpen(false);
          }}
        >
          <Image
            src="/brand/logo.png"
            alt={siteConfig.name}
            width={846}
            height={302}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </LocaleLink>

        <nav
          ref={navRef}
          className="hidden items-center gap-1 lg:flex"
          aria-label={dictionary.nav.primary}
        >
          <MegaTrigger
            label={dictionary.nav.work}
            expanded={openPanel === "work"}
            controls={workId}
            onOpen={() => setOpenPanel("work")}
            onToggle={() =>
              setOpenPanel((current) => (current === "work" ? null : "work"))
            }
          />
          <MegaTrigger
            label={dictionary.nav.services}
            expanded={openPanel === "services"}
            controls={servicesId}
            onOpen={() => setOpenPanel("services")}
            onToggle={() =>
              setOpenPanel((current) =>
                current === "services" ? null : "services",
              )
            }
          />
          {primaryNav
            .filter((item) => item.href !== "/work" && item.href !== "/services")
            .map((item) => (
              <LocaleLink
                key={item.href}
                locale={locale}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ink-muted)] transition hover:bg-white hover:text-[var(--ink)]"
                onClick={() => setOpenPanel(null)}
              >
                {item.label}
              </LocaleLink>
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher locale={locale} label={dictionary.nav.language} />
          <SwapButton
            locale={locale}
            href="/contact"
            label={dictionary.nav.startProject}
            variant="dark"
          />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher locale={locale} label={dictionary.nav.language} />
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-white"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="sr-only">{dictionary.nav.toggleMenu}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span className="h-0.5 w-full bg-[var(--ink)]" />
              <span className="h-0.5 w-full bg-[var(--ink)]" />
              <span className="h-0.5 w-3 bg-[var(--ink)]" />
            </span>
          </button>
        </div>
      </div>

      {openPanel === "work" ? (
        <MegaPanel id={workId} labelledBy={dictionary.nav.work}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal)]">
                {dictionary.nav.featuredWork}
              </p>
              <p className="mt-3 max-w-sm text-[var(--ink-muted)]">
                {dictionary.nav.featuredWorkBlurb}
              </p>
              <LocaleLink
                locale={locale}
                href="/work"
                className="mt-6 inline-flex text-sm font-semibold text-[var(--teal-deep)]"
                onClick={() => setOpenPanel(null)}
              >
                {dictionary.nav.viewAllWork}
              </LocaleLink>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {featuredWork.map((study) => (
                <li key={study.slug}>
                  <LocaleLink
                    locale={locale}
                    href={`/work/${study.slug}`}
                    className="block cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-4 transition hover:border-[var(--teal)]"
                    onClick={() => setOpenPanel(null)}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--teal)]">
                      {study.industry}
                    </p>
                    <p className="mt-2 font-display text-lg leading-snug text-[var(--ink)]">
                      {study.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--ink-muted)]">
                      {study.summary}
                    </p>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </MegaPanel>
      ) : null}

      {openPanel === "services" ? (
        <MegaPanel id={servicesId} labelledBy={dictionary.nav.services}>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceNav.map((service) => (
              <LocaleLink
                key={service.href}
                locale={locale}
                href={service.href}
                className="cursor-pointer rounded-2xl border border-transparent p-4 transition hover:border-[var(--line)] hover:bg-white"
                onClick={() => setOpenPanel(null)}
              >
                <p className="font-semibold text-[var(--ink)]">{service.label}</p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {service.description}
                </p>
              </LocaleLink>
            ))}
          </div>
        </MegaPanel>
      ) : null}

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--paper)] lg:hidden"
        >
          <div className="site-shell flex max-h-[calc(100vh-4rem)] flex-col gap-6 overflow-y-auto py-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal)]">
                {dictionary.nav.work}
              </p>
              <ul className="mt-3 space-y-2">
                {featuredWork.map((study) => (
                  <li key={study.slug}>
                    <LocaleLink
                      locale={locale}
                      href={`/work/${study.slug}`}
                      className="block py-2 font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      {study.title}
                    </LocaleLink>
                  </li>
                ))}
                <li>
                  <LocaleLink
                    locale={locale}
                    href="/work"
                    className="block py-2 font-semibold text-[var(--teal-deep)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {dictionary.nav.allCaseStudies}
                  </LocaleLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal)]">
                {dictionary.nav.services}
              </p>
              <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
                {serviceNav.map((service) => (
                  <li key={service.href} className="break-inside-avoid">
                    <LocaleLink
                      locale={locale}
                      href={service.href}
                      className="block py-2 text-[var(--ink-muted)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 border-t border-[var(--line)] pt-4">
              <LocaleLink
                locale={locale}
                href="/about"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.about}
              </LocaleLink>
              <LocaleLink
                locale={locale}
                href="/contact"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.contact}
              </LocaleLink>
              <SwapButton
                locale={locale}
                href="/contact"
                label={dictionary.nav.startProject}
                variant="dark"
                className="mt-2 justify-center"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MegaTrigger({
  label,
  expanded,
  controls,
  onToggle,
  onOpen,
}: {
  label: string;
  expanded: boolean;
  controls: string;
  onToggle: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-[var(--ink-muted)] transition hover:bg-white hover:text-[var(--ink)]"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onToggle}
      onMouseEnter={onOpen}
      onFocus={onOpen}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
        <path
          d="M5 7.5L10 12.5L15 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function MegaPanel({
  id,
  labelledBy,
  children,
}: {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-label={labelledBy}
      className="hidden border-t border-[var(--line)] bg-[var(--paper)] lg:block"
    >
      <div className="site-shell py-8">{children}</div>
    </div>
  );
}
