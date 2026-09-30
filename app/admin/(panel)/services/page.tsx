import Link from "next/link";
import { getServicesContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";

export default function AdminServicesIndexPage() {
  const services = getServicesContent();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-forest">Services</h1>
        <p className="mt-1 text-sm text-ink-muted">
          <Link href={routes.admin} className="underline underline-offset-4">
            ← Retour
          </Link>
        </p>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        Sélectionnez un service à modifier. La liste des services est fixe ;
        seul leur contenu est éditable.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={routes.adminService(service.slug)}
            className="block rounded-lg border border-stone-200 bg-white p-5 hover:border-forest"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-ink">{service.title}</h2>
              {service.featured ? (
                <span className="rounded-full bg-forest/10 px-2 py-0.5 text-xs font-medium text-forest">
                  En avant
                </span>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
              {service.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
