import type { Testimonial } from "@/types/content";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col border border-line bg-paper-elevated p-8">
      <blockquote className="flex-1 font-display text-xl italic leading-snug text-navy">
        « {testimonial.quote} »
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-ink">{testimonial.author}</p>
        <p className="mt-1 text-sm text-ink-muted">
          {testimonial.city} · {testimonial.project}
        </p>
      </figcaption>
    </figure>
  );
}
