"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { routes } from "@/lib/routes";
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

  writeOverride<ReviewsConfig>("reviews", next);

  // Les avis apparaissent sur l'accueil ; on régénère la page publique.
  revalidatePath(routes.home);
  revalidatePath(routes.adminReviews);

  redirect(`${routes.adminReviews}?saved=1`);
}
