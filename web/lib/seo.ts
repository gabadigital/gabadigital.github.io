import type { Metadata } from "next";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  locale?: Locale;
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-default.svg",
  type = "website",
  locale = "en",
}: BuildMetadataInput): Metadata {
  const localizedPath = localePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(localePath("en", path)),
        fr: absoluteUrl(localePath("fr", path)),
        "x-default": absoluteUrl(localePath("en", path)),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: ogLocale,
      type,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
      creator: "@gabadigital",
    },
  };
}

export function organizationJsonLd(dictionary?: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    description: dictionary?.meta.description ?? siteConfig.description,
    sameAs: siteConfig.sameAs,
    contactPoint: siteConfig.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.display,
      contactType: "sales",
      areaServed: phone.label,
      availableLanguage: ["English", "French"],
    })),
    address: siteConfig.locations.map((location) => ({
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      streetAddress: location.area,
    })),
  };
}

export function websiteJsonLd(dictionary?: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: dictionary?.meta.description ?? siteConfig.description,
    inLanguage: ["en", "fr"],
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function caseStudyJsonLd(
  input: {
    title: string;
    summary: string;
    slug: string;
    client: string;
    publishedAt: string;
    image: string;
  },
  locale: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.summary,
    url: absoluteUrl(localePath(locale, `/work/${input.slug}`)),
    datePublished: input.publishedAt,
    image: absoluteUrl(input.image),
    about: input.client,
    inLanguage: locale,
    creator: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(
  input: {
    title: string;
    description: string;
    slug: string;
  },
  locale: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    description: input.description,
    url: absoluteUrl(localePath(locale, `/services/${input.slug}`)),
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: ["United Arab Emirates", "Nigeria", "Ghana"],
  };
}
