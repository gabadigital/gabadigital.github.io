import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { getAllCaseStudySlugs, getAllServiceSlugs } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/services", "/about", "/contact"];

  const staticRoutes = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(localePath(locale, path || "/")),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const workRoutes = locales.flatMap((locale) =>
    getAllCaseStudySlugs().map((slug) => ({
      url: absoluteUrl(localePath(locale, `/work/${slug}`)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    getAllServiceSlugs().map((slug) => ({
      url: absoluteUrl(localePath(locale, `/services/${slug}`)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...workRoutes, ...serviceRoutes];
}
