import { ReviewCard } from "@/components/marketing/ReviewCard";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { getReviewsConfig } from "@/lib/admin/content-read";
import { fetchGoogleReviews } from "@/lib/reviews/google";
import { getTestimonials } from "@/lib/content";

const gridClass = "mt-12 grid gap-4 md:grid-cols-3 lg:gap-6";

function RatingBadge({ rating, count }: { rating: number; count: number }) {
  return (
    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper-elevated px-4 py-2 text-sm text-ink">
      <span className="text-accent" aria-hidden="true">
        ★
      </span>
      <span className="font-semibold">
        {rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
      </span>
      <span className="text-ink-muted">· {count} avis Google</span>
    </p>
  );
}

/**
 * Affiche les avis Google (récupérés côté serveur) avec repli automatique
 * sur les avis manuels (`content/testimonials.ts`) si la fonctionnalité est
 * désactivée, non configurée ou indisponible.
 */
export async function GoogleReviews() {
  const config = getReviewsConfig();
  const data = config.enabled
    ? await fetchGoogleReviews(config.placeId)
    : null;

  const googleReviews = (data?.reviews ?? [])
    .filter((review) => review.rating >= config.minRating)
    .slice(0, Math.max(1, config.maxItems));

  if (googleReviews.length === 0) {
    const testimonials = getTestimonials();
    return (
      <div className={gridClass}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    );
  }

  return (
    <>
      {data?.rating != null && data.count != null ? (
        <RatingBadge rating={data.rating} count={data.count} />
      ) : null}
      <div className={gridClass}>
        {googleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
