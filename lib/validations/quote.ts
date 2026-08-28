import {
  BUDGETS,
  PROJECT_TYPES,
  TIMELINES,
  type Budget,
  type ProjectType,
  type QuoteAttachmentMeta,
  type QuoteDraft,
  type QuoteFieldErrors,
  type QuoteLead,
  type QuoteValidationResult,
  type Timeline,
} from "@/types/leads";

export const MIN_FILL_MS = 2_000;
export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_PATTERN = /^\d{5}$/;

export function emptyQuoteDraft(startedAt = Date.now()): QuoteDraft {
  return {
    projectType: "",
    projectTypeOther: "",
    postalCode: "",
    city: "",
    description: "",
    timeline: "",
    budget: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
    honeypot: "",
    startedAt: String(startedAt),
    source: "",
  };
}

export function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

export function isTimeline(value: string): value is Timeline {
  return (TIMELINES as readonly string[]).includes(value);
}

export function isBudget(value: string): value is Budget {
  return (BUDGETS as readonly string[]).includes(value);
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s.-]/g, "");
}

export function isFrenchPhone(value: string): boolean {
  const phone = normalizePhone(value);
  return /^(?:(?:\+33)[1-9]\d{8}|0[1-9]\d{8})$/.test(phone);
}

function isAllowedAttachmentType(
  type: string,
): type is (typeof ALLOWED_ATTACHMENT_TYPES)[number] {
  return (ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(type);
}

export function validateAttachments(
  files: QuoteAttachmentMeta[],
): string | undefined {
  if (files.length > MAX_ATTACHMENTS) {
    return `Ajoutez au plus ${MAX_ATTACHMENTS} photos.`;
  }

  for (const file of files) {
    if (!isAllowedAttachmentType(file.type)) {
      return "Formats acceptés : JPEG, PNG ou WebP.";
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return "Chaque photo doit faire moins de 4 Mo.";
    }
    if (file.size === 0) {
      return "Une des photos est vide.";
    }
  }

  return undefined;
}

export function validateQuoteStep(
  step: number,
  draft: QuoteDraft,
  attachments: QuoteAttachmentMeta[] = [],
): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};

  if (step === 1) {
    if (!isProjectType(draft.projectType)) {
      errors.projectType = "Choisissez un type de projet.";
    } else if (draft.projectType === "autre") {
      const other = draft.projectTypeOther.trim();
      if (other.length < 3) {
        errors.projectTypeOther = "Précisez le type de projet.";
      }
    }
  }

  if (step === 2) {
    if (!POSTAL_PATTERN.test(draft.postalCode.trim())) {
      errors.postalCode = "Indiquez un code postal à 5 chiffres.";
    }
    if (draft.city.trim().length < 2) {
      errors.city = "Indiquez la commune.";
    }
  }

  if (step === 3) {
    if (draft.description.trim().length < 20) {
      errors.description =
        "Décrivez le projet en quelques phrases (20 caractères minimum).";
    }
    if (draft.description.trim().length > 2000) {
      errors.description = "La description est trop longue (2 000 caractères).";
    }
    if (!isTimeline(draft.timeline)) {
      errors.timeline = "Choisissez un délai.";
    }
    if (!isBudget(draft.budget)) {
      errors.budget = "Choisissez une fourchette de budget.";
    }
  }

  if (step === 4) {
    const attachmentError = validateAttachments(attachments);
    if (attachmentError) {
      errors.attachments = attachmentError;
    }
  }

  if (step === 5) {
    if (draft.firstName.trim().length < 2) {
      errors.firstName = "Indiquez votre prénom.";
    }
    if (draft.lastName.trim().length < 2) {
      errors.lastName = "Indiquez votre nom.";
    }
    if (!EMAIL_PATTERN.test(draft.email.trim())) {
      errors.email = "Indiquez un e-mail valide.";
    }
    if (!isFrenchPhone(draft.phone)) {
      errors.phone = "Indiquez un téléphone français à 10 chiffres.";
    }
  }

  if (step === 6) {
    if (!draft.consent) {
      errors.consent =
        "Le consentement est nécessaire pour que nous puissions vous recontacter.";
    }
  }

  return errors;
}

export function isHoneypotTriggered(honeypot: string): boolean {
  return honeypot.trim().length > 0;
}

export function isSubmittedTooFast(startedAt: string, now = Date.now()): boolean {
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) {
    return true;
  }
  return now - started < MIN_FILL_MS;
}

export function validateQuote(
  draft: QuoteDraft,
  attachments: QuoteAttachmentMeta[],
): QuoteValidationResult {
  const errors: QuoteFieldErrors = {
    ...validateQuoteStep(1, draft, attachments),
    ...validateQuoteStep(2, draft, attachments),
    ...validateQuoteStep(3, draft, attachments),
    ...validateQuoteStep(4, draft, attachments),
    ...validateQuoteStep(5, draft, attachments),
    ...validateQuoteStep(6, draft, attachments),
  };

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  if (!isProjectType(draft.projectType) || !isTimeline(draft.timeline) || !isBudget(draft.budget)) {
    return {
      ok: false,
      errors: { form: "Le formulaire est incomplet." },
    };
  }

  const data: QuoteLead = {
    projectType: draft.projectType,
    projectTypeOther:
      draft.projectType === "autre" ? draft.projectTypeOther.trim() : null,
    postalCode: draft.postalCode.trim(),
    city: draft.city.trim(),
    description: draft.description.trim(),
    timeline: draft.timeline,
    budget: draft.budget,
    firstName: draft.firstName.trim(),
    lastName: draft.lastName.trim(),
    email: draft.email.trim().toLowerCase(),
    phone: normalizePhone(draft.phone),
    consent: true,
    attachments,
    source: draft.source.trim() || null,
  };

  return { ok: true, data };
}
