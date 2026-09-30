export function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function num(formData: FormData, key: string, fallback: number): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

/** Sépare un textarea en paragraphes (une ligne vide = séparateur). */
export function paragraphs(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/** Sépare un textarea en éléments de liste (une ligne = un élément). */
export function lines(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Transforme un texte en slug URL (minuscules, tirets, sans accents). */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
