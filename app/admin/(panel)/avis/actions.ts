"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { routes } from "@/lib/routes";
import type { AvisPageContent } from "@/types/avis";
import type { ReviewsConfig } from "@/types/reviews";
import { num, str } from "../_components/form-utils";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export async function saveReviewsAction(formData: FormData): Promise<void> {
  const next: ReviewsConfig = {
    enabled: formData.get("enabled") === "true",
    placeId: str(formData, "placeId"),
    minRating: clamp(num(formData, "minRating", 4), 1, 5),
    maxItems: clamp(num(formData, "maxItems", 6), 1, 20),
  };

  const page: AvisPageContent = {
    eyebrow: str(formData, "page.eyebrow"),
    title: str(formData, "page.title"),
    description: str(formData, "page.description"),
    seoTitle: str(formData, "page.seoTitle"),
    seoDescription: str(formData, "page.seoDescription"),
    ctaTitle: str(formData, "page.ctaTitle"),
    ctaDescription: str(formData, "page.ctaDescription"),
  };

  writeOverride<ReviewsConfig>("reviews", next);
  writeOverride<AvisPageContent>("avisPage", page);

  revalidatePath(routes.home);
  revalidatePath(routes.avis);
  revalidatePath(routes.adminReviews);

  redirect(`${routes.adminReviews}?saved=1`);
}
