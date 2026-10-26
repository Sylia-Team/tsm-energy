import { ReviewCard } from "@/components/marketing/ReviewCard";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { getTestimonials } from "@/lib/content";
import { getDisplayedGoogleReviews } from "@/lib/reviews/displayed";
import { cn } from "@/lib/utils";

function gridClass(count: number): string {
  return cn("mt-12 grid gap-4 md:grid-cols-2 lg:gap-6", count >= 3 && "lg:grid-cols-3");
}

export function RatingBadge({ rating, count }: { rating: number; count: number }) {
  return (
    <p className="mt-6 inline-flex items-center gap-2 border border-line bg-paper-elevated px-4 py-2 text-sm text-ink">
      <span className="text-brass" aria-hidden="true">
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
  const data = await getDisplayedGoogleReviews();

  if (!data) {
    const testimonials = getTestimonials();
    if (testimonials.length === 0) {
      return null;
    }
    return (
      <div className={gridClass(testimonials.length)}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    );
  }

  return (
    <>
      {data.rating != null && data.count != null ? (
        <RatingBadge rating={data.rating} count={data.count} />
      ) : null}
      <div className={gridClass(data.reviews.length)}>
        {data.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
