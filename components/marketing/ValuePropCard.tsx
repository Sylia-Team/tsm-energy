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
    <article className="border-t border-line pt-8">
      <Icon className="h-6 w-6 text-brass" />
      <h3 className="mt-5 font-display text-2xl text-navy lg:text-[1.75rem]">
        {item.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>
    </article>
  );
}
