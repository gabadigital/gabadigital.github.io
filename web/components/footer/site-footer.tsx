import { LocaleLink } from "@/components/i18n/locale-link";
import type { Locale } from "@/lib/i18n";
import { getPrimaryNav, getServiceNav, siteConfig } from "@/lib/site";
import type { Dictionary } from "@/messages";

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
      <div className="site-shell grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:py-24">
        <div>
          <p className="font-display text-4xl tracking-tight">{siteConfig.name}</p>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/75">
            {dictionary.meta.tagline}
          </p>
          <p className="mt-6 text-sm text-white/60">{dictionary.footer.networks}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {dictionary.footer.studio}
          </p>
          <ul className="mt-4 space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <LocaleLink
                  className="text-white/85 hover:text-white"
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
          <ul className="mt-4 space-y-2">
            {serviceNav.slice(0, 6).map((item) => (
              <li key={item.href}>
                <LocaleLink
                  className="text-white/85 hover:text-white"
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
          <ul className="mt-4 space-y-2 text-white/85">
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
      </div>

      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-3 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {dictionary.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.dribbble} target="_blank" rel="noreferrer">
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
