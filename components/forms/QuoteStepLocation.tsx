"use client";

import { useEffect, useState } from "react";
import { Field, TextInput } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepLocationProps = {
  draft: QuoteDraft;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

const POSTAL_PATTERN = /^\d{5}$/;

export function QuoteStepLocation({
  draft,
  errors,
  onChange,
}: QuoteStepLocationProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const postalCode = draft.postalCode.trim();

  useEffect(() => {
    const controller = new AbortController();

    async function load(): Promise<void> {
      if (!POSTAL_PATTERN.test(postalCode)) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`${routes.apiCommunes}?cp=${postalCode}`, {
          signal: controller.signal,
        });
        const data = response.ok ? ((await response.json()) as string[]) : [];
        setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        // Requête annulée ou réseau indisponible : saisie manuelle possible.
      }
    }

    void load();

    return () => controller.abort();
  }, [postalCode]);

  const hasSuggestions = suggestions.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="postalCode" label="Code postal" error={errors.postalCode}>
          <TextInput
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={draft.postalCode}
            onChange={(event) =>
              onChange({
                postalCode: event.target.value.replace(/\D/g, "").slice(0, 5),
              })
            }
          />
        </Field>
        <Field id="city" label="Commune" error={errors.city}>
          <TextInput
            autoComplete="address-level2"
            value={draft.city}
            onChange={(event) => onChange({ city: event.target.value })}
          />
        </Field>
      </div>

      {hasSuggestions ? (
        <div>
          <p className="text-xs font-medium tracking-wide text-ink-muted">
            {suggestions.length > 1
              ? "Sélectionnez votre commune :"
              : "Commune suggérée :"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((commune) => {
              const selected = commune === draft.city;
              return (
                <button
                  key={commune}
                  type="button"
                  onClick={() => onChange({ city: commune })}
                  className={cn(
                    "min-h-11 border px-3 py-2 text-sm tracking-wide transition-colors duration-150",
                    selected
                      ? "border-navy bg-navy/5 font-semibold text-navy ring-1 ring-navy"
                      : "border-line bg-paper-elevated text-ink hover:border-navy hover:bg-navy/5",
                  )}
                >
                  {commune}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
