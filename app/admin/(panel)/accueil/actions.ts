"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { getHomeContent } from "@/lib/admin/content-read";
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

function num(formData: FormData, key: string, fallback: number): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) && value > 0 ? value : fallback;
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

  const next: HomeContent = {
    hero: {
      eyebrow: str(formData, "hero.eyebrow"),
      title: str(formData, "hero.title"),
      description: str(formData, "hero.description"),
      image: {
        src: str(formData, "hero.image.src"),
        alt: str(formData, "hero.image.alt"),
        width: num(formData, "hero.image.width", current.hero.image.width),
        height: num(formData, "hero.image.height", current.hero.image.height),
      },
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
      image: {
        src: str(formData, "about.image.src"),
        alt: str(formData, "about.image.alt"),
        width: num(formData, "about.image.width", current.about.image.width),
        height: num(formData, "about.image.height", current.about.image.height),
      },
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
