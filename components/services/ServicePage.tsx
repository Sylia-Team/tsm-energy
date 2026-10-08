import { TrackPageView } from "@/components/analytics/TrackPageView";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { CertificationCard } from "@/components/marketing/CertificationCard";
import { CTASection } from "@/components/marketing/CTASection";
import { FaqList } from "@/components/marketing/FaqList";
import { Hero } from "@/components/marketing/Hero";
import { MediaSplit } from "@/components/marketing/MediaSplit";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { RealisationCard } from "@/components/realisations/RealisationCard";
import { MethodSteps } from "@/components/services/MethodSteps";
import { OfferingList } from "@/components/services/OfferingList";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";
import { serviceJsonLd } from "@/lib/seo/json-ld";
import type { Certification, Realisation, Service } from "@/types/content";
import type { SiteConfig } from "@/types/site";

type ServicePageProps = {
  service: Service;
  realisations: Realisation[];
  relatedServices: Service[];
  certifications: Certification[];
  site: SiteConfig;
};

export function ServicePage({
  service,
  realisations,
  relatedServices,
  certifications,
  site,
}: ServicePageProps) {
  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <TrackPageView event="service_view" slug={service.slug} />
      <Hero
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        description={service.hero.description}
        image={service.hero.image}
        primaryCta="Demander un devis"
        secondaryCta="Appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation={`service_hero_${service.slug}`}
      />

      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.service(service.slug)}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Services", href: routes.services },
            { label: service.title },
          ]}
        />
      </Container>

      <MediaSplit image={realisations[0]?.image ?? service.hero.image}>
        <SectionTitle eyebrow="Le besoin" title={service.needTitle} />
        <div className="mt-6 space-y-4">
          {service.need.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[65ch] leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </MediaSplit>

      <Section tone="mist">
        <Container>
          <SectionTitle
            eyebrow="Prestations"
            title={service.offeringsTitle}
          />
          <div className="mt-12">
            <OfferingList items={service.offerings} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Méthode" title={service.methodTitle} />
          <div className="mt-12">
            <MethodSteps steps={service.method} />
          </div>
        </Container>
      </Section>

      {realisations.length > 0 ? (
        <Section tone="mist">
          <Container>
            <SectionTitle
              eyebrow="Chantiers"
              title="Réalisations associées"
              description={`Exemples de travaux de ${service.shortTitle.toLowerCase()} menés dans le Var.`}
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

      <Section>
        <Container>
          <SectionTitle
            eyebrow="Garanties"
            title="Qualifications et assurances"
            description="Les mêmes garanties que sur l’ensemble de nos chantiers, selon la nature des ouvrages."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionTitle eyebrow="Questions" title="FAQ" />
          <div className="mt-10">
            <FaqList items={service.faqs} />
          </div>
        </Container>
      </Section>

      {relatedServices.length > 0 ? (
        <Section>
          <Container>
            <SectionTitle
              eyebrow="Autres métiers"
              title="Ces services peuvent aussi vous concerner"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection
        title={service.ctaTitle}
        description={service.ctaDescription}
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location={`service_cta_${service.slug}`}
      />
    </>
  );
}
