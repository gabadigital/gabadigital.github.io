import { LocaleLink } from "@/components/i18n/locale-link";
import { defaultLocale } from "@/lib/i18n";
import { getDictionary } from "@/messages";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <section className="site-shell py-24 text-center">
      <h1 className="font-display text-5xl tracking-tight">
        {dictionary.notFound.title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-[var(--ink-muted)]">
        {dictionary.notFound.lede}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LocaleLink
          locale={defaultLocale}
          href="/"
          className="rounded-full bg-[var(--teal-deep)] px-6 py-3 font-semibold text-white"
        >
          {dictionary.notFound.home}
        </LocaleLink>
        <LocaleLink
          locale={defaultLocale}
          href="/work"
          className="rounded-full border border-[var(--line)] bg-white px-6 py-3 font-semibold"
        >
          {dictionary.nav.work}
        </LocaleLink>
      </div>
    </section>
  );
}
