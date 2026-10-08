import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  currentPath: string;
  breadcrumb: Array<{ label: string; href?: string }>;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

/** En-tête de page sans photo : fil d'Ariane, sur-titre, H1, introduction. */
export function PageHeader({
  currentPath,
  breadcrumb,
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={className}>
      <Breadcrumb currentPath={currentPath} items={breadcrumb} />
      {eyebrow ? (
        <p className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-brand-green" />
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "max-w-3xl font-display text-4xl text-navy lg:text-[4rem]",
          eyebrow ? "mt-3" : "mt-10",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-muted lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
