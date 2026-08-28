"use server";

import { submitLead } from "@/lib/leads";
import {
  isHoneypotTriggered,
  isSubmittedTooFast,
  validateQuote,
} from "@/lib/validations/quote";
import type { QuoteAttachmentMeta, QuoteDraft, QuoteFieldErrors } from "@/types/leads";

export type QuoteActionResult =
  | { ok: true }
  | { ok: false; errors: QuoteFieldErrors };

function readString(formData: FormData, key: keyof QuoteDraft): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function draftFromFormData(formData: FormData): QuoteDraft {
  return {
    projectType: readString(formData, "projectType"),
    projectTypeOther: readString(formData, "projectTypeOther"),
    postalCode: readString(formData, "postalCode"),
    city: readString(formData, "city"),
    description: readString(formData, "description"),
    timeline: readString(formData, "timeline"),
    budget: readString(formData, "budget"),
    firstName: readString(formData, "firstName"),
    lastName: readString(formData, "lastName"),
    email: readString(formData, "email"),
    phone: readString(formData, "phone"),
    consent: formData.get("consent") === "true",
    honeypot: readString(formData, "honeypot"),
    startedAt: readString(formData, "startedAt"),
    source: readString(formData, "source"),
  };
}

function attachmentsFromFormData(formData: FormData): QuoteAttachmentMeta[] {
  return formData
    .getAll("photos")
    .filter((item): item is File => item instanceof File && item.size > 0)
    .map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
}

export async function submitQuoteAction(
  formData: FormData,
): Promise<QuoteActionResult> {
  const draft = draftFromFormData(formData);

  if (isHoneypotTriggered(draft.honeypot)) {
    return { ok: true };
  }

  if (isSubmittedTooFast(draft.startedAt)) {
    return {
      ok: false,
      errors: {
        form: "Le formulaire a été envoyé trop vite. Vérifiez vos informations puis renvoyez.",
      },
    };
  }

  const attachments = attachmentsFromFormData(formData);
  const result = validateQuote(draft, attachments);

  if (!result.ok) {
    return { ok: false, errors: result.errors };
  }

  const lead = await submitLead(result.data);

  if (!lead.ok) {
    return {
      ok: false,
      errors: {
        form: "L’envoi a échoué. Appelez-nous ou réessayez dans un instant.",
      },
    };
  }

  return { ok: true };
}
