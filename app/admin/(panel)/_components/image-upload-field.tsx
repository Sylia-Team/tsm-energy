"use client";

import { useState } from "react";
import type { MediaImage } from "@/types/media";

const labelClass = "block text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-forest focus:ring-1 focus:ring-forest";

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

  const canPreview =
    Boolean(preview) &&
    !removed &&
    (preview.startsWith("/") || preview.startsWith("blob:"));

  return (
    <div className="grid gap-3">
      <p className={labelClass}>{label}</p>

      {canPreview ? (
        // Aperçu local : les images déjà en ligne (Unsplash) sont bloquées par la CSP.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="h-40 w-full rounded-md border border-stone-200 object-cover"
        />
      ) : null}

      {preview && !preview.startsWith("/") && !removed ? (
        <p className="text-xs text-ink-muted">
          Image actuelle externe. Envoyez un fichier pour la remplacer.
        </p>
      ) : null}

      {removed ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
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
          className="mt-1 block w-full text-sm"
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
          className="justify-self-start rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          {removed ? "Annuler la suppression" : "Supprimer la photo"}
        </button>
      ) : null}
    </div>
  );
}
