import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Container } from "@/components/ui/container";
import { IconPhone } from "@/components/ui/icons";
import { getQuoteContent } from "@/lib/content";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const quote = getQuoteContent();

export const metadata: Metadata = pageMetadata({
  title: quote.seoTitle,
  description: quote.seoDescription,
  path: routes.quote,
});

export default function QuotePage() {
  const site = getSiteContent();

  return (
    <Container className="py-16 lg:py-24">
      <Breadcrumb
        currentPath={routes.quote}
        items={[
          { label: "Accueil", href: routes.home },
          { label: "Demande de devis" },
        ]}
      />
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {quote.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.03em] text-forest lg:text-[3.5rem] lg:leading-[1.05]">
        {quote.title}
      </h1>
      <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-muted lg:text-lg">
        {quote.description}
      </p>
      <p className="mt-4">
        <TrackedLink
          href={site.phoneHref}
          event="phone_click"
          payload={{ location: "quote_intro" }}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-forest"
        >
          <IconPhone className="h-4 w-4" />
          {quote.phoneLabel} {site.phone}
        </TrackedLink>
      </p>
      <div className="mt-12 max-w-3xl">
        <Suspense
          fallback={
            <div className="border border-line bg-paper-elevated p-6 lg:p-10">
              <p className="text-ink-muted">Chargement du formulaire…</p>
            </div>
          }
        >
          <QuoteWizard />
        </Suspense>
      </div>
    </Container>
  );
}
