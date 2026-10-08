import Link from "next/link";
import { IconArrow } from "@/components/ui/icons";
import { routes } from "@/lib/routes";
import type { ServiceSummary } from "@/types/content";

type ServiceCardProps = {
  service: ServiceSummary;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper-elevated p-6 transition-colors duration-150 hover:border-navy">
      <h3 className="text-xl font-semibold tracking-[-0.01em] text-navy">
        <Link href={routes.service(service.slug)} className="hover:text-accent">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {service.excerpt}
      </p>
      <Link
        href={routes.service(service.slug)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
      >
        Voir le service
        <IconArrow className="h-4 w-4" />
      </Link>
    </article>
  );
}
