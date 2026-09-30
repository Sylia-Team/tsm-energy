import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RealisationPage } from "@/components/realisations/RealisationPage";
import {
  getRealisationContent,
  getRealisationsContent,
  getRelatedRealisationsContent,
  getServicesBySlugsContent,
  getSiteContent,
  getZoneContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

type RealisationRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRealisationsContent().map((realisation) => ({
    slug: realisation.slug,
  }));
}

export async function generateMetadata({
  params,
}: RealisationRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const realisation = getRealisationContent(slug);

  if (!realisation) {
    return { title: "Réalisation introuvable" };
  }

  return pageMetadata({
    title: realisation.seoTitle,
    description: realisation.seoDescription,
    path: routes.realisation(realisation.slug),
    image: realisation.image,
  });
}

export default async function RealisationDetailPage({
  params,
}: RealisationRouteProps) {
  const { slug } = await params;
  const realisation = getRealisationContent(slug);

  if (!realisation) {
    notFound();
  }

  const site = getSiteContent();
  const services = getServicesBySlugsContent(realisation.serviceSlugs);
  const zone = getZoneContent(realisation.zoneSlug);
  const related = getRelatedRealisationsContent(realisation.slug);

  return (
    <RealisationPage
      realisation={realisation}
      services={services}
      zone={zone}
      related={related}
      site={site}
    />
  );
}
