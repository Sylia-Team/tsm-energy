import type { ServiceBlockItem } from "@/types/content";

type OfferingListProps = {
  items: ServiceBlockItem[];
};

export function OfferingList({ items }: OfferingListProps) {
  return (
    <ul className="grid gap-12 md:grid-cols-2 lg:gap-x-16">
      {items.map((item) => (
        <li
          key={item.title}
          className="border-t border-line pt-8"
        >
          <h3 className="font-display text-2xl text-navy lg:text-[1.75rem]">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
