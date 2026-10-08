import Image from "next/image";
import Link from "next/link";
import { getRealisationsContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { addRealisationAction, deleteRealisationAction } from "./actions";

export default function AdminRealisationsIndexPage() {
  const realisations = getRealisationsContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Réalisations</h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <form action={addRealisationAction}>
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            + Nouveau chantier
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-3">
        {realisations.map((realisation) => (
          <div
            key={realisation.slug}
            className="flex items-center justify-between gap-4 rounded-lg border border-line bg-paper-elevated p-4"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-mist">
              {realisation.image.src ? (
                <Image
                  src={realisation.image.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-semibold text-ink">
                  {realisation.name}
                </h2>
                {realisation.featured ? (
                  <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-medium text-navy">
                    En avant
                  </span>
                ) : null}
              </div>
              <p className="mt-1 truncate text-sm text-ink-muted">
                {realisation.city || "Ville non renseignée"} · /{realisation.slug}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={routes.adminRealisation(realisation.slug)}
                className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:border-navy"
              >
                Modifier
              </Link>
              <form action={deleteRealisationAction}>
                <input type="hidden" name="slug" value={realisation.slug} />
                <button
                  type="submit"
                  className="rounded-md border border-danger/30 px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger/10"
                >
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
        {realisations.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line p-6 text-sm text-ink-muted">
            Aucun chantier. Cliquez sur « Nouveau chantier » pour en créer un.
          </p>
        ) : null}
      </div>
    </div>
  );
}
