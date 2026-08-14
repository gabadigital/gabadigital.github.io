import Image from "next/image";
import { LocaleLink } from "@/components/i18n/locale-link";
import type { Locale } from "@/lib/i18n";
import type { BlogPostMeta } from "@/lib/mdx";

export function BlogCard({
  post,
  locale,
  readLabel,
  priority = false,
}: {
  post: Pick<BlogPostMeta, "title" | "slug" | "summary" | "coverImage" | "publishedAt">;
  locale: Locale;
  readLabel: string;
  priority?: boolean;
}) {
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { month: "short", year: "numeric" },
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white transition hover:border-[var(--teal)]">
      <LocaleLink
        locale={locale}
        href={`/blog/${post.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </LocaleLink>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <p className="text-sm font-medium text-[var(--teal-deep)]">{date}</p>
        <h3 className="font-display text-2xl leading-snug tracking-tight text-[var(--ink)]">
          <LocaleLink
            locale={locale}
            href={`/blog/${post.slug}`}
            className="transition-colors duration-200 hover:text-[var(--teal-deep)]"
          >
            {post.title}
          </LocaleLink>
        </h3>
        <p className="line-clamp-3 text-base leading-relaxed text-[var(--ink-muted)]">
          {post.summary}
        </p>
        <LocaleLink
          locale={locale}
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex cursor-pointer items-center gap-1 pt-2 text-sm font-semibold text-[var(--teal-deep)] transition-colors duration-200 hover:text-[var(--ink)]"
        >
          {readLabel}
        </LocaleLink>
      </div>
    </article>
  );
}
