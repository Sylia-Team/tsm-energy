import Link from "next/link";
import { getZonesContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";

export default function AdminZonesIndexPage() {
  const zones = getZonesContent();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-forest">
          Zones d’intervention
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          <Link href={routes.admin} className="underline underline-offset-4">
            ← Retour
          </Link>
        </p>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        Sélectionnez une commune à modifier. La liste des communes est fixe ;
        seul leur contenu est éditable.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {zones.map((zone) => (
          <Link
            key={zone.slug}
            href={routes.adminZone(zone.slug)}
            className="block rounded-lg border border-stone-200 bg-white p-5 hover:border-forest"
          >
            <h2 className="font-semibold text-ink">{zone.name}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
              {zone.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
