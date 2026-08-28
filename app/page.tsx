import type { Metadata } from "next";
import Link from "next/link";
import { CertificationCard } from "@/components/marketing/CertificationCard";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { LocationCard } from "@/components/marketing/LocationCard";
import { Section } from "@/components/marketing/Section";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { StatList } from "@/components/marketing/StatList";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { ValuePropCard } from "@/components/marketing/ValuePropCard";
import { RealisationCard } from "@/components/realisations/RealisationCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/container";
import { CoverImage } from "@/components/ui/cover-image";
import { IconArrow } from "@/components/ui/icons";
import {
  getCertifications,
  getFeaturedRealisations,
  getFeaturedServices,
  getHome,
  getSite,
  getTestimonials,
  getZones,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const home = getHome();
const site = getSite();

export const metadata: Metadata = pageMetadata({
  title: "Rénovation et entreprise générale du bâtiment dans le Var",
  description: site.description,
  path: routes.home,
  image: home.hero.image,
});

export default function HomePage() {
  const services = getFeaturedServices();
  const realisations = getFeaturedRealisations();
  const testimonials = getTestimonials();
  const certifications = getCertifications();
  const zones = getZones();

  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        description={home.hero.description}
        image={home.hero.image}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        phone={site.phone}
        phoneHref={site.phoneHref}
        ctaLocation="home_hero"
      />

      <Section>
        <Container>
          <SectionTitle
            eyebrow={home.value.eyebrow}
            title={home.value.title}
            description={home.value.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {home.value.items.map((item) => (
              <ValuePropCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="stone" id="services">
        <Container>
          <SectionTitle
            eyebrow={home.services.eyebrow}
            title={home.services.title}
            description={home.services.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={routes.services}
              className="inline-flex items-center gap-2 text-sm font-medium text-forest"
            >
              {home.services.allLabel}
              <IconArrow className="h-4 w-4" />
            </Link>
          </p>
        </Container>
      </Section>

      <Section id="entreprise">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow={home.about.eyebrow}
                title={home.about.title}
              />
              <div className="mt-6 space-y-4">
                {home.about.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[65ch] leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href={routes.entreprise}
                  className="inline-flex items-center gap-2 text-sm font-medium text-forest"
                >
                  {home.about.linkLabel}
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8">
                <ContactCTA
                  quoteLabel={home.hero.primaryCta}
                  phoneLabel={home.hero.secondaryCta}
                  phone={site.phone}
                  phoneHref={site.phoneHref}
                  location="home_about"
                />
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <CoverImage
                src={home.about.image.src}
                alt={home.about.image.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="stone" id="realisations">
        <Container>
          <SectionTitle
            eyebrow={home.realisations.eyebrow}
            title={home.realisations.title}
            description={home.realisations.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {realisations.map((realisation) => (
              <RealisationCard
                key={realisation.slug}
                realisation={realisation}
              />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={routes.realisations}
              className="inline-flex items-center gap-2 text-sm font-medium text-forest"
            >
              {home.realisations.allLabel}
              <IconArrow className="h-4 w-4" />
            </Link>
          </p>
        </Container>
      </Section>

      <Section tone="forest">
        <Container>
          <SectionTitle
            eyebrow={home.stats.eyebrow}
            title={home.stats.title}
            inverted
          />
          <StatList items={home.stats.items} />
        </Container>
      </Section>

      <Section id="garanties">
        <Container>
          <SectionTitle
            eyebrow={home.certifications.eyebrow}
            title={home.certifications.title}
            description={home.certifications.description}
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

      <Section tone="stone" id="avis">
        <Container>
          <SectionTitle
            eyebrow={home.testimonials.eyebrow}
            title={home.testimonials.title}
            description={home.testimonials.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={routes.avis}
              className="inline-flex items-center gap-2 text-sm font-medium text-forest"
            >
              {home.testimonials.allLabel}
              <IconArrow className="h-4 w-4" />
            </Link>
          </p>
        </Container>
      </Section>

      <Section id="zones">
        <Container>
          <SectionTitle
            eyebrow={home.zones.eyebrow}
            title={home.zones.title}
            description={home.zones.description}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {zones.map((zone) => (
              <LocationCard key={zone.slug} zone={zone} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={routes.zones}
              className="inline-flex items-center gap-2 text-sm font-medium text-forest"
            >
              {home.zones.allLabel}
              <IconArrow className="h-4 w-4" />
            </Link>
          </p>
        </Container>
      </Section>

      <CTASection
        title={home.cta.title}
        description={home.cta.description}
        primaryLabel={home.cta.primaryLabel}
        secondaryLabel={home.cta.secondaryLabel}
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="home_bottom"
      />
    </>
  );
}
