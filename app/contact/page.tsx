import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/container";
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
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {page.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy lg:text-[4rem]">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-muted lg:text-lg">
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
