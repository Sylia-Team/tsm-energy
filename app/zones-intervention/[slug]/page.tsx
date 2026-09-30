import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZonePage } from "@/components/zones/ZonePage";
import { getTestimonialsForZone } from "@/lib/content";
import {
  getRealisationsByZoneContent,
  getRelatedZonesContent,
  getServicesForZoneContent,
  getSiteContent,
  getZoneContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";
import { ZONE_SLUGS } from "@/types/content";

type ZoneRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ZONE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ZoneRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZoneContent(slug);

  if (!zone) {
    return { title: "Zone introuvable" };
  }

  return pageMetadata({
    title: zone.seoTitle,
    description: zone.seoDescription,
    path: routes.zone(zone.slug),
    image: zone.hero.image,
  });
}

export default async function ZoneDetailPage({ params }: ZoneRouteProps) {
  const { slug } = await params;
  const zone = getZoneContent(slug);

  if (!zone) {
    notFound();
  }

  const site = getSiteContent();
  const realisations = getRealisationsByZoneContent(zone.slug);
  const services = getServicesForZoneContent(zone.slug);
  const relatedZones = getRelatedZonesContent(zone.slug);
  const testimonials = getTestimonialsForZone(zone.slug);

  return (
    <ZonePage
      zone={zone}
      realisations={realisations}
      services={services}
      relatedZones={relatedZones}
      testimonials={testimonials}
      site={site}
    />
  );
}
