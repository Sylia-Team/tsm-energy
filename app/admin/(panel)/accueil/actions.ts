"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { home } from "@/content/home";
import { writeOverride } from "@/lib/admin/content-store";
import { getHomeContent } from "@/lib/admin/content-read";
import { MediaUploadError, resolveMediaImage } from "@/lib/admin/media-store";
import { routes } from "@/lib/routes";
import type { ValueProposition } from "@/types/content";
import type { HomeContent } from "@/types/home";

const VALUE_ICONS: ReadonlyArray<ValueProposition["icon"]> = [
  "interlocutor",
  "trades",
  "local",
  "followup",
];

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function icon(
  formData: FormData,
  key: string,
  fallback: ValueProposition["icon"],
): ValueProposition["icon"] {
  const value = str(formData, key);
  return (VALUE_ICONS as readonly string[]).includes(value)
    ? (value as ValueProposition["icon"])
    : fallback;
}

export async function saveHomeAction(formData: FormData): Promise<void> {
  const current = getHomeContent();

  let heroImage = current.hero.image;
  let aboutImage = current.about.image;
  try {
    heroImage = await resolveMediaImage(
      formData,
      "hero.image",
      current.hero.image,
      home.hero.image,
    );
    aboutImage = await resolveMediaImage(
      formData,
      "about.image",
      current.about.image,
      home.about.image,
    );
  } catch (error) {
    if (error instanceof MediaUploadError) {
      redirect(`${routes.adminHome}?error=image`);
    }
    throw error;
  }

  const next: HomeContent = {
    hero: {
      eyebrow: str(formData, "hero.eyebrow"),
      title: str(formData, "hero.title"),
      description: str(formData, "hero.description"),
      image: heroImage,
      primaryCta: str(formData, "hero.primaryCta"),
      secondaryCta: str(formData, "hero.secondaryCta"),
    },
    value: {
      eyebrow: str(formData, "value.eyebrow"),
      title: str(formData, "value.title"),
      description: str(formData, "value.description"),
      items: current.value.items.map((item, index) => ({
        id: str(formData, `value.items.${index}.id`) || item.id,
        title: str(formData, `value.items.${index}.title`),
        description: str(formData, `value.items.${index}.description`),
        icon: icon(formData, `value.items.${index}.icon`, item.icon),
      })),
    },
    services: {
      eyebrow: str(formData, "services.eyebrow"),
      title: str(formData, "services.title"),
      description: str(formData, "services.description"),
      allLabel: str(formData, "services.allLabel"),
    },
    about: {
      eyebrow: str(formData, "about.eyebrow"),
      title: str(formData, "about.title"),
      paragraphs: str(formData, "about.paragraphs")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      image: aboutImage,
      linkLabel: str(formData, "about.linkLabel"),
    },
    realisations: {
      eyebrow: str(formData, "realisations.eyebrow"),
      title: str(formData, "realisations.title"),
      description: str(formData, "realisations.description"),
      allLabel: str(formData, "realisations.allLabel"),
    },
    stats: {
      eyebrow: str(formData, "stats.eyebrow"),
      title: str(formData, "stats.title"),
      items: current.stats.items.map((item, index) => ({
        id: str(formData, `stats.items.${index}.id`) || item.id,
        value: str(formData, `stats.items.${index}.value`),
        label: str(formData, `stats.items.${index}.label`),
      })),
    },
    certifications: {
      eyebrow: str(formData, "certifications.eyebrow"),
      title: str(formData, "certifications.title"),
      description: str(formData, "certifications.description"),
    },
    testimonials: {
      eyebrow: str(formData, "testimonials.eyebrow"),
      title: str(formData, "testimonials.title"),
      description: str(formData, "testimonials.description"),
      allLabel: str(formData, "testimonials.allLabel"),
    },
    zones: {
      eyebrow: str(formData, "zones.eyebrow"),
      title: str(formData, "zones.title"),
      description: str(formData, "zones.description"),
      allLabel: str(formData, "zones.allLabel"),
    },
    cta: {
      title: str(formData, "cta.title"),
      description: str(formData, "cta.description"),
      primaryLabel: str(formData, "cta.primaryLabel"),
      secondaryLabel: str(formData, "cta.secondaryLabel"),
    },
  };

  writeOverride<HomeContent>("home", next);

  revalidatePath(routes.home);
  revalidatePath(routes.adminHome);

  redirect(`${routes.adminHome}?saved=1`);
}
