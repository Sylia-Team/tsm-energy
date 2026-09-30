import type { LeadPayload, SubmitLeadResult } from "@/types/leads";

const WEBHOOK_TIMEOUT_MS = 8000;

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
 * Envoi vers un webhook externe (n8n, Make, Zapier, CRM…).
 * Configuré par `LEAD_WEBHOOK_URL` ; en-tête d’authentification optionnel
 * via `LEAD_WEBHOOK_SECRET` (envoyé en `Authorization: Bearer …`).
 */
async function webhookLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    console.error("[lead:webhook] LEAD_WEBHOOK_URL manquant.");
    return { ok: false, message: "Webhook non configuré." };
  }

  const id = createLeadId();
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id,
        submittedAt: new Date().toISOString(),
        lead: payload,
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(
        "[lead:webhook] réponse non-OK",
        response.status,
        response.statusText,
      );
      return { ok: false, message: `Webhook HTTP ${response.status}` };
    }

    return { ok: true, id };
  } catch (error) {
    console.error("[lead:webhook] échec de l’envoi", error);
    return { ok: false, message: "Échec de l’appel webhook." };
  }
}

/**
 * Abstraction d’envoi interchangeable (log, webhook, n8n, Make, CRM).
 * Sélectionnée par `LEAD_ADAPTER` (défaut : `log`).
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<SubmitLeadResult> {
  const adapter = process.env.LEAD_ADAPTER ?? "log";

  switch (adapter) {
    case "webhook":
      return webhookLead(payload);
    case "log":
      return logLead(payload);
    default:
      return logLead(payload);
  }
}
