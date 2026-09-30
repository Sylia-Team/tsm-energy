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
                "flex min-h-11 cursor-pointer items-center gap-2 border px-4 py-3 text-sm tracking-wide transition-colors duration-150",
                selected
                  ? "border-forest bg-forest/5 font-semibold text-forest ring-1 ring-forest"
                  : "border-line bg-paper-elevated font-medium text-ink hover:border-forest hover:bg-forest/5",
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
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-forest" : "border-line",
                )}
              >
                {selected ? (
                  <span className="h-2 w-2 rounded-full bg-forest" />
                ) : null}
              </span>
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
