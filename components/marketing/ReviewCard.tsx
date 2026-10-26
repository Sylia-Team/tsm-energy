import type { GoogleReview } from "@/types/reviews";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      className="text-brass"
      aria-label={`Note de ${rating} sur 5`}
      role="img"
    >
      <span aria-hidden="true">
        {"★".repeat(rounded)}
        {"☆".repeat(Math.max(0, 5 - rounded))}
      </span>
    </span>
  );
}

export function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="flex h-full flex-col border border-line bg-paper-elevated p-8">
      <Stars rating={review.rating} />
      <blockquote className="mt-5 flex-1 font-display text-xl italic leading-snug text-navy">
        « {review.text} »
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-ink">{review.author}</p>
        {review.relativeTime ? (
          <p className="mt-1 text-sm text-ink-muted">
            {review.relativeTime} · Avis Google
          </p>
        ) : (
          <p className="mt-1 text-sm text-ink-muted">Avis Google</p>
        )}
      </figcaption>
    </figure>
  );
}
