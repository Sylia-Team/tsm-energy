/**
 * Accès serveur au contenu éditable : fusionne les valeurs par défaut
 * (`content/*.ts`) avec les overrides d'administration (`data/`).
 *
 * ⚠️ Ce module dépend de `node:fs` : il ne doit être importé QUE côté serveur
 * (pages/layouts Server Components, Server Actions). Les Client Components
 * continuent d'utiliser `lib/content.ts` (valeurs par défaut, sans fs).
 */
import { home } from "@/content/home";
import { entreprise } from "@/content/entreprise";
import { contact } from "@/content/contact";
import { reviewsConfig } from "@/content/reviews";
import { services } from "@/content/services";
import { zones } from "@/content/zones";
import { realisations } from "@/content/realisations";
import { certifications } from "@/content/certifications";
import { servicesListing } from "@/content/services-listing";
import { zonesListing } from "@/content/zones-listing";
import { realisationsListing } from "@/content/realisations-listing";
import { site } from "@/content/site";
import type { HomeContent } from "@/types/home";
import type { EntrepriseContent } from "@/types/entreprise";
import type { ContactContent } from "@/types/contact";
import type { ReviewsConfig } from "@/types/reviews";
import type { SiteConfig } from "@/types/site";
import type {
  Certification,
  Realisation,
  Service,
  ServiceSlug,
  Zone,
  ZoneSlug,
} from "@/types/content";

type ServicesListing = typeof servicesListing;
type ZonesListing = typeof zonesListing;
type RealisationsListing = typeof realisationsListing;
import { deepMerge, readOverride } from "@/lib/admin/content-store";

type ServiceOverrides = Partial<Record<ServiceSlug, Service>>;
type ZoneOverrides = Partial<Record<ZoneSlug, Zone>>;

export function getHomeContent(): HomeContent {
  return deepMerge(home, readOverride<HomeContent>("home"));
}

export function getEntrepriseContent(): EntrepriseContent {
  return deepMerge(entreprise, readOverride<EntrepriseContent>("entreprise"));
}

export function getContactContent(): ContactContent {
  return deepMerge(contact, readOverride<ContactContent>("contact"));
}

export function getReviewsConfig(): ReviewsConfig {
  return deepMerge(reviewsConfig, readOverride<ReviewsConfig>("reviews"));
}

export function getSiteContent(): SiteConfig {
  return deepMerge(site, readOverride<SiteConfig>("site"));
}

export function getServicesListingContent(): ServicesListing {
  return deepMerge(
    servicesListing,
    readOverride<ServicesListing>("servicesListing"),
  );
}

export function getZonesListingContent(): ZonesListing {
  return deepMerge(zonesListing, readOverride<ZonesListing>("zonesListing"));
}

export function getRealisationsListingContent(): RealisationsListing {
  return deepMerge(
    realisationsListing,
    readOverride<RealisationsListing>("realisationsListing"),
  );
}

export function getCertificationsContent(): Certification[] {
  return readOverride<Certification[]>("certifications") ?? certifications;
}

export function getServicesContent(): Service[] {
  const overrides = readOverride<ServiceOverrides>("services") ?? {};
  return services.map((service) => deepMerge(service, overrides[service.slug]));
}

export function getServiceContent(slug: string): Service | undefined {
  return getServicesContent().find((service) => service.slug === slug);
}

export function getFeaturedServicesContent(): Service[] {
  return getServicesContent().filter((service) => service.featured);
}

export function getRelatedServicesContent(slug: string, limit = 3): Service[] {
  return getServicesContent()
    .filter((service) => service.slug !== slug)
    .slice(0, limit);
}

export function getZonesContent(): Zone[] {
  const overrides = readOverride<ZoneOverrides>("zones") ?? {};
  return zones.map((zone) => deepMerge(zone, overrides[zone.slug]));
}

export function getZoneContent(slug: string): Zone | undefined {
  return getZonesContent().find((zone) => zone.slug === slug);
}

export function getRelatedZonesContent(slug: string, limit = 4): Zone[] {
  return getZonesContent()
    .filter((zone) => zone.slug !== slug)
    .slice(0, limit);
}

export function getServicesBySlugsContent(slugs: ServiceSlug[]): Service[] {
  const all = getServicesContent();
  return slugs.flatMap((slug) => {
    const service = all.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
}

export function getRealisationsContent(): Realisation[] {
  return readOverride<Realisation[]>("realisations") ?? realisations;
}

export function getRealisationContent(slug: string): Realisation | undefined {
  return getRealisationsContent().find((item) => item.slug === slug);
}

export function getFeaturedRealisationsContent(): Realisation[] {
  return getRealisationsContent().filter((item) => item.featured);
}

export function getRealisationsByServiceContent(
  slug: ServiceSlug,
): Realisation[] {
  return getRealisationsContent().filter((item) =>
    item.serviceSlugs.includes(slug),
  );
}

export function getRealisationsByZoneContent(slug: ZoneSlug): Realisation[] {
  return getRealisationsContent().filter((item) => item.zoneSlug === slug);
}

export function getRelatedRealisationsContent(
  slug: string,
  limit = 3,
): Realisation[] {
  const current = getRealisationContent(slug);

  if (!current) {
    return [];
  }

  const others = getRealisationsContent().filter((item) => item.slug !== slug);
  const sameZone = others.filter((item) => item.zoneSlug === current.zoneSlug);
  const otherZones = others.filter((item) => item.zoneSlug !== current.zoneSlug);

  return [...sameZone, ...otherZones].slice(0, limit);
}

export function getServicesForZoneContent(slug: string, min = 3): Service[] {
  const localSlugs = [
    ...new Set(
      getRealisationsByZoneContent(slug as ZoneSlug).flatMap(
        (item) => item.serviceSlugs,
      ),
    ),
  ];
  const all = getServicesContent();
  const local = localSlugs.flatMap((serviceSlug) => {
    const service = all.find((item) => item.slug === serviceSlug);
    return service ? [service] : [];
  });

  if (local.length >= min) {
    return local;
  }

  const extras = all.filter(
    (service) =>
      service.featured && !local.some((item) => item.slug === service.slug),
  );

  return [...local, ...extras].slice(0, min);
}
