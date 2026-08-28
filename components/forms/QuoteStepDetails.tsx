import { ChoiceCards } from "@/components/forms/ChoiceCards";
import { Field, TextArea } from "@/components/ui/field";
import { quoteContent } from "@/content/quote";
import { BUDGETS, TIMELINES } from "@/types/leads";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepDetailsProps = {
  draft: QuoteDraft;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

export function QuoteStepDetails({
  draft,
  errors,
  onChange,
}: QuoteStepDetailsProps) {
  return (
    <div className="space-y-8">
      <Field
        id="description"
        label="Description du projet"
        hint="Travaux envisagés, état du logement, contraintes d’accès."
        error={errors.description}
      >
        <TextArea
          value={draft.description}
          onChange={(event) => onChange({ description: event.target.value })}
          maxLength={2000}
        />
      </Field>
      <ChoiceCards
        name="timeline"
        legend="Délai souhaité"
        value={draft.timeline}
        error={errors.timeline}
        options={TIMELINES.map((value) => ({
          value,
          label: quoteContent.timelines[value],
        }))}
        onChange={(timeline) => onChange({ timeline })}
      />
      <ChoiceCards
        name="budget"
        legend="Budget indicatif"
        value={draft.budget}
        error={errors.budget}
        options={BUDGETS.map((value) => ({
          value,
          label: quoteContent.budgets[value],
        }))}
        onChange={(budget) => onChange({ budget })}
      />
    </div>
  );
}
