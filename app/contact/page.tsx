import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/container";
import { getContact, getSite } from "@/lib/content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getContact();
const site = getSite();

export const metadata: Metadata = pageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: routes.contact,
});

export default function ContactPage() {
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
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.03em] text-forest lg:text-[3.5rem] lg:leading-[1.05]">
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
