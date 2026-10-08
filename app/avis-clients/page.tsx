import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { GoogleReviews } from "@/components/marketing/GoogleReviews";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Container } from "@/components/ui/container";
import { getAvisPageContent, getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const page = getAvisPageContent();
  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: routes.avis,
  });
}

export default function AvisClientsPage() {
  const page = getAvisPageContent();
  const site = getSiteContent();

  return (
    <>
      <Container className="py-16 lg:py-24">
        <PageHeader
          currentPath={routes.avis}
          breadcrumb={[
            { label: "Accueil", href: routes.home },
            { label: "Avis clients" },
          ]}
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
        />
        <GoogleReviews />
      </Container>
      <CTASection
        title={page.ctaTitle}
        description={page.ctaDescription}
        primaryLabel="Demander un devis"
        secondaryLabel="Nous appeler"
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="avis_cta"
      />
    </>
  );
}
