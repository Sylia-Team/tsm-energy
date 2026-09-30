"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { realisations as defaultRealisations } from "@/content/realisations";
import { writeOverride } from "@/lib/admin/content-store";
import { getRealisationsContent } from "@/lib/admin/content-read";
import {
  deleteManagedUpload,
  MediaUploadError,
  resolveGallery,
  resolveMediaImage,
} from "@/lib/admin/media-store";
import { isServiceSlug, isZoneSlug } from "@/lib/content";
import { routes } from "@/lib/routes";
import {
  ZONE_SLUGS,
  type Realisation,
  type ServiceSlug,
} from "@/types/content";
import { lines, slugify, str } from "../_components/form-utils";

function uniqueSlug(base: string, taken: string[]): string {
  const seed = slugify(base) || "chantier";
  let candidate = seed;
  let counter = 2;
  while (taken.includes(candidate)) {
    candidate = `${seed}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function revalidateRealisations(slug: string): void {
  revalidatePath(routes.realisations);
  revalidatePath(routes.realisation(slug));
  revalidatePath(routes.home);
}

export async function addRealisationAction(): Promise<void> {
  const list = getRealisationsContent();
  const slug = uniqueSlug(
    "nouveau-chantier",
    list.map((item) => item.slug),
  );

  const draft: Realisation = {
    slug,
    name: "Nouveau chantier",
    city: "",
    zoneSlug: ZONE_SLUGS[0],
    serviceSlugs: [],
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    context: "",
    problem: "",
    works: [],
    trades: [],
    result: "",
    image: { src: "", alt: "", width: 1600, height: 1067 },
    gallery: [],
    featured: false,
  };

  writeOverride<Realisation[]>("realisations", [draft, ...list]);
  redirect(routes.adminRealisation(slug));
}

export async function deleteRealisationAction(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");
  const current = getRealisationsContent();
  const removed = current.find((item) => item.slug === slug);
  if (removed) {
    deleteManagedUpload(removed.image.src);
    for (const photo of removed.gallery) {
      deleteManagedUpload(photo.src);
    }
  }
  const list = current.filter((item) => item.slug !== slug);

  writeOverride<Realisation[]>("realisations", list);
  revalidateRealisations(slug);

  redirect(routes.adminRealisations);
}

export async function saveRealisationAction(formData: FormData): Promise<void> {
  const originalSlug = str(formData, "originalSlug");
  const list = getRealisationsContent();
  const current = list.find((item) => item.slug === originalSlug);

  if (!current) {
    redirect(routes.adminRealisations);
  }

  const otherSlugs = list
    .filter((item) => item.slug !== originalSlug)
    .map((item) => item.slug);
  const desiredSlug = str(formData, "slug") || current.name;
  const slug = uniqueSlug(desiredSlug, otherSlugs);

  const zoneSlugValue = str(formData, "zoneSlug");
  const fallback =
    defaultRealisations.find((item) => item.slug === originalSlug) ?? null;

  let image = current.image;
  let gallery = current.gallery;
  try {
    image = await resolveMediaImage(
      formData,
      "image",
      current.image,
      fallback?.image ?? { src: "", alt: "", width: 0, height: 0 },
    );
    gallery = await resolveGallery(formData, current.gallery);
  } catch (error) {
    if (error instanceof MediaUploadError) {
      redirect(`${routes.adminRealisation(originalSlug)}?error=image`);
    }
    throw error;
  }

  const serviceSlugs = formData
    .getAll("serviceSlugs")
    .filter((value): value is string => typeof value === "string")
    .filter(isServiceSlug) as ServiceSlug[];

  const next: Realisation = {
    slug,
    name: str(formData, "name") || current.name,
    city: str(formData, "city"),
    zoneSlug: isZoneSlug(zoneSlugValue) ? zoneSlugValue : current.zoneSlug,
    serviceSlugs,
    excerpt: str(formData, "excerpt"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    context: str(formData, "context"),
    problem: str(formData, "problem"),
    works: lines(formData, "works"),
    trades: lines(formData, "trades"),
    result: str(formData, "result"),
    image,
    gallery,
    featured: formData.get("featured") === "true",
  };

  const updated = list.map((item) =>
    item.slug === originalSlug ? next : item,
  );
  writeOverride<Realisation[]>("realisations", updated);

  revalidateRealisations(originalSlug);
  if (slug !== originalSlug) {
    revalidatePath(routes.realisation(slug));
  }

  redirect(`${routes.adminRealisation(slug)}?saved=1`);
}
