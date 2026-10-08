import { TrackPageView } from "@/components/analytics/TrackPageView";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { LocationCard } from "@/components/marketing/LocationCard";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { PhotoGallery } from "@/components/realisations/PhotoGallery";
import { RealisationCard } from "@/components/realisations/RealisationCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";
import { creativeWorkJsonLd } from "@/lib/seo/json-ld";
import type { Realisation, Service, ZoneSummary } from "@/types/content";
import type { SiteConfig } from "@/types/site";

type RealisationPageProps = {
  realisation: Realisation;
  services: Service[];
  zone: ZoneSummary | undefined;
  related: Realisation[];
  site: SiteConfig;
};

export function RealisationPage({
  realisation,
  services,
  zone,
  related,
  site,
}: RealisationPageProps) {
  return (
    <>
      <JsonLd data={creativeWorkJsonLd(realisation)} />
      <TrackPageView event="realisation_view" slug={realisation.slug} />
      <Hero
        eyebrow={`${realisation.city} · Var`}
        title={realisation.name}
        description={realisation.excerpt}
        image={realisation.image}
        primaryCta="Demander un devis"
        secondaryCta="Appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation={`realisation_hero_${realisation.slug}`}
      />

      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.realisation(realisation.slug)}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Réalisations", href: routes.realisations },
            { label: realisation.name },
          ]}
        />
      </Container>

      <Section>
        <Container>
          <ul className="flex flex-wrap gap-2">
            {realisation.trades.map((trade) => (
              <li
                key={trade}
                className="border border-line bg-paper-elevated px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-navy"
              >
                {trade}
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="font-display text-3xl text-navy lg:text-[2.75rem]">
                Le contexte
              </h2>
              <p className="mt-4 max-w-[65ch] leading-relaxed text-ink-muted">
                {realisation.context}
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl text-navy lg:text-[2.75rem]">
                La problématique
              </h2>
              <p className="mt-4 max-w-[65ch] leading-relaxed text-ink-muted">
                {realisation.problem}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionTitle
            eyebrow="Travaux"
            title="Ce qui a été réalisé"
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
            {realisation.works.map((work, index) => (
              <li
                key={work}
                className="border border-line bg-paper-elevated p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-base font-medium leading-relaxed text-navy">
                  {work}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Résultat" title="Après intervention" />
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-muted">
            {realisation.result}
          </p>
        </Container>
      </Section>

      {realisation.gallery.length > 0 ? (
        <Section tone="mist">
          <Container>
            <SectionTitle
              eyebrow="Photos"
              title="Illustrations du chantier"
              description="Visuels d’ambiance pour donner une idée du type d’ouvrage. Les photos TSM les remplaceront."
            />
            <div className="mt-12">
              <PhotoGallery images={realisation.gallery} />
            </div>
          </Container>
        </Section>
      ) : null}

      {services.length > 0 ? (
        <Section>
          <Container>
            <SectionTitle
              eyebrow="Métiers"
              title="Services associés"
              description="Les corps d’état concernés par ce chantier."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {zone ? (
        <Section tone="mist">
          <Container>
            <SectionTitle
              eyebrow="Secteur"
              title={`Intervention à ${zone.name}`}
            />
            <div className="mt-12 max-w-md">
              <LocationCard zone={zone} />
            </div>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section>
          <Container>
            <SectionTitle
              eyebrow="Autres chantiers"
              title="Réalisations à proximité"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <RealisationCard key={item.slug} realisation={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection
        title={`Un projet comparable à ${realisation.city} ?`}
        description="Dites-nous le type de travaux, la commune et le délai. Nous revenons vers vous pour une visite."
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location={`realisation_cta_${realisation.slug}`}
      />
    </>
  );
}
