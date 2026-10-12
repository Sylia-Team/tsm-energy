import Link from "next/link";
import { CoverImage } from "@/components/ui/cover-image";
import { IconArrow } from "@/components/ui/icons";
import { textLinkClassName } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Realisation } from "@/types/content";

type RealisationCardProps = {
  realisation: Realisation;
};

export function RealisationCard({ realisation }: RealisationCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-line bg-paper-elevated transition-colors duration-300 hover:border-navy">
      <Link
        href={routes.realisation(realisation.slug)}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        {realisation.image.src ? (
          <CoverImage
            src={realisation.image.src}
            alt={realisation.image.alt}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-navy/10" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-8">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">
          {realisation.city}
        </p>
        <h3 className="mt-3 font-display text-3xl text-navy">
          <Link href={routes.realisation(realisation.slug)}>
            {realisation.name}
          </Link>
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
          {realisation.excerpt}
        </p>
        <Link
          href={routes.realisation(realisation.slug)}
          className={cn(textLinkClassName, "mt-8")}
        >
          Voir la réalisation
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
