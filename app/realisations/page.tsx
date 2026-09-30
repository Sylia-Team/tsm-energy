import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Section } from "@/components/marketing/Section";
import { RealisationCard } from "@/components/realisations/RealisationCard";
import { Container } from "@/components/ui/container";
import {
  getRealisationsContent,
  getRealisationsListingContent,
  getSiteContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const listing = getRealisationsListingContent();
  return pageMetadata({
    title: listing.seoTitle,
    description: listing.seoDescription,
    path: routes.realisations,
    image: listing.image,
  });
}

export default function RealisationsPage() {
  const listing = getRealisationsListingContent();
  const site = getSiteContent();
  const realisations = getRealisationsContent();

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
        ctaLocation="realisations_index_hero"
      />
      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.realisations}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Réalisations" },
          ]}
        />
      </Container>
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {realisations.map((realisation) => (
              <RealisationCard
                key={realisation.slug}
                realisation={realisation}
              />
            ))}
          </div>
        </Container>
      </Section>
      <CTASection
        title="Un chantier similaire dans le Var ?"
        description="Décrivez votre projet : commune, type de travaux et délai. Nous organisons une visite."
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="realisations_index_cta"
      />
    </>
  );
}
