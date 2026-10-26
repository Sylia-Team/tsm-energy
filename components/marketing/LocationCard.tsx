import Link from "next/link";
import { IconArrow, IconPin } from "@/components/ui/icons";
import { textLinkClassName } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { ZoneSummary } from "@/types/content";

type LocationCardProps = {
  zone: ZoneSummary;
};

export function LocationCard({ zone }: LocationCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper-elevated p-8 transition-colors duration-300 hover:border-navy">
      <IconPin className="h-5 w-5 text-brass" />
      <h3 className="mt-5 font-display text-3xl text-navy">
        <Link href={routes.zone(zone.slug)}>{zone.name}</Link>
      </h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        {zone.excerpt}
      </p>
      <Link
        href={routes.zone(zone.slug)}
        className={cn(textLinkClassName, "mt-8")}
      >
        Voir le secteur
        <IconArrow className="h-4 w-4" />
      </Link>
    </article>
  );
}
