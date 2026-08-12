import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const workDirectory = path.join(process.cwd(), "content/work");
const servicesDirectory = path.join(process.cwd(), "content/services");

export type Outcome = {
  label: string;
  value: string;
};

export type CaseStudyMeta = {
  title: string;
  slug: string;
  summary: string;
  client: string;
  industry: string;
  services: string[];
  outcomes: Outcome[];
  heroImage: string;
  ogImage?: string;
  publishedAt: string;
  featured?: boolean;
  geoFacts?: string[];
};

export type CaseStudy = CaseStudyMeta & {
  content: string;
};

export type ServiceMeta = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export type ServiceDoc = ServiceMeta & {
  content: string;
};

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getAllCaseStudies(): CaseStudy[] {
  return readMdxFiles(workDirectory)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(workDirectory, filename), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as CaseStudyMeta), content };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((study) => study.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return getAllCaseStudies().map((study) => study.slug);
}

export function getAllServices(): ServiceDoc[] {
  return readMdxFiles(servicesDirectory)
    .map((filename) => {
      const raw = fs.readFileSync(
        path.join(servicesDirectory, filename),
        "utf8",
      );
      const { data, content } = matter(raw);
      return { ...(data as ServiceMeta), content };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getServiceBySlug(slug: string): ServiceDoc | undefined {
  return getAllServices().find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return getAllServices().map((service) => service.slug);
}
