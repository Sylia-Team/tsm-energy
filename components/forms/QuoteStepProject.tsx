import { ChoiceCards } from "@/components/forms/ChoiceCards";
import { Field, TextInput } from "@/components/ui/field";
import { quoteContent } from "@/content/quote";
import { PROJECT_TYPES } from "@/types/leads";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepProjectProps = {
  draft: QuoteDraft;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepProject({
  draft,
  errors,
  onChange,
}: QuoteStepProjectProps) {
  return (
    <div className="space-y-6">
      <ChoiceCards
        name="projectType"
        legend="Quel est votre projet ?"
        value={draft.projectType}
        error={errors.projectType}
        options={PROJECT_TYPES.map((value) => ({
          value,
          label: quoteContent.projectTypes[value],
        }))}
        onChange={(projectType) =>
          onChange({
            projectType,
            projectTypeOther:
              projectType === "autre" ? draft.projectTypeOther : "",
          })
        }
      />
      {draft.projectType === "autre" ? (
        <Field
          id="projectTypeOther"
          label="Précisez le projet"
          error={errors.projectTypeOther}
        >
          <TextInput
            value={draft.projectTypeOther}
            onChange={(event) =>
              onChange({ projectTypeOther: event.target.value })
            }
            autoComplete="off"
          />
        </Field>
      ) : null}
    </div>
  );
}
