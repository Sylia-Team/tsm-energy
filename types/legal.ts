export const LEGAL_SLUGS = [
  "mentions-legales",
  "politique-confidentialite",
  "cookies",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/**
 * `body` : texte simple. Une ligne commençant par `## ` devient un sous-titre,
 * une ligne vide sépare les paragraphes. Aucun HTML n'est interprété.
 */
export type LegalPageContent = {
  title: string;
  seoDescription: string;
  updatedAt: string;
  body: string;
};
