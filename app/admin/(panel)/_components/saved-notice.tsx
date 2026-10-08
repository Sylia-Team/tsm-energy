"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IconClose } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const AUTO_HIDE_MS = 5000;

/**
 * Message flottant après enregistrement (`?saved=1` / `?error=image`).
 * Le fermer retire le paramètre de l'URL : un rechargement ne le réaffiche pas,
 * et l'enregistrement suivant le fait réapparaître.
 */
export function SavedNotice({
  saved,
  imageError = false,
}: {
  saved: boolean;
  imageError?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = saved || imageError;

  useEffect(() => {
    if (!saved || imageError) {
      return;
    }
    const timer = window.setTimeout(() => {
      router.replace(pathname, { scroll: false });
    }, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [saved, imageError, router, pathname]);

  if (!active) {
    return null;
  }

  return (
    <div
      role={imageError ? "alert" : "status"}
      className={cn(
        "fixed right-6 bottom-6 z-50 flex max-w-sm items-start gap-3 rounded-md border-l-4 bg-paper-elevated px-4 py-3 text-sm shadow-lg",
        imageError ? "border-danger text-danger" : "border-success text-success",
      )}
    >
      <p className="font-medium">
        {imageError
          ? "Image refusée. Utilisez un JPEG, un PNG ou un WebP de 8 Mo maximum."
          : "Modifications enregistrées et publiées."}
      </p>
      <button
        type="button"
        onClick={() => router.replace(pathname, { scroll: false })}
        className="-m-1 p-1 text-ink-muted hover:text-ink"
        aria-label="Fermer le message"
      >
        <IconClose className="h-4 w-4" />
      </button>
    </div>
  );
}
