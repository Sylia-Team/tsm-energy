import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
            align === "center" && "justify-center",
            inverted ? "text-paper/70" : "text-accent",
          )}
        >
          <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-brand-green" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-display text-3xl lg:text-[2.75rem]",
          inverted ? "text-paper" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-[65ch] text-base leading-relaxed lg:text-lg",
            align === "center" && "mx-auto",
            inverted ? "text-paper/75" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
