import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";
import {
  getRealisationsContent,
  getServicesContent,
  getZonesContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { absoluteUrl, siteOrigin } from "@/lib/seo/url";

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export function getIndexableSitemapEntries(): SitemapEntry[] {
  const servicePages = getServicesContent().map((service) => ({
    path: routes.service(service.slug),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const realisationPages = getRealisationsContent().map((realisation) => ({
    path: routes.realisation(realisation.slug),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const zonePages = getZonesContent().map((zone) => ({
    path: routes.zone(zone.slug),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { path: routes.home, changeFrequency: "weekly", priority: 1 },
    { path: routes.services, changeFrequency: "weekly", priority: 0.9 },
    ...servicePages,
    { path: routes.realisations, changeFrequency: "weekly", priority: 0.7 },
    ...realisationPages,
    { path: routes.zones, changeFrequency: "weekly", priority: 0.8 },
    ...zonePages,
    { path: routes.entreprise, changeFrequency: "monthly", priority: 0.7 },
    { path: routes.contact, changeFrequency: "yearly", priority: 0.5 },
    { path: routes.quote, changeFrequency: "yearly", priority: 0.5 },
  ];
}

export function buildSitemap(origin = siteOrigin(getSite().url)): MetadataRoute.Sitemap {
  return getIndexableSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path, origin),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
