import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { IconPhone } from "@/components/ui/icons";
import { routes } from "@/lib/routes";

type ContactCTAProps = {
  quoteLabel: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  location: string;
};

export function ContactCTA({
  quoteLabel,
  phoneLabel,
  phone,
  phoneHref,
  location,
}: ContactCTAProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <TrackedLink
        href={routes.quote}
        event="cta_click"
        payload={{ location }}
        className={buttonClassName("primary")}
      >
        {quoteLabel}
      </TrackedLink>
      <TrackedLink
        href={phoneHref}
        event="phone_click"
        payload={{ location }}
        className={buttonClassName("secondary")}
      >
        <IconPhone className="h-4 w-4" />
        {phoneLabel} {phone}
      </TrackedLink>
    </div>
  );
}
