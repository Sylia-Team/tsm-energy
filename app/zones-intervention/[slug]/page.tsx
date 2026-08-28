import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZonePage } from "@/components/zones/ZonePage";
import {
  getRealisationsByZone,
  getRelatedZones,
  getServicesForZone,
  getSite,
  getTestimonialsForZone,
  getZone,
} from "@/lib/content";
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
  const zone = getZone(slug);

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
  const zone = getZone(slug);

  if (!zone) {
    notFound();
  }

  const site = getSite();
  const realisations = getRealisationsByZone(zone.slug);
  const services = getServicesForZone(zone.slug);
  const relatedZones = getRelatedZones(zone.slug);
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
