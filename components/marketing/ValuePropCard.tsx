import type { ValueProposition } from "@/types/content";
import {
  IconClipboard,
  IconPin,
  IconTools,
  IconUsers,
} from "@/components/ui/icons";

const icons = {
  interlocutor: IconUsers,
  trades: IconTools,
  local: IconPin,
  followup: IconClipboard,
} as const;

type ValuePropCardProps = {
  item: ValueProposition;
};

export function ValuePropCard({ item }: ValuePropCardProps) {
  const Icon = icons[item.icon];

  return (
    <article className="border border-line bg-paper-elevated p-6">
      <Icon className="h-6 w-6 text-accent" />
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-navy">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>
    </article>
  );
}
