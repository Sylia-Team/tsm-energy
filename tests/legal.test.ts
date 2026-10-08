import { describe, expect, it } from "vitest";
import { isLegalSlug, parseLegalBody } from "@/lib/legal";

describe("parseLegalBody", () => {
  it("découpe sous-titres et paragraphes", () => {
    const blocks = parseLegalBody(
      "## Éditeur\n\nTSM Énergies Services.\nSanary-sur-Mer.\n\n## Hébergeur\nNom",
    );

    expect(blocks).toEqual([
      { type: "heading", text: "Éditeur" },
      { type: "paragraph", text: "TSM Énergies Services. Sanary-sur-Mer." },
      { type: "heading", text: "Hébergeur" },
      { type: "paragraph", text: "Nom" },
    ]);
  });

  it("conserve le HTML comme du texte brut", () => {
    expect(parseLegalBody("<script>alert(1)</script>")).toEqual([
      { type: "paragraph", text: "<script>alert(1)</script>" },
    ]);
  });
});

describe("isLegalSlug", () => {
  it("n'accepte que les pages légales connues", () => {
    expect(isLegalSlug("cookies")).toBe(true);
    expect(isLegalSlug("actualites")).toBe(false);
  });
});
