import type { Dictionary, ServiceSlug } from "@/messages";

export const siteConfig = {
  name: "Gabadigital",
  legalName: "Gabadigital",
  tagline: "Creative work with cultural impact. Also a product studio.",
  description:
    "Gabadigital is a creative and product studio for brands across the UAE, Nigeria, and Ghana — strategy, design, apps, and growth that ship.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gabadigital.com",
  locale: "en_US",
  email: "hello@gabadigital.com",
  phones: [
    { label: "UAE", href: "tel:+971554415763", display: "+971-55-441-5763" },
    { label: "Nigeria", href: "tel:+2348113895488", display: "+234-811-389-5488" },
    { label: "Ghana", href: "tel:+233260947488", display: "+233-260-947-488" },
  ],
  locations: [
    {
      city: "Accra",
      region: "Ghana",
      area: "Serving West Africa remotely & on-site",
    },
    {
      city: "Lagos",
      region: "Nigeria",
      area: "Serving West Africa remotely & on-site",
    },
    {
      city: "Abu Dhabi",
      region: "United Arab Emirates",
      area: "Tourist Centre",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/gabadigitalHQ/",
    instagram: "https://www.instagram.com/gabadigital/",
    twitter: "https://twitter.com/gabadigital",
    linkedin: "https://www.linkedin.com/company/gabadigital/",
    dribbble: "https://www.dribbble.com/gabadigital/",
    medium: "https://medium.com/@gabadigitalhq/",
  },
  sameAs: [
    "https://www.facebook.com/gabadigitalHQ/",
    "https://www.instagram.com/gabadigital/",
    "https://twitter.com/gabadigital",
    "https://www.linkedin.com/company/gabadigital/",
    "https://www.dribbble.com/gabadigital/",
    "https://medium.com/@gabadigitalhq/",
  ],
} as const;

export const serviceSlugs: ServiceSlug[] = [
  "ui-ux-design",
  "web-app-development",
  "mobile-app-development",
  "ecommerce-development",
  "logo-branding",
  "seo",
  "social-media-management",
  "online-advertising",
  "copywriting",
  "graphic-design",
  "photography-videography",
];

export function getPrimaryNav(dictionary: Dictionary) {
  return [
    { label: dictionary.nav.work, href: "/work" },
    { label: dictionary.nav.services, href: "/services" },
    { label: dictionary.nav.about, href: "/about" },
    { label: dictionary.nav.contact, href: "/contact" },
  ] as const;
}

export function getServiceNav(dictionary: Dictionary) {
  return serviceSlugs.map((slug) => ({
    slug,
    label: dictionary.services[slug].label,
    href: `/services/${slug}`,
    description: dictionary.services[slug].description,
  }));
}
