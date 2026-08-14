import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllBlogPosts } from "@/lib/mdx";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return buildMetadata({
    title: dictionary.blog.metaTitle,
    description: dictionary.blog.metaDescription,
    path: "/blog",
    locale: raw,
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const posts = getAllBlogPosts();
  const t = dictionary.blog;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
            { name: dictionary.nav.blog, path: "/blog" },
          ],
          locale,
        )}
      />
      <section className="site-shell section-y">
        <h1 className="display-lg max-w-4xl">
          {t.titleBefore}{" "}
          <span className="italic-accent text-[var(--teal-deep)]">{t.titleAccent}</span>
        </h1>
        <p className="lede mt-8">{t.lede}</p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readLabel={t.readMore}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
