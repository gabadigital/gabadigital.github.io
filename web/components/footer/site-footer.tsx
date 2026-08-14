import Image from "next/image";
import { NewsletterForm } from "@/components/footer/newsletter-form";
import { LocaleLink } from "@/components/i18n/locale-link";
import type { Locale } from "@/lib/i18n";
import { getPrimaryNav, getServiceNav, siteConfig } from "@/lib/site";
import type { Dictionary } from "@/messages";

const socialLinks = [
  {
    name: "Facebook",
    href: siteConfig.social.facebook,
    path: "M14 8.5h2.5V5h-2.5c-2.21 0-4 1.79-4 4v2H8v3.5h2v6.5h3.5V14.5H16l.5-3.5h-3V9c0-.55.45-1 1-1z",
  },
  {
    name: "Instagram",
    href: siteConfig.social.instagram,
    path: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM16.75 6.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z",
  },
  {
    name: "LinkedIn",
    href: siteConfig.social.linkedin,
    path: "M6.94 8.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88zM5.25 10.25h3.38V19H5.25v-8.75zM11 10.25h3.24v1.2h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V19h-3.38v-4.6c0-1.1-.02-2.5-1.53-2.5-1.53 0-1.77 1.2-1.77 2.43V19H11v-8.75z",
  },
  {
    name: "Dribbble",
    href: siteConfig.social.dribbble,
    path: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm5.9 4.15a6.5 6.5 0 0 1 1.44 3.98c-.2-.04-2.24-.46-4.3-.2-.05-.1-.09-.22-.14-.33a17.6 17.6 0 0 0-.42-.94c2.28-.93 3.3-2.27 3.42-2.51zM12 5.55c1.5 0 2.87.55 3.92 1.46-.1.14-1.02 1.4-3.22 2.24-1-1.85-2.12-3.36-2.3-3.6.5-.07 1.03-.1 1.6-.1zm-2.7.5c.17.23 1.27 1.75 2.28 3.55-2.88.77-5.42.75-5.7.75a6.53 6.53 0 0 1 3.42-4.3zm-3.7 5.96v-.16c.27 0 3.32.04 6.4-.9.18.34.34.68.5 1.02-.08.02-.16.05-.24.08-3.19 1.03-4.9 3.86-5.04 4.1a6.47 6.47 0 0 1-1.62-4.14zm2.6 5.15c.12-.24 1.4-2.83 4.9-4.02.02 0 .03-.01.05-.01a26.4 26.4 0 0 1 1.4 5.24 6.5 6.5 0 0 1-6.35-1.21zm7.75.35a25.1 25.1 0 0 0-1.28-4.99c1.93-.3 3.62.2 3.82.26a6.53 6.53 0 0 1-2.54 4.73z",
  },
];

export function SiteFooter({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const primaryNav = getPrimaryNav(dictionary);
  const serviceNav = getServiceNav(dictionary);

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--teal-deep)] text-white">
      <div className="site-shell py-20 md:py-24">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <Image
            src="/brand/logo-light.png"
            alt={siteConfig.name}
            width={846}
            height={302}
            className="h-9 w-auto"
          />
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              {dictionary.footer.studio}
            </p>
            <ul className="mt-5 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <LocaleLink
                    className="text-lg text-white/85 hover:text-white"
                    locale={locale}
                    href={item.href}
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              {dictionary.footer.services}
            </p>
            <ul className="mt-5 space-y-3">
              {serviceNav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <LocaleLink
                    className="text-lg text-white/85 hover:text-white"
                    locale={locale}
                    href={item.href}
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              {dictionary.footer.contact}
            </p>
            <ul className="mt-5 space-y-3 text-lg text-white/85">
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>
                    {phone.label}: {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <NewsletterForm labels={dictionary.footer.newsletter} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-3 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {dictionary.footer.rights}
          </p>
          <p>{dictionary.footer.networks}</p>
        </div>
      </div>
    </footer>
  );
}
