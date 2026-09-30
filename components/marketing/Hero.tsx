import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { IconPhone } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
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
};

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
}: HeroProps) {
  return (
    <section className="relative isolate min-h-[32rem] overflow-hidden lg:min-h-[38rem]">
      {image.src ? (
        <CoverImage
          src={image.src}
          alt={image.alt}
          sizes="100vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-forest" />
      )}
      <div className="absolute inset-0 bg-forest/45" />
      <Container className="relative flex min-h-[32rem] flex-col justify-end py-16 lg:min-h-[38rem] lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/75">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-paper sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
          {title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-paper/85 lg:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href={routes.quote}
            event="cta_click"
            payload={{ location: ctaLocation }}
            className={buttonClassName("primary")}
          >
            {primaryCta}
          </TrackedLink>
          <TrackedLink
            href={phoneHref}
            event="phone_click"
            payload={{ location: ctaLocation }}
            className={buttonClassName("secondaryOnDark")}
          >
            <IconPhone className="h-4 w-4" />
            {secondaryCta} {phone}
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
