import type { ServiceBlockItem } from "@/types/content";

type OfferingListProps = {
  items: ServiceBlockItem[];
};

export function OfferingList({ items }: OfferingListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {items.map((item) => (
        <li
          key={item.title}
          className="border border-line bg-paper-elevated p-6"
        >
          <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.01em] text-navy">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 -translate-y-0.5 bg-brand-green"
            />
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
