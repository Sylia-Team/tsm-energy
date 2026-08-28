import type { MediaImage } from "@/types/media";
import type { Stat, ValueProposition } from "@/types/content";

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: MediaImage;
    primaryCta: string;
    secondaryCta: string;
  };
  value: {
    eyebrow: string;
    title: string;
    description: string;
    items: ValueProposition[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    allLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: MediaImage;
    linkLabel: string;
  };
  realisations: {
    eyebrow: string;
    title: string;
    description: string;
    allLabel: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    items: Stat[];
  };
  certifications: {
    eyebrow: string;
    title: string;
    description: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    allLabel: string;
  };
  zones: {
    eyebrow: string;
    title: string;
    description: string;
    allLabel: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};
