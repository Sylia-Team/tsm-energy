import Link from "next/link";
import { CoverImage } from "@/components/ui/cover-image";
import { IconArrow } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import type { Realisation } from "@/types/content";

type RealisationCardProps = {
  realisation: Realisation;
};

export function RealisationCard({ realisation }: RealisationCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-line bg-paper-elevated transition-colors duration-150 hover:border-forest">
      <Link
        href={routes.realisation(realisation.slug)}
        className="relative block aspect-[4/3]"
      >
        <CoverImage
          src={realisation.image.src}
          alt={realisation.image.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          {realisation.city}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-forest">
          <Link href={routes.realisation(realisation.slug)}>
            {realisation.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {realisation.excerpt}
        </p>
        <Link
          href={routes.realisation(realisation.slug)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest"
        >
          Voir la réalisation
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
