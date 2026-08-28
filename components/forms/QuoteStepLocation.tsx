import { Field, TextInput } from "@/components/ui/field";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepLocationProps = {
  draft: QuoteDraft;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepLocation({
  draft,
  errors,
  onChange,
}: QuoteStepLocationProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field
        id="postalCode"
        label="Code postal"
        error={errors.postalCode}
      >
        <TextInput
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={draft.postalCode}
          onChange={(event) => onChange({ postalCode: event.target.value })}
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
  );
}
