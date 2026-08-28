import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { CertificationCard } from "@/components/marketing/CertificationCard";
import { Hero } from "@/components/marketing/Hero";
import { LocationCard } from "@/components/marketing/LocationCard";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { ValuePropCard } from "@/components/marketing/ValuePropCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MethodSteps } from "@/components/services/MethodSteps";
import { Container } from "@/components/ui/container";
import {
  getCertifications,
  getEntreprise,
  getHome,
  getSite,
  getZones,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getEntreprise();
const site = getSite();
const home = getHome();

export const metadata: Metadata = pageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: routes.entreprise,
  image: page.image,
});

export default function EntreprisePage() {
  const certifications = getCertifications();
  const zones = getZones();

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
      <Section>
        <Container>
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
        </Container>
      </Section>
      <Section tone="stone">
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
      <Section>
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
      <Section tone="stone">
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
      <Section>
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
