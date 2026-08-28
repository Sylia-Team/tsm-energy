import { certifications } from "@/content/certifications";
import { contact } from "@/content/contact";
import { entreprise } from "@/content/entreprise";
import { home } from "@/content/home";
import { quoteContent } from "@/content/quote";
import { realisations } from "@/content/realisations";
import { realisationsListing } from "@/content/realisations-listing";
import { services } from "@/content/services";
import { servicesListing } from "@/content/services-listing";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { zones } from "@/content/zones";
import { zonesListing } from "@/content/zones-listing";
import {
  SERVICE_SLUGS,
  ZONE_SLUGS,
  type Certification,
  type Realisation,
  type Service,
  type ServiceSlug,
  type Testimonial,
  type Zone,
  type ZoneSlug,
} from "@/types/content";
import type { HomeContent } from "@/types/home";
import type { ContactContent } from "@/types/contact";
import type { EntrepriseContent } from "@/types/entreprise";
import type { SiteConfig } from "@/types/site";

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function isZoneSlug(value: string): value is ZoneSlug {
  return (ZONE_SLUGS as readonly string[]).includes(value);
}

export function getSite(): SiteConfig {
  return site;
}

export function getHome(): HomeContent {
  return home;
}

export function getEntreprise(): EntrepriseContent {
  return entreprise;
}

export function getContact(): ContactContent {
  return contact;
}

export function getServicesListing() {
  return servicesListing;
}

export function getRealisationsListing() {
  return realisationsListing;
}

export function getZonesListing() {
  return zonesListing;
}

export function getQuoteContent() {
  return quoteContent;
}

export function getServices(): Service[] {
  return services;
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured);
}

export function getService(slug: string): Service | undefined {
  if (!isServiceSlug(slug)) {
    return undefined;
  }
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: ServiceSlug, limit = 3): Service[] {
  return services.filter((service) => service.slug !== slug).slice(0, limit);
}

export function getZones(): Zone[] {
  return zones;
}

export function getZone(slug: string): Zone | undefined {
  if (!isZoneSlug(slug)) {
    return undefined;
  }
  return zones.find((zone) => zone.slug === slug);
}

export function getRelatedZones(slug: ZoneSlug, limit = 4): Zone[] {
  return zones.filter((zone) => zone.slug !== slug).slice(0, limit);
}

export function getRealisations(): Realisation[] {
  return realisations;
}

export function getRealisation(slug: string): Realisation | undefined {
  return realisations.find((item) => item.slug === slug);
}

export function getFeaturedRealisations(): Realisation[] {
  return realisations.filter((item) => item.featured);
}

export function getRealisationsByService(slug: ServiceSlug): Realisation[] {
  return realisations.filter((item) => item.serviceSlugs.includes(slug));
}

export function getRealisationsByZone(slug: ZoneSlug): Realisation[] {
  return realisations.filter((item) => item.zoneSlug === slug);
}

export function getRelatedRealisations(slug: string, limit = 3): Realisation[] {
  const current = getRealisation(slug);

  if (!current) {
    return [];
  }

  const others = realisations.filter((item) => item.slug !== slug);
  const sameZone = others.filter((item) => item.zoneSlug === current.zoneSlug);
  const otherZones = others.filter((item) => item.zoneSlug !== current.zoneSlug);

  return [...sameZone, ...otherZones].slice(0, limit);
}

export function getServicesBySlugs(slugs: ServiceSlug[]): Service[] {
  return slugs.flatMap((slug) => {
    const service = getService(slug);
    return service ? [service] : [];
  });
}

export function getServicesForZone(slug: ZoneSlug, min = 3): Service[] {
  const localSlugs = [
    ...new Set(
      getRealisationsByZone(slug).flatMap((item) => item.serviceSlugs),
    ),
  ];
  const local = getServicesBySlugs(localSlugs);

  if (local.length >= min) {
    return local;
  }

  const extras = getFeaturedServices().filter(
    (service) => !local.some((item) => item.slug === service.slug),
  );

  return [...local, ...extras].slice(0, min);
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getTestimonialsForZone(slug: ZoneSlug): Testimonial[] {
  const zone = getZone(slug);

  if (!zone) {
    return [];
  }

  return testimonials.filter((item) => item.city === zone.name);
}

export function getCertifications(): Certification[] {
  return certifications;
}
