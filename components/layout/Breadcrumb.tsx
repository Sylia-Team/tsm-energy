import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  currentPath: string;
  className?: string;
};

export function Breadcrumb({ items, currentPath, className }: BreadcrumbProps) {
  const jsonLd = breadcrumbListJsonLd(items, currentPath);

  return (
    <nav aria-label="Fil d’Ariane" className={cn("text-sm", className)}>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <ol className="flex flex-wrap items-center gap-2 text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-navy">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-navy" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
