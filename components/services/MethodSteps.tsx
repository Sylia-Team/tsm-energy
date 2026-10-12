import type { ServiceBlockItem } from "@/types/content";

type MethodStepsProps = {
  steps: ServiceBlockItem[];
};

export function MethodSteps({ steps }: MethodStepsProps) {
  return (
    <ol className="grid gap-12 md:grid-cols-2 lg:gap-x-16">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="border-t border-line pt-8"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">
            Étape {index + 1}
          </p>
          <h3 className="mt-4 font-display text-2xl text-navy lg:text-[1.75rem]">
            {step.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
