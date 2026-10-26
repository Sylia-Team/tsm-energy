import Link from "next/link";
import { textLinkClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { IconArrow } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Realisation } from "@/types/content";
import { Eyebrow } from "@/components/ui/eyebrow";

type EditorialRealisationsProps = {
  eyebrow: string;
  title: string;
  allLabel: string;
  realisations: Realisation[];
};

export function EditorialRealisations({
  eyebrow,
  title,
  allLabel,
  realisations,
}: EditorialRealisationsProps) {
  const [lead, ...others] = realisations;

  if (!lead) {
    return null;
  }

  return (
    <section id="realisations" className="bg-mist py-28 lg:py-40">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-4xl text-navy lg:text-[3.5rem]">
              {title}
            </h2>
          </div>
          <Link
            href={routes.realisations}
            className={textLinkClassName}
          >
            {allLabel}
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16">
          <Project realisation={lead} size="lead" />
        </div>
        {others.length > 0 ? (
          <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
            {others.map((realisation) => (
              <Project key={realisation.slug} realisation={realisation} size="small" />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function Project({
  realisation,
  size,
}: {
  realisation: Realisation;
  size: "lead" | "small";
}) {
  const href = routes.realisation(realisation.slug);

  return (
    <article className="group">
      <Link
        href={href}
        className={cn(
          "relative block overflow-hidden bg-navy/10",
          size === "lead" ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        {realisation.image.src ? (
          <CoverImage
            src={realisation.image.src}
            alt={realisation.image.alt}
            sizes={size === "lead" ? "(min-width: 1280px) 1216px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
      </Link>
      <div
        className={cn(
          "mt-8",
          size === "lead" && "grid gap-6 md:grid-cols-[1fr_1fr] md:gap-16",
        )}
      >
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">
            {realisation.city}
          </p>
          <h3
            className={cn(
              "mt-3 font-display text-navy",
              size === "lead" ? "text-3xl lg:text-[2.75rem]" : "text-2xl lg:text-3xl",
            )}
          >
            <Link href={href}>{realisation.name}</Link>
          </h3>
        </div>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted md:mt-0 md:self-end">
          {realisation.excerpt}
        </p>
      </div>
    </article>
  );
}
