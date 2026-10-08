import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPageContent } from "@/lib/admin/content-read";
import { isLegalSlug } from "@/lib/legal";
import { legalPaths, routes } from "@/lib/routes";
import { saveLegalPageAction } from "../actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../../_components/fields";

export default async function AdminLegalPageEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;

  if (!isLegalSlug(slug)) {
    notFound();
  }

  const page = getLegalPageContent(slug);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">{page.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link
              href={routes.adminLegalPages}
              className="underline underline-offset-4"
            >
              ← Retour aux pages légales
            </Link>
          </p>
        </div>
        <Link
          href={legalPaths[slug]}
          target="_blank"
          className="text-sm font-medium text-navy underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved === "1"} />

      <form action={saveLegalPageAction} className="mt-6 grid gap-6">
        <input type="hidden" name="slug" value={slug} />

        <SectionCard title="En-tête">
          <TextField name="title" label="Titre" defaultValue={page.title} />
          <TextField
            name="updatedAt"
            label="Date de mise à jour"
            defaultValue={page.updatedAt}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={page.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Contenu">
          <TextAreaField
            name="body"
            label="Texte de la page"
            rows={24}
            defaultValue={page.body}
            hint="Une ligne commençant par « ## » devient un sous-titre. Séparez les paragraphes par une ligne vide."
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
