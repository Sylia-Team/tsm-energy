import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { CertificationCard } from "@/components/marketing/CertificationCard";
import { Hero } from "@/components/marketing/Hero";
import { LocationCard } from "@/components/marketing/LocationCard";
import { MediaSplit } from "@/components/marketing/MediaSplit";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { ValuePropCard } from "@/components/marketing/ValuePropCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MethodSteps } from "@/components/services/MethodSteps";
import { Container } from "@/components/ui/container";
import {
  getCertificationsContent,
  getEntrepriseContent,
  getHomeContent,
  getSiteContent,
  getZonesContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const page = getEntrepriseContent();
  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: routes.entreprise,
    image: page.image,
  });
}

export default function EntreprisePage() {
  const page = getEntrepriseContent();
  const site = getSiteContent();
  const home = getHomeContent();
  const certifications = getCertificationsContent();
  const zones = getZonesContent();

  return (
    <>
      <Hero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.image}
        primaryCta="Demander un devis"
        secondaryCta="Appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation="entreprise_hero"
      />
      <Container className="pt-8">
        <Breadcrumb
          currentPath={routes.entreprise}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "L’entreprise" },
          ]}
        />
      </Container>
      <MediaSplit image={page.storyImage}>
        <SectionTitle title={page.storyTitle} />
        <div className="mt-6 space-y-4">
          {page.story.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[65ch] leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </MediaSplit>
      <MediaSplit image={page.manager.image} side="right" tone="mist">
        <SectionTitle eyebrow={page.manager.eyebrow} title={page.manager.name} />
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-ink-muted">
          {page.manager.role}
        </p>
        <blockquote className="mt-8 border-l-4 border-brand-green pl-5 text-xl font-semibold leading-snug text-navy lg:text-2xl">
          « {page.manager.quote} »
        </blockquote>
        <div className="mt-8 space-y-4">
          {page.manager.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[65ch] leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </MediaSplit>
      <Section>
        <Container>
          <SectionTitle
            eyebrow={home.value.eyebrow}
            title={home.value.title}
            description={home.value.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
            {home.value.items.map((item) => (
              <ValuePropCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <SectionTitle
            title={page.methodTitle}
            description={page.methodDescription}
          />
          <div className="mt-12">
            <MethodSteps steps={page.method} />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitle
            eyebrow={page.certificationsEyebrow}
            title={page.certificationsTitle}
            description={page.certificationsDescription}
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
          <SectionTitle
            eyebrow={page.zonesEyebrow}
            title={page.zonesTitle}
            description={page.zonesDescription}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {zones.map((zone) => (
              <LocationCard key={zone.slug} zone={zone} />
            ))}
          </div>
        </Container>
      </Section>
      <CTASection
        title={page.ctaTitle}
        description={page.ctaDescription}
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="entreprise_cta"
      />
    </>
  );
}
