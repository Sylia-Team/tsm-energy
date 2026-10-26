import Link from "next/link";
import { IconArrow } from "@/components/ui/icons";
import { textLinkClassName } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { ServiceSummary } from "@/types/content";

type ServiceCardProps = {
  service: ServiceSummary;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper-elevated p-8 transition-colors duration-300 hover:border-navy">
      <h3 className="font-display text-3xl text-navy">
        <Link href={routes.service(service.slug)} className="transition-colors hover:text-brass">
          {service.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        {service.excerpt}
      </p>
      <Link
        href={routes.service(service.slug)}
        className={cn(textLinkClassName, "mt-8")}
      >
        Voir le service
        <IconArrow className="h-4 w-4" />
      </Link>
    </article>
  );
}
