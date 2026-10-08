import Link from "next/link";
import { IconArrow, IconPin } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import type { ZoneSummary } from "@/types/content";

type LocationCardProps = {
  zone: ZoneSummary;
};

export function LocationCard({ zone }: LocationCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper-elevated p-6 transition-colors duration-150 hover:border-navy">
      <IconPin className="h-5 w-5 text-accent" />
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-navy">
        <Link href={routes.zone(zone.slug)}>{zone.name}</Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {zone.excerpt}
      </p>
      <Link
        href={routes.zone(zone.slug)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
      >
        Voir le secteur
        <IconArrow className="h-4 w-4" />
      </Link>
    </article>
  );
}
