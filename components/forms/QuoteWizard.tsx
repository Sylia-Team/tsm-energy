"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitQuoteAction } from "@/app/demande-de-devis/actions";
import { QuoteProgress } from "@/components/forms/QuoteProgress";
import { QuoteStepContact } from "@/components/forms/QuoteStepContact";
import { QuoteStepDetails } from "@/components/forms/QuoteStepDetails";
import { QuoteStepLocation } from "@/components/forms/QuoteStepLocation";
import { QuoteStepPhotos } from "@/components/forms/QuoteStepPhotos";
import { QuoteStepProject } from "@/components/forms/QuoteStepProject";
import { QuoteStepSummary } from "@/components/forms/QuoteStepSummary";
import { buttonClassName } from "@/components/ui/button";
import { quoteContent } from "@/content/quote";
import { track } from "@/lib/analytics";
import { routes } from "@/lib/routes";
import {
  emptyQuoteDraft,
  isProjectType,
  validateQuoteStep,
} from "@/lib/validations/quote";
import type { QuoteDraft, QuoteFieldErrors } from "@/types/leads";

const LAST_STEP = quoteContent.steps.length;

function filesToMeta(files: File[]) {
  return files.map((file) => ({
    name: file.name,
    type: file.type,
    size: file.size,
  }));
}

export function QuoteWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<QuoteDraft>(() => {
    const initial = emptyQuoteDraft();
    const type = searchParams.get("type");
    const from = searchParams.get("from");
    return {
      ...initial,
      projectType: type && isProjectType(type) ? type : initial.projectType,
      source: from ?? initial.source,
    };
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    track("quote_start");
  }, []);

  function patchDraft(patch: Partial<QuoteDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setErrors({});
  }

  function goNext() {
    const stepErrors = validateQuoteStep(step, draft, filesToMeta(files));
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    track("quote_step_completed", { step });
    setErrors({});
    setStep((current) => Math.min(current + 1, LAST_STEP));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  function onSubmit() {
    const stepErrors = validateQuoteStep(6, draft, filesToMeta(files));
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    const formData = new FormData();
    formData.set("projectType", draft.projectType);
    formData.set("projectTypeOther", draft.projectTypeOther);
    formData.set("postalCode", draft.postalCode);
    formData.set("city", draft.city);
    formData.set("description", draft.description);
    formData.set("timeline", draft.timeline);
    formData.set("budget", draft.budget);
    formData.set("firstName", draft.firstName);
    formData.set("lastName", draft.lastName);
    formData.set("email", draft.email);
    formData.set("phone", draft.phone);
    formData.set("consent", draft.consent ? "true" : "false");
    formData.set("honeypot", draft.honeypot);
    formData.set("startedAt", draft.startedAt);
    formData.set("source", draft.source);
    for (const file of files) {
      formData.append("photos", file);
    }

    startTransition(async () => {
      const result = await submitQuoteAction(formData);
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }
      track("quote_submitted", { step: LAST_STEP });
      router.push(routes.quoteConfirmation);
    });
  }

  const currentTitle =
    quoteContent.steps.find((item) => item.id === step)?.title ?? "";

  return (
    <div className="relative border border-line bg-paper-elevated p-6 lg:p-10">
      <QuoteProgress current={step} />
      <h2 className="mt-8 text-2xl font-semibold tracking-[-0.01em] text-forest lg:text-3xl">
        Étape {step} — {currentTitle}
      </h2>

      <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden">
        <input
          id="company-website"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={draft.honeypot}
          onChange={(event) => patchDraft({ honeypot: event.target.value })}
        />
      </div>

      <div className="mt-8">
        {step === 1 ? (
          <QuoteStepProject
            draft={draft}
            errors={errors}
            onChange={patchDraft}
          />
        ) : null}
        {step === 2 ? (
          <QuoteStepLocation
            draft={draft}
            errors={errors}
            onChange={patchDraft}
          />
        ) : null}
        {step === 3 ? (
          <QuoteStepDetails
            draft={draft}
            errors={errors}
            onChange={patchDraft}
          />
        ) : null}
        {step === 4 ? (
          <QuoteStepPhotos
            files={files}
            errors={errors}
            onChange={setFiles}
          />
        ) : null}
        {step === 5 ? (
          <QuoteStepContact
            draft={draft}
            errors={errors}
            onChange={patchDraft}
          />
        ) : null}
        {step === 6 ? (
          <QuoteStepSummary
            draft={draft}
            fileCount={files.length}
            errors={errors}
            onChange={patchDraft}
          />
        ) : null}
      </div>

      {errors.form ? (
        <p className="mt-6 text-sm text-danger" role="alert">
          {errors.form}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className={buttonClassName("secondary")}
            disabled={pending}
          >
            Retour
          </button>
        ) : (
          <span />
        )}
        {step < LAST_STEP ? (
          <button
            type="button"
            onClick={goNext}
            className={buttonClassName("primary")}
          >
            Continuer
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className={buttonClassName("primary")}
            disabled={pending}
          >
            {pending ? "Envoi…" : "Envoyer la demande"}
          </button>
        )}
      </div>
    </div>
  );
}
