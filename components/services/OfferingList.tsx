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
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-forest">
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
