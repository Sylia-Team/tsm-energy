import type { Metadata } from "next";
import Link from "next/link";
import { EditorialRealisations } from "@/components/home/EditorialRealisations";
import { HomeIntro } from "@/components/home/HomeIntro";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { TrustBand } from "@/components/home/TrustBand";
import { CTASection } from "@/components/marketing/CTASection";
import { Hero } from "@/components/marketing/Hero";
import { ManagerQuote } from "@/components/marketing/ManagerQuote";
import { MediaSplit } from "@/components/marketing/MediaSplit";
import { textLinkClassName } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconArrow } from "@/components/ui/icons";
import {
  getCertificationsContent,
  getEntrepriseContent,
  getFeaturedRealisationsContent,
  getFeaturedServicesContent,
  getHomeContent,
  getSiteContent,
  getZonesContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const home = getHomeContent();
  const site = getSiteContent();

  return pageMetadata({
    title: "Rénovation et entreprise générale du bâtiment dans le Var",
    description: site.description,
    path: routes.home,
    image: home.hero.image,
  });
}

export default function HomePage() {
  const home = getHomeContent();
  const site = getSiteContent();
  const services = getFeaturedServicesContent();
  const realisations = getFeaturedRealisationsContent();
  const certifications = getCertificationsContent();
  const zones = getZonesContent();
  const entreprise = getEntrepriseContent();

  return (
    <>
      <Hero
        size="full"
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

      <HomeIntro
        eyebrow={home.value.eyebrow}
        title={home.value.title}
        description={home.value.description}
        items={home.value.items}
      />

      <EditorialRealisations
        eyebrow={home.realisations.eyebrow}
        title={home.realisations.title}
        allLabel={home.realisations.allLabel}
        realisations={realisations}
      />

      <MediaSplit id="entreprise" image={home.about.image} side="left">
        <Eyebrow>{home.about.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-4xl text-navy lg:text-[3.25rem]">
          {home.about.title}
        </h2>
        <div className="mt-8 space-y-5">
          {home.about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[60ch] leading-relaxed text-ink-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <Link
          href={routes.entreprise}
          className={`${textLinkClassName} mt-10`}
        >
          {home.about.linkLabel}
          <IconArrow className="h-4 w-4" />
        </Link>
      </MediaSplit>

      <ServiceIndex
        eyebrow={home.services.eyebrow}
        title={home.services.title}
        description={home.services.description}
        allLabel={home.services.allLabel}
        services={services}
      />

      <ManagerQuote
        manager={entreprise.manager}
        href={routes.entreprise}
        linkLabel={home.about.linkLabel}
      />

      <TrustBand
        certificationsLabel={home.certifications.title}
        certifications={certifications}
        zonesLabel={home.zones.title}
        zones={zones}
      />

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
