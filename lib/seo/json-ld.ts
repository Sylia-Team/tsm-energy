import { getZones } from "@/lib/content";
import {
  absoluteUrl,
  localBusinessId,
  siteOrigin,
} from "@/lib/seo/url";
import type { FaqItem, Realisation, Service, Zone } from "@/types/content";
import type { SiteConfig } from "@/types/site";

export type BreadcrumbTrailItem = {
  label: string;
  href?: string;
};

export type JsonLdNode = Record<string, unknown>;

export function localBusinessJsonLd(site: SiteConfig): JsonLdNode {
  const origin = siteOrigin(site.url);
  const node: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": localBusinessId(origin),
    name: site.name,
    legalName: site.legalName,
    url: origin,
    description: site.description,
    areaServed: areaServedJsonLd(),
  };

  if (site.phoneStatus === "confirmed") {
    const telephone = telephoneFromHref(site.phoneHref);
    if (telephone) {
      node.telephone = telephone;
    }
  }

  node.address = postalAddressJsonLd(site);

  return node;
}

export function serviceJsonLd(service: Service, origin?: string): JsonLdNode {
  const base = origin ?? siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: absoluteUrl(`/services/${service.slug}`, base),
    serviceType: service.shortTitle,
    provider: { "@id": localBusinessId(base) },
    areaServed: { "@type": "AdministrativeArea", name: "Var" },
  };
}

export function faqPageJsonLd(items: FaqItem[]): JsonLdNode | null {
  if (items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function creativeWorkJsonLd(
  realisation: Realisation,
  origin?: string,
): JsonLdNode {
  const base = origin ?? siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: realisation.name,
    description: realisation.seoDescription,
    url: absoluteUrl(`/realisations/${realisation.slug}`, base),
    ...(realisation.image.src ? { image: realisation.image.src } : {}),
    contentLocation: {
      "@type": "Place",
      name: realisation.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: realisation.city,
        addressRegion: "Var",
        addressCountry: "FR",
      },
    },
    about: realisation.trades,
    creator: { "@id": localBusinessId(base) },
  };
}

export function breadcrumbListJsonLd(
  items: BreadcrumbTrailItem[],
  currentPath: string,
  origin?: string,
): JsonLdNode | null {
  if (items.length === 0) {
    return null;
  }

  const base = origin ?? siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const path = isLast ? currentPath : item.href;
      const element: JsonLdNode = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };

      if (path) {
        element.item = absoluteUrl(path, base);
      }

      return element;
    }),
  };
}

export function areaServedJsonLd(zones: Zone[] = getZones()): JsonLdNode[] {
  return [
    { "@type": "AdministrativeArea", name: "Var" },
    ...zones.map((zone) => ({
      "@type": "City",
      name: zone.name,
    })),
  ];
}

function postalAddressJsonLd(site: SiteConfig): JsonLdNode {
  const address: JsonLdNode = {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "FR",
  };

  if (site.addressStatus === "confirmed") {
    address.streetAddress = site.address.additional
      ? `${site.address.additional}, ${site.address.street}`
      : site.address.street;
    address.postalCode = site.address.postalCode;
  }

  return address;
}

export function telephoneFromHref(href: string): string | null {
  if (!href.startsWith("tel:")) {
    return null;
  }

  return href.slice(4);
}
