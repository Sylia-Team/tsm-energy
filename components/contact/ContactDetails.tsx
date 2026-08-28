import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import {
  IconClipboard,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import { formatAddressLines, mapsSearchUrl } from "@/lib/utils";
import type { ContactContent } from "@/types/contact";
import type { SiteConfig } from "@/types/site";

type ContactDetailsProps = {
  site: SiteConfig;
  content: ContactContent;
};

export function ContactDetails({ site, content }: ContactDetailsProps) {
  const addressLines = formatAddressLines(site.address);
  const itineraryHref = mapsSearchUrl(site.address);

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
      <li className="border border-line bg-paper-elevated p-6">
        <IconPhone className="h-5 w-5 text-accent" />
        <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-forest">
          {content.phoneLabel}
        </h2>
        <p className="mt-2">
          <TrackedLink
            href={site.phoneHref}
            event="phone_click"
            payload={{ location: "contact_details" }}
            className="text-base font-medium text-forest hover:underline"
          >
            {site.phone}
          </TrackedLink>
        </p>
      </li>

      {site.email ? (
        <li className="border border-line bg-paper-elevated p-6">
          <IconMail className="h-5 w-5 text-accent" />
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-forest">
            {content.emailLabel}
          </h2>
          <p className="mt-2">
            <TrackedLink
              href={`mailto:${site.email}`}
              event="email_click"
              payload={{ location: "contact_details" }}
              className="text-base font-medium text-forest hover:underline"
            >
              {site.email}
            </TrackedLink>
          </p>
        </li>
      ) : null}

      <li className="border border-line bg-paper-elevated p-6">
        <IconPin className="h-5 w-5 text-accent" />
        <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-forest">
          {content.addressLabel}
        </h2>
        <address className="mt-2 not-italic text-base leading-relaxed text-ink-muted">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a
          href={itineraryHref}
          rel="noreferrer"
          target="_blank"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-forest hover:underline"
        >
          {content.mapsLabel}
        </a>
      </li>

      {site.openingHours ? (
        <li className="border border-line bg-paper-elevated p-6">
          <IconClipboard className="h-5 w-5 text-accent" />
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-forest">
            {content.hoursLabel}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-muted">
            {site.openingHours}
          </p>
        </li>
      ) : null}

      <li className="border border-line bg-paper-elevated p-6 md:col-span-2">
        <h2 className="text-xl font-semibold tracking-[-0.01em] text-forest">
          {content.quoteLabel}
        </h2>
        <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-ink-muted">
          {content.quoteHint}
        </p>
        <TrackedLink
          href={routes.quote}
          event="cta_click"
          payload={{ location: "contact_details" }}
          className={buttonClassName("primary", "mt-5")}
        >
          {content.quoteLabel}
        </TrackedLink>
      </li>
    </ul>
  );
}
