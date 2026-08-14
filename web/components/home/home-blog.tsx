import { BlogCard } from "@/components/blog/blog-card";
import { LocaleLink } from "@/components/i18n/locale-link";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
import type { BlogPostMeta } from "@/lib/mdx";

export function HomeBlog({
  locale,
  posts,
  eyebrow,
  titleBefore,
  titleAccent,
  lede,
  readLabel,
  allArticlesLabel,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  lede: string;
  readLabel: string;
  allArticlesLabel: string;
}) {
  if (!posts.length) return null;

  return (
    <section className="site-shell section-y">
      <Reveal className="flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--teal-deep)]">
            {eyebrow}
          </p>
          <h2 className="display-lg mt-4">
            {titleBefore}{" "}
            <span className="italic-accent text-[var(--teal-deep)]">{titleAccent}</span>
          </h2>
          <p className="lede mt-6">{lede}</p>
        </div>
        <LocaleLink
          locale={locale}
          href="/blog"
          className="shrink-0 text-lg font-semibold text-[var(--teal-deep)]"
        >
          {allArticlesLabel}
        </LocaleLink>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <BlogCard
              post={post}
              locale={locale}
              readLabel={readLabel}
              priority={index === 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
