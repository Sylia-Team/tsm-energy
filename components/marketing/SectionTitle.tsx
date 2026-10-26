import { Eyebrow } from "@/components/ui/eyebrow";
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
        <Eyebrow inverted={inverted} centered={align === "center"}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "font-display text-4xl lg:text-[3.5rem]",
          eyebrow && "mt-6",
          inverted ? "text-paper" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-[60ch] text-base leading-relaxed lg:text-lg",
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
