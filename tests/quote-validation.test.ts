import { describe, expect, it } from "vitest";
import {
  emptyQuoteDraft,
  isFrenchPhone,
  isHoneypotTriggered,
  isSubmittedTooFast,
  MIN_FILL_MS,
  validateQuote,
  validateQuoteStep,
} from "@/lib/validations/quote";
import type { QuoteDraft } from "@/types/leads";

function validDraft(overrides: Partial<QuoteDraft> = {}): QuoteDraft {
  return {
    ...emptyQuoteDraft(Date.now() - MIN_FILL_MS - 10),
    projectType: "renovation",
    postalCode: "83110",
    city: "Sanary-sur-Mer",
    description:
      "Rénovation du rez-de-chaussée : cloisons, peinture et salle de bains.",
    timeline: "1-3-months",
    budget: "30-80k",
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@example.com",
    phone: "06 12 34 56 78",
    consent: true,
    ...overrides,
  };
}

describe("quote validation", () => {
  it("accepte une demande complète", () => {
    const result = validateQuote(validDraft(), []);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBe("0612345678");
      expect(result.data.email).toBe("marie.dupont@example.com");
      expect(result.data.projectTypeOther).toBeNull();
    }
  });

  it("refuse un code postal incomplet", () => {
    const errors = validateQuoteStep(1, validDraft({ postalCode: "831" }));
    expect(errors.postalCode).toBeDefined();
  });

  it("refuse une description trop courte", () => {
    const errors = validateQuoteStep(2, validDraft({ description: "Travaux" }));
    expect(errors.description).toBeDefined();
  });

  it("refuse un e-mail invalide", () => {
    const errors = validateQuoteStep(3, validDraft({ email: "marie@" }));
    expect(errors.email).toBeDefined();
  });

  it("refuse un téléphone invalide", () => {
    expect(isFrenchPhone("123")).toBe(false);
    const errors = validateQuoteStep(3, validDraft({ phone: "123" }));
    expect(errors.phone).toBeDefined();
  });

  it("accepte un téléphone au format +33", () => {
    expect(isFrenchPhone("0612345678")).toBe(true);
    expect(isFrenchPhone("+33612345678")).toBe(true);
  });

  it("exige le consentement à l’étape 4", () => {
    const errors = validateQuoteStep(4, validDraft({ consent: false }));
    expect(errors.consent).toBeDefined();
  });

  it("accepte une demande sans type de projet", () => {
    const result = validateQuote(validDraft({ projectType: "" }), []);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.projectType).toBeNull();
    }
  });

  it("refuse plus de 5 photos", () => {
    const files = Array.from({ length: 6 }, (_, index) => ({
      name: `photo-${index}.jpg`,
      type: "image/jpeg",
      size: 1200,
    }));
    const result = validateQuote(validDraft(), files);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.attachments).toBeDefined();
    }
  });

  it("détecte le honeypot", () => {
    expect(isHoneypotTriggered("http://spam.test")).toBe(true);
    expect(isHoneypotTriggered("  ")).toBe(false);
  });

  it("détecte un envoi trop rapide", () => {
    expect(isSubmittedTooFast(String(Date.now()), Date.now())).toBe(true);
    expect(
      isSubmittedTooFast(String(Date.now() - MIN_FILL_MS - 50), Date.now()),
    ).toBe(false);
  });
});
