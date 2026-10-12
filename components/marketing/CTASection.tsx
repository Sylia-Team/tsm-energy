import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  phone: string;
  phoneHref: string;
  location: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  phone,
  phoneHref,
  location,
}: CTASectionProps) {
  return (
    <section className="bg-navy-deep py-28 text-paper lg:py-40">
      <Container className="max-w-4xl text-center">
        <h2 className="font-display text-4xl text-paper sm:text-5xl lg:text-[4rem]">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">
          {description}
        </p>
        <div className="mt-12 flex flex-col items-center gap-6">
          <TrackedLink
            href={routes.quote}
            event="cta_click"
            payload={{ location }}
            className={buttonClassName("secondaryOnDark")}
          >
            {primaryLabel}
          </TrackedLink>
          <TrackedLink
            href={phoneHref}
            event="phone_click"
            payload={{ location }}
            className="text-sm text-paper/60 underline-offset-8 transition-colors hover:text-paper hover:underline"
          >
            {secondaryLabel} · {phone}
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
