import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/types/media";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: MediaImage;
  primaryCta: string;
  secondaryCta: string;
  phone: string;
  phoneHref: string;
  ctaLocation?: string;
  /** `full` : hauteur d’écran (accueil). */
  size?: "page" | "full";
};

const heights = {
  page: "min-h-[34rem] lg:min-h-[42rem]",
  full: "min-h-[40rem] lg:min-h-[calc(100svh-5rem)]",
} as const;

export function Hero({
  eyebrow,
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
  phone,
  phoneHref,
  ctaLocation = "hero",
  size = "page",
}: HeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-navy-deep", heights[size])}>
      {image.src ? (
        <CoverImage src={image.src} alt={image.alt} sizes="100vw" priority />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/30 to-transparent" />
      <Container
        className={cn(
          "relative flex flex-col justify-end pt-32 pb-16 lg:pb-24",
          heights[size],
        )}
      >
        <Eyebrow inverted>{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "mt-6 max-w-5xl font-display text-paper",
            size === "full"
              ? "text-5xl sm:text-6xl lg:text-[5.5rem]"
              : "text-5xl lg:text-[4.5rem]",
          )}
        >
          {title}
        </h1>
        <div className="mt-10 flex flex-col gap-8 border-t border-paper/20 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-paper/80 lg:text-lg">
            {description}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <TrackedLink
              href={routes.quote}
              event="cta_click"
              payload={{ location: ctaLocation }}
              className={buttonClassName("secondaryOnDark")}
            >
              {primaryCta}
            </TrackedLink>
            <TrackedLink
              href={phoneHref}
              event="phone_click"
              payload={{ location: ctaLocation }}
              className="whitespace-nowrap text-sm text-paper/75 underline-offset-8 transition-colors hover:text-paper hover:underline"
            >
              {secondaryCta} · {phone}
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
