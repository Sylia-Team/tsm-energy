/** Configuration éditable de l'affichage des avis Google. */
export type ReviewsConfig = {
  /** Active la récupération des avis Google (sinon repli sur les avis manuels). */
  enabled: boolean;
  /** Identifiant de fiche Google (Place ID). */
  placeId: string;
  /** Note minimale d'un avis pour être affiché (1 à 5). */
  minRating: number;
  /** Nombre maximum d'avis affichés. */
  maxItems: number;
};

/** Avis Google normalisé pour l'affichage. */
export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

/** Données agrégées renvoyées par l'API Google Places. */
export type GoogleReviewsData = {
  rating: number | null;
  count: number | null;
  reviews: GoogleReview[];
};
