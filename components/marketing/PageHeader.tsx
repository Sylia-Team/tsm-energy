import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Eyebrow } from "@/components/ui/eyebrow";
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
      {eyebrow ? <Eyebrow className="mt-14">{eyebrow}</Eyebrow> : null}
      <h1
        className={cn(
          "max-w-4xl font-display text-5xl text-navy lg:text-[4.5rem]",
          eyebrow ? "mt-6" : "mt-14",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
