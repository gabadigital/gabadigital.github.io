import Image from "next/image";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/mdx-content";
import { JsonLd } from "@/components/seo/json-ld";
import { SwapButton } from "@/components/ui/swap-button";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/mdx";
import { blogPostJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/messages";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
    locale: raw,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dictionary.nav.blog, path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
            locale,
          ),
          blogPostJsonLd(
            {
              title: post.title,
              summary: post.summary,
              slug: post.slug,
              publishedAt: post.publishedAt,
              image: post.coverImage,
            },
            locale,
          ),
        ]}
      />

      <article>
        <header className="border-b border-[var(--line)] bg-white">
          <div className="site-shell grid gap-12 section-y lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-base font-medium text-[var(--teal)]">{date}</p>
              <h1 className="display-lg mt-5">{post.title}</h1>
              <p className="lede mt-8">{post.summary}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="site-shell grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
          <div className="prose-section">
            <MdxContent source={post.content} />
          </div>
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <SwapButton
              locale={locale}
              href="/contact"
              label={dictionary.nav.startProject}
              variant="dark"
              className="w-full justify-center"
            />
            <SwapButton
              locale={locale}
              href="/blog"
              label={dictionary.blog.backToBlog}
              variant="ghost"
              className="w-full justify-center"
            />
          </aside>
        </div>
      </article>
    </>
  );
}
