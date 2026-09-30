import { randomUUID } from "node:crypto";
import { mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { detectImage, readImageSize, type ImageKind } from "@/lib/admin/image-size";
import type { MediaImage } from "@/types/media";

const MAX_BYTES = 8 * 1024 * 1024;
const EXTENSIONS: Record<ImageKind, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

export class MediaUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaUploadError";
  }
}

function uploadsDirectory(): string {
  return path.join(process.cwd(), "public", "uploads");
}

export function isManagedUpload(src: string): boolean {
  return /^\/uploads\/[0-9a-f-]{36}\.(jpg|png|webp)$/.test(src);
}

export function deleteManagedUpload(src: string): void {
  if (!isManagedUpload(src)) {
    return;
  }

  const fileName = path.basename(src);
  const directory = path.resolve(uploadsDirectory());
  const target = path.resolve(directory, fileName);
  if (!target.startsWith(`${directory}${path.sep}`)) {
    return;
  }

  try {
    unlinkSync(target);
  } catch {
    // Fichier déjà absent.
  }
}

export async function saveUploadedImage(
  file: File,
): Promise<Pick<MediaImage, "src" | "width" | "height">> {
  if (file.size <= 0 || file.size > MAX_BYTES) {
    throw new MediaUploadError("Image trop volumineuse (8 Mo maximum).");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = detectImage(bytes);
  if (!kind) {
    throw new MediaUploadError("Formats acceptés : JPEG, PNG ou WebP.");
  }

  const size = readImageSize(bytes, kind);
  if (!size) {
    throw new MediaUploadError("Impossible de lire les dimensions de l’image.");
  }

  const fileName = `${randomUUID()}.${EXTENSIONS[kind]}`;
  const directory = uploadsDirectory();
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, fileName), bytes);

  return {
    src: `/uploads/${fileName}`,
    width: size.width,
    height: size.height,
  };
}

function readAlt(formData: FormData, name: string, fallback: string): string {
  const value = formData.get(`${name}.alt`);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/**
 * Remplace, conserve ou retire une image à partir du formulaire admin.
 * Une suppression d’un fichier envoyé revient à l’image par défaut du contenu.
 */
export async function resolveMediaImage(
  formData: FormData,
  name: string,
  current: MediaImage,
  fallback: MediaImage,
): Promise<MediaImage> {
  const file = formData.get(`${name}.file`);
  const remove = formData.get(`${name}.remove`) === "true";
  const alt = readAlt(formData, name, current.alt);

  if (file instanceof File && file.size > 0) {
    const saved = await saveUploadedImage(file);
    if (current.src !== saved.src) {
      deleteManagedUpload(current.src);
    }
    return { ...saved, alt };
  }

  if (remove) {
    deleteManagedUpload(current.src);
    return fallback.src ? fallback : { src: "", alt: "", width: 0, height: 0 };
  }

  return { ...current, alt };
}

export async function resolveGallery(
  formData: FormData,
  current: MediaImage[],
): Promise<MediaImage[]> {
  const rawCount = Number(formData.get("gallery.count"));
  const count = Number.isFinite(rawCount) && rawCount >= 0 ? rawCount : current.length;
  const next: MediaImage[] = [];

  for (let index = 0; index < count; index += 1) {
    const item = current[index] ?? { src: "", alt: "", width: 0, height: 0 };
    const file = formData.get(`gallery.${index}.file`);
    const remove = formData.get(`gallery.${index}.remove`) === "true";

    if (remove && !(file instanceof File && file.size > 0)) {
      deleteManagedUpload(item.src);
      continue;
    }

    const resolved = await resolveMediaImage(formData, `gallery.${index}`, item, item);
    if (resolved.src) {
      next.push(resolved);
    }
  }

  const extra = formData.get("gallery.new.file");
  if (extra instanceof File && extra.size > 0) {
    const saved = await saveUploadedImage(extra);
    next.push({
      ...saved,
      alt: readAlt(formData, "gallery.new", ""),
    });
  }

  return next;
}
