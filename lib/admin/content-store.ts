import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Clés de contenu éditables via l'administration.
 * La valeur par défaut vit dans `content/*.ts` ; l'override (partiel) est
 * stocké dans `data/content-overrides.json` et fusionné à la lecture.
 */
export type ContentKey =
  | "home"
  | "site"
  | "entreprise"
  | "contact"
  | "reviews"
  | "services"
  | "zones"
  | "realisations"
  | "certifications"
  | "servicesListing"
  | "realisationsListing"
  | "zonesListing"
  | "quote"
  | "avisPage"
  | "legalPages";

type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type OverridesFile = Partial<Record<ContentKey, unknown>>;

const DATA_DIR = path.join(process.cwd(), "data");
const OVERRIDES_PATH = path.join(DATA_DIR, "content-overrides.json");

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Fusion profonde : les objets sont fusionnés récursivement, les tableaux et
 * primitives de l'override remplacent la valeur par défaut.
 */
export function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) {
    return base;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T;
  }

  const result: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue;
    }
    result[key] = deepMerge((base as Record<string, unknown>)[key], value as never);
  }

  return result as T;
}

function readOverridesFile(): OverridesFile {
  if (!existsSync(OVERRIDES_PATH)) {
    return {};
  }

  try {
    const raw = readFileSync(OVERRIDES_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isPlainObject(parsed) ? (parsed as OverridesFile) : {};
  } catch {
    // Fichier corrompu : on retombe sur les valeurs par défaut plutôt que de casser le site.
    return {};
  }
}

/** Lit l'override partiel d'une section, ou `undefined` s'il n'existe pas. */
export function readOverride<T>(key: ContentKey): DeepPartial<T> | undefined {
  const file = readOverridesFile();
  return file[key] as DeepPartial<T> | undefined;
}

/** Écrit (remplace) l'override d'une section et persiste le fichier. */
export function writeOverride<T>(key: ContentKey, value: DeepPartial<T>): void {
  const file = readOverridesFile();
  file[key] = value;

  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  writeFileSync(OVERRIDES_PATH, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}
