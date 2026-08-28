import type { MediaImage } from "@/types/media";
import type { ServiceBlockItem } from "@/types/content";

export type EntrepriseContent = {
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: MediaImage;
  storyTitle: string;
  story: string[];
  methodTitle: string;
  methodDescription: string;
  method: ServiceBlockItem[];
  certificationsEyebrow: string;
  certificationsTitle: string;
  certificationsDescription: string;
  zonesEyebrow: string;
  zonesTitle: string;
  zonesDescription: string;
  ctaTitle: string;
  ctaDescription: string;
};
