import Link from "next/link";
import { getAvisPageContent, getReviewsConfig } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveReviewsAction } from "./actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const params = await searchParams;
  const saved = params.saved === "1";
  const config = getReviewsConfig();
  const page = getAvisPageContent();
  const apiKeyConfigured = Boolean(process.env.GOOGLE_PLACES_API_KEY);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Avis clients</h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <Link
          href={routes.avis}
          target="_blank"
          className="text-sm font-medium text-navy underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved} />

      <div
        className={`mt-4 rounded-md px-4 py-3 text-sm ${
          apiKeyConfigured
            ? "bg-success/10 text-success"
            : "bg-mist text-navy"
        }`}
      >
        {apiKeyConfigured ? (
          <>Clé API Google détectée (variable d’environnement).</>
        ) : (
          <>
            Clé API absente : ajoutez <code>GOOGLE_PLACES_API_KEY</code> dans vos
            variables d’environnement. Sans elle, les avis manuels s’affichent en
            repli.
          </>
        )}
      </div>

      <form action={saveReviewsAction} className="mt-6 grid gap-6">
        <SectionCard title="Configuration">
          <label className="flex items-center gap-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              name="enabled"
              value="true"
              defaultChecked={config.enabled}
              className="h-4 w-4 rounded border-line"
            />
            Activer l’affichage des avis Google
          </label>

          <TextField
            name="placeId"
            label="Place ID de la fiche Google"
            defaultValue={config.placeId}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="minRating"
              label="Note minimale affichée (1 à 5)"
              type="number"
              defaultValue={config.minRating}
            />
            <TextField
              name="maxItems"
              label="Nombre maximum d’avis (1 à 20)"
              type="number"
              defaultValue={config.maxItems}
            />
          </div>

          <p className="text-xs text-ink-muted">
            Le Place ID se trouve via l’outil « Place ID Finder » de Google Maps
            Platform. En cas de désactivation ou d’absence d’avis, les avis
            manuels sont affichés automatiquement.
          </p>
        </SectionCard>

        <SectionCard title="Page « Avis clients »">
          <TextField name="page.eyebrow" label="Sur-titre" defaultValue={page.eyebrow} />
          <TextField name="page.title" label="Titre" defaultValue={page.title} />
          <TextAreaField
            name="page.description"
            label="Introduction"
            defaultValue={page.description}
          />
          <TextField name="page.seoTitle" label="Titre SEO" defaultValue={page.seoTitle} />
          <TextAreaField
            name="page.seoDescription"
            label="Description SEO"
            defaultValue={page.seoDescription}
          />
          <TextField
            name="page.ctaTitle"
            label="Appel à l’action : titre"
            defaultValue={page.ctaTitle}
          />
          <TextAreaField
            name="page.ctaDescription"
            label="Appel à l’action : description"
            defaultValue={page.ctaDescription}
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
