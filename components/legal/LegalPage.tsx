import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Container } from "@/components/ui/container";
import { getLegalPageContent } from "@/lib/admin/content-read";
import { parseLegalBody } from "@/lib/legal";
import { legalPaths, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";
import type { LegalSlug } from "@/types/legal";

export function legalPageMetadata(slug: LegalSlug): Metadata {
  const page = getLegalPageContent(slug);
  return pageMetadata({
    title: page.title,
    description: page.seoDescription,
    path: legalPaths[slug],
    index: false,
    follow: true,
  });
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = getLegalPageContent(slug);
  const blocks = parseLegalBody(page.body);

  return (
    <Container className="py-16 lg:py-24">
      <PageHeader
        currentPath={legalPaths[slug]}
        breadcrumb={[
          { label: "Accueil", href: routes.home },
          { label: page.title },
        ]}
        title={page.title}
      />
      {page.updatedAt ? (
        <p className="mt-4 text-sm text-ink-muted">
          Dernière mise à jour : {page.updatedAt}
        </p>
      ) : null}
      <div className="mt-12 max-w-[70ch]">
        {blocks.map((block, index) =>
          block.type === "heading" ? (
            <h2
              key={index}
              className="mt-10 text-xl font-semibold tracking-[-0.01em] text-navy first:mt-0 lg:text-2xl"
            >
              {block.text}
            </h2>
          ) : (
            <p key={index} className="mt-4 leading-relaxed text-ink-muted">
              {block.text}
            </p>
          ),
        )}
      </div>
    </Container>
  );
}
