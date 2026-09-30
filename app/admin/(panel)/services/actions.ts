"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { services } from "@/content/services";
import { readOverride, writeOverride } from "@/lib/admin/content-store";
import { getServiceContent } from "@/lib/admin/content-read";
import { MediaUploadError, resolveMediaImage } from "@/lib/admin/media-store";
import { isServiceSlug } from "@/lib/content";
import { routes } from "@/lib/routes";
import type { Service, ServiceSlug } from "@/types/content";
import { paragraphs, str } from "../_components/form-utils";

type ServiceOverrides = Partial<Record<ServiceSlug, Service>>;

export async function saveServiceAction(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");

  if (!isServiceSlug(slug)) {
    redirect(routes.adminServices);
  }

  const current = getServiceContent(slug);

  if (!current) {
    redirect(routes.adminServices);
  }

  const fallbackImage =
    services.find((item) => item.slug === slug)?.hero.image ?? current.hero.image;

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
      redirect(`${routes.adminService(slug)}?error=image`);
    }
    throw error;
  }

  const next: Service = {
    slug,
    title: str(formData, "title"),
    shortTitle: str(formData, "shortTitle"),
    excerpt: str(formData, "excerpt"),
    featured: formData.get("featured") === "true",
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    hero: {
      eyebrow: str(formData, "hero.eyebrow"),
      title: str(formData, "hero.title"),
      description: str(formData, "hero.description"),
      image: heroImage,
    },
    needTitle: str(formData, "needTitle"),
    need: paragraphs(formData, "need"),
    offeringsTitle: str(formData, "offeringsTitle"),
    offerings: current.offerings.map((item, index) => ({
      title: str(formData, `offerings.${index}.title`) || item.title,
      description:
        str(formData, `offerings.${index}.description`) || item.description,
    })),
    methodTitle: str(formData, "methodTitle"),
    method: current.method.map((item, index) => ({
      title: str(formData, `method.${index}.title`) || item.title,
      description:
        str(formData, `method.${index}.description`) || item.description,
    })),
    faqs: current.faqs.map((item, index) => ({
      question: str(formData, `faqs.${index}.question`) || item.question,
      answer: str(formData, `faqs.${index}.answer`) || item.answer,
    })),
    ctaTitle: str(formData, "ctaTitle"),
    ctaDescription: str(formData, "ctaDescription"),
  };

  const overrides = readOverride<ServiceOverrides>("services") ?? {};
  overrides[slug] = next;
  writeOverride<ServiceOverrides>("services", overrides);

  revalidatePath(routes.services);
  revalidatePath(routes.service(slug));
  revalidatePath(routes.home);
  revalidatePath(routes.adminService(slug));

  redirect(`${routes.adminService(slug)}?saved=1`);
}
