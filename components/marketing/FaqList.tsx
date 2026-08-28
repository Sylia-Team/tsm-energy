import type { FaqItem } from "@/types/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo/json-ld";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  const jsonLd = faqPageJsonLd(items);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      {items.map((item) => (
        <article key={item.question} className="py-6">
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-forest">
            {item.question}
          </h3>
          <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink-muted">
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  );
}
