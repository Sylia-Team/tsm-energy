import type { MediaImage } from "@/types/media";

export const SERVICE_SLUGS = [
  "renovation-maison",
  "maconnerie",
  "isolation",
  "climatisation",
  "toiture",
  "plomberie",
  "electricite",
  "peinture",
  "extension-maison",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceBlockItem = {
  title: string;
  description: string;
};

export type ServiceSummary = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  excerpt: string;
  featured: boolean;
};

export type Service = ServiceSummary & {
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: MediaImage;
  };
  needTitle: string;
  need: string[];
  offeringsTitle: string;
  offerings: ServiceBlockItem[];
  methodTitle: string;
  method: ServiceBlockItem[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
};

export const ZONE_SLUGS = [
  "sanary-sur-mer",
  "six-fours-les-plages",
  "bandol",
  "toulon",
  "la-seyne-sur-mer",
] as const;

export type ZoneSlug = (typeof ZONE_SLUGS)[number];

export type ZoneSummary = {
  slug: ZoneSlug;
  name: string;
  department: "Var";
  excerpt: string;
};

export type Zone = ZoneSummary & {
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: MediaImage;
  };
  introTitle: string;
  intro: string[];
  surrounding: string;
  ctaTitle: string;
  ctaDescription: string;
};

export type Realisation = {
  slug: string;
  name: string;
  city: string;
  zoneSlug: ZoneSlug;
  serviceSlugs: ServiceSlug[];
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  context: string;
  problem: string;
  works: string[];
  trades: string[];
  result: string;
  image: MediaImage;
  gallery: MediaImage[];
  featured: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  city: string;
  project: string;
};

export type Certification = {
  id: string;
  name: string;
  description: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
};

export type ValueProposition = {
  id: string;
  title: string;
  description: string;
  icon: "interlocutor" | "trades" | "local" | "followup";
};
