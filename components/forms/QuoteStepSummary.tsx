import Link from "next/link";
import { quoteContent } from "@/content/quote";
import { routes } from "@/lib/routes";
import { isBudget, isProjectType, isTimeline } from "@/lib/validations/quote";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

type QuoteStepSummaryProps = {
  draft: QuoteDraft;
  fileCount: number;
  errors: QuoteFieldErrors;
  onChange: (patch: Partial<QuoteDraft>) => void;
};

function projectLabel(draft: QuoteDraft): string {
  if (!isProjectType(draft.projectType)) {
    return "—";
  }
  const label = quoteContent.projectTypes[draft.projectType];
  if (draft.projectType === "autre" && draft.projectTypeOther.trim()) {
    return `${label} (${draft.projectTypeOther.trim()})`;
  }
  return label;
}

export function QuoteStepSummary({
  draft,
  fileCount,
  errors,
  onChange,
}: QuoteStepSummaryProps) {
  return (
    <div className="space-y-8">
      <dl className="grid gap-4 border border-line bg-paper-elevated p-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Projet
          </dt>
          <dd className="mt-2 text-forest">{projectLabel(draft)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Localisation
          </dt>
          <dd className="mt-2 text-forest">
            {draft.postalCode} {draft.city}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Délai
          </dt>
          <dd className="mt-2 text-forest">
            {isTimeline(draft.timeline)
              ? quoteContent.timelines[draft.timeline]
              : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Budget
          </dt>
          <dd className="mt-2 text-forest">
            {isBudget(draft.budget) ? quoteContent.budgets[draft.budget] : "—"}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Description
          </dt>
          <dd className="mt-2 max-w-[65ch] leading-relaxed text-ink-muted">
            {draft.description}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Photos
          </dt>
          <dd className="mt-2 text-forest">
            {fileCount === 0
              ? "Aucune"
              : `${fileCount} fichier${fileCount > 1 ? "s" : ""}`}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Contact
          </dt>
          <dd className="mt-2 text-forest">
            {draft.firstName} {draft.lastName}
            <br />
            {draft.email}
            <br />
            {draft.phone}
          </dd>
        </div>
      </dl>

      <div>
        <label className="flex gap-3 text-sm leading-relaxed text-ink">
          <input
            type="checkbox"
            name="consent"
            checked={draft.consent}
            onChange={(event) => onChange({ consent: event.target.checked })}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-accent"
          />
          <span>
            {quoteContent.consent}{" "}
            <Link href={routes.privacy} className="underline underline-offset-4">
              Politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 text-sm text-danger" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>
    </div>
  );
}
