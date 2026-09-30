import Link from "next/link";
import { getCertificationsContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import {
  addCertificationAction,
  deleteCertificationAction,
  saveCertificationsAction,
} from "./actions";
import {
  SaveBar,
  SavedNotice,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminCertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const certifications = getCertificationsContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">
            Certifications & garanties
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <form action={addCertificationAction}>
          <button
            type="submit"
            className="rounded-md bg-forest px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + Ajouter
          </button>
        </form>
      </div>

      <p className="mt-3 rounded-md bg-amber-50 px-4 py-2 text-sm text-amber-800">
        N’indiquez que des qualifications réellement détenues. Ne pas inventer de
        label.
      </p>

      <SavedNotice saved={saved === "1"} />

      <form action={saveCertificationsAction} className="mt-6 grid gap-4">
        <input type="hidden" name="count" value={certifications.length} />

        {certifications.map((certification, index) => (
          <div
            key={certification.id}
            className="rounded-lg border border-stone-200 bg-white p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase text-ink-muted">
                Certification {index + 1}
              </p>
              <button
                type="submit"
                formAction={deleteCertificationAction}
                name="id"
                value={certification.id}
                className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
            <input
              type="hidden"
              name={`items.${index}.id`}
              value={certification.id}
            />
            <div className="grid gap-4">
              <TextField
                name={`items.${index}.name`}
                label="Nom"
                defaultValue={certification.name}
              />
              <TextAreaField
                name={`items.${index}.description`}
                label="Description"
                defaultValue={certification.description}
              />
            </div>
          </div>
        ))}

        {certifications.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-300 p-6 text-sm text-ink-muted">
            Aucune certification. Cliquez sur « Ajouter ».
          </p>
        ) : null}

        <SaveBar />
      </form>
    </div>
  );
}
