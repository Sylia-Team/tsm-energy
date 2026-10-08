import type { Stat } from "@/types/content";

type StatListProps = {
  items: Stat[];
};

export function StatList({ items }: StatListProps) {
  return (
    <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="border-t border-paper/20 pt-5">
          <dt className="font-display text-3xl lg:text-5xl">
            {item.value}
          </dt>
          <dd className="mt-2 text-sm text-paper/70">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
