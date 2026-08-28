export const PROJECT_TYPES = [
  "renovation",
  "construction",
  "extension",
  "isolation",
  "climatisation",
  "toiture",
  "plomberie",
  "electricite",
  "peinture",
  "autre",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const TIMELINES = [
  "asap",
  "1-3-months",
  "3-6-months",
  "6-months-plus",
  "unknown",
] as const;

export type Timeline = (typeof TIMELINES)[number];

export const BUDGETS = [
  "under-10k",
  "10-30k",
  "30-80k",
  "80k-plus",
  "unknown",
] as const;

export type Budget = (typeof BUDGETS)[number];

export type QuoteAttachmentMeta = {
  name: string;
  type: string;
  size: number;
};

export type QuoteDraft = {
  projectType: string;
  projectTypeOther: string;
  postalCode: string;
  city: string;
  description: string;
  timeline: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  honeypot: string;
  startedAt: string;
  source: string;
};

export type QuoteLead = {
  projectType: ProjectType;
  projectTypeOther: string | null;
  postalCode: string;
  city: string;
  description: string;
  timeline: Timeline;
  budget: Budget;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: true;
  attachments: QuoteAttachmentMeta[];
  source: string | null;
};

export type QuoteField =
  | keyof QuoteDraft
  | "attachments"
  | "form";

export type QuoteFieldErrors = Partial<Record<QuoteField, string>>;

export type QuoteValidationSuccess = {
  ok: true;
  data: QuoteLead;
};

export type QuoteValidationFailure = {
  ok: false;
  errors: QuoteFieldErrors;
};

export type QuoteValidationResult =
  | QuoteValidationSuccess
  | QuoteValidationFailure;

export type LeadPayload = QuoteLead;

export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; message: string };
