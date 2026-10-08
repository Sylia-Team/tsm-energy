import Link from "next/link";
import { getContactContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveContactAction } from "./actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const params = await searchParams;
  const saved = params.saved === "1";
  const page = getContactContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Page « Contact »</h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <Link
          href={routes.contact}
          target="_blank"
          className="text-sm font-medium text-navy underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved} />

      <form action={saveContactAction} className="mt-6 grid gap-6">
        <SectionCard title="En-tête">
          <TextField name="eyebrow" label="Sur-titre" defaultValue={page.eyebrow} />
          <TextField name="title" label="Titre" defaultValue={page.title} />
          <TextAreaField
            name="description"
            label="Description"
            defaultValue={page.description}
          />
          <TextAreaField
            name="quoteHint"
            label="Encart devis"
            defaultValue={page.quoteHint}
          />
        </SectionCard>

        <SectionCard title="Référencement (SEO)">
          <TextField
            name="seoTitle"
            label="Titre SEO"
            defaultValue={page.seoTitle}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={page.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Libellés des coordonnées">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="quoteLabel"
              label="Libellé devis"
              defaultValue={page.quoteLabel}
            />
            <TextField
              name="phoneLabel"
              label="Libellé téléphone"
              defaultValue={page.phoneLabel}
            />
            <TextField
              name="emailLabel"
              label="Libellé e-mail"
              defaultValue={page.emailLabel}
            />
            <TextField
              name="addressLabel"
              label="Libellé adresse"
              defaultValue={page.addressLabel}
            />
            <TextField
              name="hoursLabel"
              label="Libellé horaires"
              defaultValue={page.hoursLabel}
            />
            <TextField
              name="mapsLabel"
              label="Libellé itinéraire"
              defaultValue={page.mapsLabel}
            />
          </div>
        </SectionCard>

        <SectionCard title="Appel à l’action final">
          <TextField name="ctaTitle" label="Titre" defaultValue={page.ctaTitle} />
          <TextAreaField
            name="ctaDescription"
            label="Description"
            defaultValue={page.ctaDescription}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="primaryLabel"
              label="Bouton principal"
              defaultValue={page.primaryLabel}
            />
            <TextField
              name="secondaryLabel"
              label="Bouton secondaire"
              defaultValue={page.secondaryLabel}
            />
          </div>
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
