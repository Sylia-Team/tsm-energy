import type { LeadPayload, SubmitLeadResult } from "@/types/leads";

function createLeadId(): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `lead_${Date.now()}_${random}`;
}

async function logLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const id = createLeadId();
  console.info("[lead:log]", {
    id,
    projectType: payload.projectType,
    city: payload.city,
    postalCode: payload.postalCode,
    email: payload.email,
    phone: payload.phone,
    attachments: payload.attachments.length,
    source: payload.source,
  });
  return { ok: true, id };
}

/**
 * Abstraction d’envoi interchangeable (log, webhook, n8n, Make, CRM).
 * Implémentation actuelle : journal serveur, sans base de données.
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<SubmitLeadResult> {
  const adapter = process.env.LEAD_ADAPTER ?? "log";

  switch (adapter) {
    case "log":
      return logLead(payload);
    default:
      return logLead(payload);
  }
}
