import { LEGAL_SLUGS, type LegalSlug } from "@/types/legal";

export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

/**
 * Découpe le texte d'une page légale : `## Titre` → sous-titre,
 * ligne vide → nouveau paragraphe. Le texte n'est jamais interprété en HTML.
 */
export function parseLegalBody(body: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", text: line.slice(3).trim() });
      continue;
    }
    paragraph.push(line);
  }
  flush();

  return blocks;
}
