import type { ServiceBlockItem } from "@/types/content";

type MethodStepsProps = {
  steps: ServiceBlockItem[];
};

export function MethodSteps({ steps }: MethodStepsProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="border border-line bg-paper-elevated p-6"
        >
          <p className="inline-block border-b-2 border-brand-green pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Étape {index + 1}
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-navy">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
