import { Field, TextInput } from "@/components/ui/field";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepContactProps = {
  draft: QuoteDraft;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepContact({
  draft,
  errors,
  onChange,
}: QuoteStepContactProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id="firstName" label="Prénom" error={errors.firstName}>
        <TextInput
          autoComplete="given-name"
          value={draft.firstName}
          onChange={(event) => onChange({ firstName: event.target.value })}
        />
      </Field>
      <Field id="lastName" label="Nom" error={errors.lastName}>
        <TextInput
          autoComplete="family-name"
          value={draft.lastName}
          onChange={(event) => onChange({ lastName: event.target.value })}
        />
      </Field>
      <Field id="email" label="E-mail" error={errors.email}>
        <TextInput
          type="email"
          autoComplete="email"
          value={draft.email}
          onChange={(event) => onChange({ email: event.target.value })}
        />
      </Field>
      <Field id="phone" label="Téléphone" error={errors.phone}>
        <TextInput
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={draft.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
        />
      </Field>
    </div>
  );
}
