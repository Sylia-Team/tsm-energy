import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import {
  getCertifications,
  getRealisationsByService,
  getRelatedServices,
  getService,
  getSite,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";
import { SERVICE_SLUGS } from "@/types/content";

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service introuvable" };
  }

  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: routes.service(service.slug),
    image: service.hero.image,
  });
}

export default async function ServiceDetailPage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const site = getSite();
  const realisations = getRealisationsByService(service.slug);
  const relatedServices = getRelatedServices(service.slug);
  const certifications = getCertifications();

  return (
    <ServicePage
      service={service}
      realisations={realisations}
      relatedServices={relatedServices}
      certifications={certifications}
      site={site}
    />
  );
}
