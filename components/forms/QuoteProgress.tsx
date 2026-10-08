import { quoteContent } from "@/content/quote";
import { cn } from "@/lib/utils";

type QuoteProgressProps = {
  current: number;
};

export function QuoteProgress({ current }: QuoteProgressProps) {
  return (
    <ol className="grid grid-cols-6 gap-2" aria-label="Progression du devis">
      {quoteContent.steps.map((step) => {
        const active = step.id === current;
        const done = step.id < current;

        return (
          <li key={step.id} className="min-w-0">
            <span
              className={cn(
                "block h-1 rounded-sm",
                done || active ? "bg-accent" : "bg-line",
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "mt-2 hidden text-xs font-medium tracking-wide sm:block",
                active ? "text-navy" : "text-ink-muted",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span className="sr-only">
                {active ? "Étape en cours : " : done ? "Étape terminée : " : "Étape à venir : "}
              </span>
              {step.id}. {step.title}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
