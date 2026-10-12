import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContactContent, getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const page = getContactContent();
  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: routes.contact,
  });
}

export default function ContactPage() {
  const page = getContactContent();
  const site = getSiteContent();

  return (
    <>
      <Container className="py-16 lg:py-24">
        <Breadcrumb
          currentPath={routes.contact}
          items={[
            { label: "Accueil", href: routes.home },
            { label: "Contact" },
          ]}
        />
        <Eyebrow className="mt-14">{page.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-navy lg:text-[4.5rem]">
          {page.title}
        </h1>
        <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
          {page.description}
        </p>
        <div className="mt-12">
          <ContactDetails site={site} content={page} />
        </div>
      </Container>
      <CTASection
        title={page.ctaTitle}
        description={page.ctaDescription}
        primaryLabel={page.primaryLabel}
        secondaryLabel={page.secondaryLabel}
        phone={site.phone}
        phoneHref={site.phoneHref}
        location="contact_cta"
      />
    </>
  );
}
