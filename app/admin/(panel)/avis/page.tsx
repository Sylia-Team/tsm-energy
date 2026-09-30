import Link from "next/link";
import { getReviewsConfig } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveReviewsAction } from "./actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
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
  const apiKeyConfigured = Boolean(process.env.GOOGLE_PLACES_API_KEY);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">Avis Google</h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <Link
          href={routes.home}
          target="_blank"
          className="text-sm font-medium text-forest underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved} />

      <div
        className={`mt-4 rounded-md px-4 py-3 text-sm ${
          apiKeyConfigured
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-800"
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
              className="h-4 w-4 rounded border-stone-300"
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

        <SaveBar />
      </form>
    </div>
  );
}
