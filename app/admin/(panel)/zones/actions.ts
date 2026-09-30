"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zones } from "@/content/zones";
import { readOverride, writeOverride } from "@/lib/admin/content-store";
import { getZoneContent } from "@/lib/admin/content-read";
import { MediaUploadError, resolveMediaImage } from "@/lib/admin/media-store";
import { isZoneSlug } from "@/lib/content";
import { routes } from "@/lib/routes";
import type { Zone, ZoneSlug } from "@/types/content";
import { paragraphs, str } from "../_components/form-utils";

type ZoneOverrides = Partial<Record<ZoneSlug, Zone>>;

export async function saveZoneAction(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");

  if (!isZoneSlug(slug)) {
    redirect(routes.adminZones);
  }

  const current = getZoneContent(slug);

  if (!current) {
    redirect(routes.adminZones);
  }

  const fallbackImage =
    zones.find((item) => item.slug === slug)?.hero.image ?? current.hero.image;

  let heroImage = current.hero.image;
  try {
    heroImage = await resolveMediaImage(
      formData,
      "hero.image",
      current.hero.image,
      fallbackImage,
    );
  } catch (error) {
    if (error instanceof MediaUploadError) {
      redirect(`${routes.adminZone(slug)}?error=image`);
    }
    throw error;
  }

  const next: Zone = {
    slug,
    name: str(formData, "name") || current.name,
    department: current.department,
    excerpt: str(formData, "excerpt"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    hero: {
      eyebrow: str(formData, "hero.eyebrow"),
      title: str(formData, "hero.title"),
      description: str(formData, "hero.description"),
      image: heroImage,
    },
    introTitle: str(formData, "introTitle"),
    intro: paragraphs(formData, "intro"),
    surrounding: str(formData, "surrounding"),
    ctaTitle: str(formData, "ctaTitle"),
    ctaDescription: str(formData, "ctaDescription"),
  };

  const overrides = readOverride<ZoneOverrides>("zones") ?? {};
  overrides[slug] = next;
  writeOverride<ZoneOverrides>("zones", overrides);

  revalidatePath(routes.zones);
  revalidatePath(routes.zone(slug));
  revalidatePath(routes.home);
  revalidatePath(routes.adminZone(slug));

  redirect(`${routes.adminZone(slug)}?saved=1`);
}
