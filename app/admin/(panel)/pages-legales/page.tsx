import Link from "next/link";
import { getLegalPageContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { LEGAL_SLUGS } from "@/types/legal";

export default function AdminLegalPagesIndexPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-navy">Pages légales</h1>
        <p className="mt-1 text-sm text-ink-muted">
          <Link href={routes.admin} className="underline underline-offset-4">
            ← Retour
          </Link>
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {LEGAL_SLUGS.map((slug) => {
          const page = getLegalPageContent(slug);
          return (
            <Link
              key={slug}
              href={routes.adminLegalPage(slug)}
              className="block rounded-lg border border-line bg-paper-elevated p-5 hover:border-navy"
            >
              <h2 className="font-semibold text-ink">{page.title}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Mise à jour : {page.updatedAt || "non renseignée"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
