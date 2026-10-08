import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LocationCard } from "@/components/marketing/LocationCard";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { Container } from "@/components/ui/container";
import {
  getSiteContent,
  getZonesContent,
  getZonesListingContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const listing = getZonesListingContent();
  return pageMetadata({
    title: listing.seoTitle,
    description: listing.seoDescription,
    path: routes.zones,
    image: listing.image,
  });
}

export default function ZonesPage() {
  const listing = getZonesListingContent();
  const site = getSiteContent();
  const zones = getZonesContent();

  return (
    <>
      <Hero
        eyebrow={listing.eyebrow}
        title={listing.title}
        description={listing.description}
        image={listing.image}
        primaryCta="Demander un devis"
        secondaryCta="Appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation="zones_index_hero"
      />
      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.zones}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Zones d’intervention" },
          ]}
        />
      </Container>
      <Section>
        <Container>
          <SectionTitle eyebrow="Secteur" title={listing.introTitle} />
          <div className="mt-6 space-y-4">
            {listing.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[65ch] leading-relaxed text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <SectionTitle
            eyebrow="Communes"
            title="Les villes où nous avons des chantiers"
            description="Chaque page commune a un texte local et des réalisations associées."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {zones.map((zone) => (
              <LocationCard key={zone.slug} zone={zone} />
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitle
            eyebrow="Alentours"
            title={listing.surroundingTitle}
          />
          <p className="mt-6 max-w-[65ch] leading-relaxed text-ink-muted">
            {listing.surrounding}
          </p>
        </Container>
      </Section>
      <CTASection
        title="Un projet dans le Var ?"
        description="Indiquez votre commune, le type de travaux et le délai. Nous revenons vers vous pour une visite."
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="zones_index_cta"
      />
    </>
  );
}
