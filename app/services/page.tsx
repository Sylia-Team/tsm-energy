import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Section } from "@/components/marketing/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/container";
import { getServices, getServicesListing, getSite } from "@/lib/content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const listing = getServicesListing();
const site = getSite();

export const metadata: Metadata = pageMetadata({
  title: listing.seoTitle,
  description: listing.seoDescription,
  path: routes.services,
  image: listing.image,
});

export default function ServicesPage() {
  const services = getServices();

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
        ctaLocation="services_index_hero"
      />
      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.services}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Services" },
          ]}
        />
      </Container>
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>
      <CTASection
        title="Un projet dans le Var ?"
        description="Dites-nous le métier concerné, la commune et le délai. Nous revenons vers vous pour une visite."
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="services_index_cta"
      />
    </>
  );
}
