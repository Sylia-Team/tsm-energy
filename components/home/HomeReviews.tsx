import { ReviewCard } from "@/components/marketing/ReviewCard";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getDisplayedGoogleReviews } from "@/lib/reviews/displayed";
import { cn } from "@/lib/utils";

type HomeReviewsProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/** Extrait des avis Google. Rien n'est affiché sans vrais avis (pas de repli sur les avis manuels). */
export async function HomeReviews({ eyebrow, title, description }: HomeReviewsProps) {
  const data = await getDisplayedGoogleReviews(3);

  if (!data) {
    return null;
  }

  return (
    <section id="avis" className="py-28 lg:py-40">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl text-navy lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-[60ch] leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "mt-16 grid gap-6 md:grid-cols-2",
            data.reviews.length >= 3 && "lg:grid-cols-3",
          )}
        >
          {data.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
