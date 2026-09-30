import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import {
  getCertificationsContent,
  getRealisationsByServiceContent,
  getRelatedServicesContent,
  getServiceContent,
  getSiteContent,
} from "@/lib/admin/content-read";
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
  const service = getServiceContent(slug);

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
  const service = getServiceContent(slug);

  if (!service) {
    notFound();
  }

  const site = getSiteContent();
  const realisations = getRealisationsByServiceContent(service.slug);
  const relatedServices = getRelatedServicesContent(service.slug);
  const certifications = getCertificationsContent();

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
