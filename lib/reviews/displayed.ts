import { getReviewsConfig } from "@/lib/admin/content-read";
import { fetchGoogleReviews } from "@/lib/reviews/google";
import type { GoogleReview } from "@/types/reviews";

export type DisplayedGoogleReviews = {
  reviews: GoogleReview[];
  rating: number | null;
  count: number | null;
};

/**
 * Avis Google à afficher, filtrés selon la configuration (note minimale, nombre max).
 * Renvoie `null` si l'affichage est désactivé, non configuré, indisponible ou vide.
 */
export async function getDisplayedGoogleReviews(
  limit?: number,
): Promise<DisplayedGoogleReviews | null> {
  const config = getReviewsConfig();

  if (!config.enabled) {
    return null;
  }

  const data = await fetchGoogleReviews(config.placeId);
  const max = Math.max(1, Math.min(limit ?? config.maxItems, config.maxItems));
  const reviews = (data?.reviews ?? [])
    .filter((review) => review.rating >= config.minRating)
    .slice(0, max);

  if (reviews.length === 0) {
    return null;
  }

  return { reviews, rating: data?.rating ?? null, count: data?.count ?? null };
}
