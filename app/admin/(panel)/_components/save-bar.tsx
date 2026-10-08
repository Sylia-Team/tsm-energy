"use client";

import { useFormStatus } from "react-dom";

export function SaveBar({ label = "Enregistrer et publier" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 flex justify-end">
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg hover:bg-accent-hover disabled:opacity-70"
      >
        {pending ? "Enregistrement…" : label}
      </button>
    </div>
  );
}
