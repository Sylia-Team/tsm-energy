"use client";

import { useState } from "react";
import type { MediaImage } from "@/types/media";

const labelClass = "block text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";

/**
 * Les images externes (Unsplash) sont bloquées par la CSP (`img-src 'self'`) :
 * on passe par l'optimiseur Next, servi depuis la même origine.
 */
function previewSrc(src: string): string {
  if (src.startsWith("http")) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;
  }
  return src;
}

type ImageUploadFieldProps = {
  name: string;
  label: string;
  image: MediaImage;
  allowRemove?: boolean;
};

export function ImageUploadField({
  name,
  label,
  image,
  allowRemove = true,
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState(image.src);
  const [removed, setRemoved] = useState(false);
  const [localName, setLocalName] = useState("");

  const canPreview = Boolean(preview) && !removed;

  return (
    <div className="grid gap-3">
      <p className={labelClass}>{label}</p>

      {canPreview ? (
        // `blob:` (fichier local) n'est pas optimisable : balise img simple.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewSrc(preview)}
          alt=""
          className="h-48 w-full rounded-md border border-line bg-mist object-cover"
        />
      ) : null}

      {removed ? (
        <p className="rounded-md bg-mist px-3 py-2 text-sm text-navy">
          La photo sera retirée à l’enregistrement. L’image d’origine du site
          est rétablie lorsqu’elle existe.
        </p>
      ) : null}

      <input type="hidden" name={`${name}.remove`} value={removed ? "true" : "false"} />

      <div>
        <label htmlFor={`${name}.file`} className={labelClass}>
          {preview && !removed ? "Remplacer la photo" : "Choisir une photo"}
        </label>
        <input
          id={`${name}.file`}
          name={`${name}.file`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mt-1 block w-full cursor-pointer rounded-md border border-dashed border-line bg-mist p-3 text-sm text-ink-muted outline-none transition-colors hover:border-navy focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-deep"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setRemoved(false);
            if (!file) {
              setLocalName("");
              setPreview(image.src);
              return;
            }
            setLocalName(file.name);
            setPreview(URL.createObjectURL(file));
          }}
        />
        {localName ? (
          <p className="mt-1 text-xs text-ink-muted">Fichier choisi : {localName}</p>
        ) : (
          <p className="mt-1 text-xs text-ink-muted">JPEG, PNG ou WebP — 8 Mo maximum.</p>
        )}
      </div>

      <div>
        <label htmlFor={`${name}.alt`} className={labelClass}>
          Texte alternatif
        </label>
        <input
          id={`${name}.alt`}
          name={`${name}.alt`}
          type="text"
          defaultValue={image.alt}
          className={inputClass}
        />
      </div>

      {allowRemove && image.src ? (
        <button
          type="button"
          onClick={() => {
            setRemoved((current) => !current);
            setLocalName("");
            setPreview(image.src);
          }}
          className="justify-self-start rounded-md border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/10"
        >
          {removed ? "Annuler la suppression" : "Supprimer la photo"}
        </button>
      ) : null}
    </div>
  );
}
