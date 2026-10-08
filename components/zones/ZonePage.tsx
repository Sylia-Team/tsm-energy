import { TrackPageView } from "@/components/analytics/TrackPageView";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { LocationCard } from "@/components/marketing/LocationCard";
import { MediaSplit } from "@/components/marketing/MediaSplit";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { RealisationCard } from "@/components/realisations/RealisationCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";
import type {
  Realisation,
  Service,
  Testimonial,
  Zone,
} from "@/types/content";
import type { SiteConfig } from "@/types/site";

type ZonePageProps = {
  zone: Zone;
  realisations: Realisation[];
  services: Service[];
  relatedZones: Zone[];
  testimonials: Testimonial[];
  site: SiteConfig;
};

export function ZonePage({
  zone,
  realisations,
  services,
  relatedZones,
  testimonials,
  site,
}: ZonePageProps) {
  return (
    <>
      <TrackPageView event="zone_view" slug={zone.slug} />
      <Hero
        eyebrow={zone.hero.eyebrow}
        title={zone.hero.title}
        description={zone.hero.description}
        image={zone.hero.image}
        primaryCta="Demander un devis"
        secondaryCta="Appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation={`zone_hero_${zone.slug}`}
      />

      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.zone(zone.slug)}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Zones d’intervention", href: routes.zones },
            { label: zone.name },
          ]}
        />
      </Container>

      <MediaSplit image={realisations[0]?.image ?? zone.hero.image} side="right">
        <SectionTitle eyebrow="Commune" title={zone.introTitle} />
        <div className="mt-6 space-y-4">
          {zone.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[65ch] leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 max-w-[65ch] leading-relaxed text-ink-muted">
          {zone.surrounding}
        </p>
      </MediaSplit>

      {realisations.length > 0 ? (
        <Section tone="mist">
          <Container>
            <SectionTitle
              eyebrow="Chantiers"
              title={`Réalisations à ${zone.name}`}
              description="Exemples de travaux menés dans cette commune."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {realisations.map((realisation) => (
                <RealisationCard
                  key={realisation.slug}
                  realisation={realisation}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {services.length > 0 ? (
        <Section>
          <Container>
            <SectionTitle
              eyebrow="Métiers"
              title={`Services à ${zone.name}`}
              description="Les travaux que nous prenons en charge sur cette commune, seuls ou dans un projet global."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {testimonials.length > 0 ? (
        <Section tone="mist">
          <Container>
            <SectionTitle
              eyebrow="Avis"
              title="Ce que disent des propriétaires du secteur"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedZones.length > 0 ? (
        <Section>
          <Container>
            <SectionTitle
              eyebrow="Autres communes"
              title="Nous intervenons aussi à proximité"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {relatedZones.map((related) => (
                <LocationCard key={related.slug} zone={related} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection
        title={zone.ctaTitle}
        description={zone.ctaDescription}
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location={`zone_cta_${zone.slug}`}
      />
    </>
  );
}
