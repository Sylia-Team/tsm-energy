import type { ReviewsConfig } from "@/types/reviews";

/**
 * Valeurs par défaut de l'affichage des avis Google.
 * La clé API vit dans la variable d'environnement `GOOGLE_PLACES_API_KEY`.
 * Le Place ID et les options se règlent depuis l'administration (`/admin/avis`).
 */
export const reviewsConfig: ReviewsConfig = {
  enabled: false,
  placeId: "", // [INFORMATION À CONFIRMER] — Place ID de la fiche Google TSM
  minRating: 4,
  maxItems: 6,
};
