import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconPhone } from "@/components/ui/icons";
import { getQuoteContent } from "@/lib/content";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const quote = getQuoteContent();

export const metadata: Metadata = pageMetadata({
  title: quote.confirmationTitle,
  description: quote.confirmationBody,
  path: routes.quoteConfirmation,
  index: false,
});

export default function QuoteConfirmationPage() {
  const site = getSiteContent();

  return (
    <Container className="py-16 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Demande de devis
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy lg:text-[4rem]">
        {quote.confirmationTitle}
      </h1>
      <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-muted lg:text-lg">
        {quote.confirmationBody}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <TrackedLink
          href={site.phoneHref}
          event="phone_click"
          payload={{ location: "quote_confirmation" }}
          className={buttonClassName("primary")}
        >
          <IconPhone className="h-4 w-4" />
          Appeler {site.phone}
        </TrackedLink>
        <TrackedLink
          href={routes.home}
          event="cta_click"
          payload={{ location: "quote_confirmation_home" }}
          className={buttonClassName("secondary")}
        >
          Retour à l’accueil
        </TrackedLink>
      </div>
    </Container>
  );
}
