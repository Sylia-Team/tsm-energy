import { describe, expect, it } from "vitest";
import { routes } from "@/lib/routes";

describe("routes", () => {
  it("expose les URLs du devis", () => {
    expect(routes.quote).toBe("/demande-de-devis");
    expect(routes.quoteConfirmation).toBe("/demande-de-devis/confirmation");
  });
});
