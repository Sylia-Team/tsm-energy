import type { Testimonial } from "@/types/content";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col border border-line bg-paper-elevated p-6">
      <blockquote className="flex-1 text-base leading-relaxed text-ink">
        « {testimonial.quote} »
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="font-semibold text-navy">{testimonial.author}</p>
        <p className="mt-1 text-sm text-ink-muted">
          {testimonial.city} · {testimonial.project}
        </p>
      </figcaption>
    </figure>
  );
}
