import type { GoogleReview, GoogleReviewsData } from "@/types/reviews";

/**
 * Récupère les avis d'une fiche Google via l'API Places v1 (côté serveur).
 * - Clé API : `GOOGLE_PLACES_API_KEY` (jamais exposée au client).
 * - Cache ISR : 1 jour (les avis changent lentement, on limite le quota).
 * - Renvoie `null` en cas d'absence de config ou d'erreur (repli géré par l'appelant).
 */

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 h

type RawReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type RawPlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: RawReview[];
};

function normalizeReview(raw: RawReview, index: number): GoogleReview | null {
  const text = raw.text?.text ?? raw.originalText?.text ?? "";
  const author = raw.authorAttribution?.displayName ?? "";
  const rating = typeof raw.rating === "number" ? raw.rating : 0;

  if (!text.trim() || !author.trim()) {
    return null;
  }

  return {
    id: raw.name ?? `google-review-${index}`,
    author,
    rating,
    text: text.trim(),
    relativeTime: raw.relativePublishTimeDescription ?? "",
  };
}

export async function fetchGoogleReviews(
  placeId: string,
): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const response = await fetch(
      `${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as RawPlaceResponse;
    const reviews = (data.reviews ?? [])
      .map(normalizeReview)
      .filter((review): review is GoogleReview => review !== null);

    return {
      rating: typeof data.rating === "number" ? data.rating : null,
      count: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      reviews,
    };
  } catch {
    return null;
  }
}
