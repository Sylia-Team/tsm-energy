import { cn } from "@/lib/utils";

type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceCardsProps = {
  name: string;
  legend: string;
  options: ChoiceOption[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function ChoiceCards({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: ChoiceCardsProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset>
      <legend className="text-sm font-medium tracking-wide text-forest">
        {legend}
      </legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;
          const optionId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex min-h-11 cursor-pointer items-center border px-4 py-3 text-sm font-medium tracking-wide transition-colors duration-150",
                selected
                  ? "border-forest bg-paper-elevated text-forest"
                  : "border-line bg-paper-elevated text-ink hover:border-forest",
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
                aria-describedby={errorId}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
