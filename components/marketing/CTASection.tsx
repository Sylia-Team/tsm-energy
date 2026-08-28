import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconPhone } from "@/components/ui/icons";
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
    <section className="bg-forest py-16 text-paper lg:py-24">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold tracking-[-0.02em] lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-paper/75 lg:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href={routes.quote}
            event="cta_click"
            payload={{ location }}
            className={buttonClassName("primary")}
          >
            {primaryLabel}
          </TrackedLink>
          <TrackedLink
            href={phoneHref}
            event="phone_click"
            payload={{ location }}
            className={buttonClassName("secondaryOnDark")}
          >
            <IconPhone className="h-4 w-4" />
            {secondaryLabel} {phone}
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
