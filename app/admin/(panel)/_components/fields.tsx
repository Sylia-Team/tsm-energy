const labelClass = "block text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-forest focus:ring-1 focus:ring-forest";

export function TextField({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue: string | number;
  type?: "text" | "number";
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 3,
  hint,
}: {
  name: string;
  label: string;
  defaultValue: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={inputClass}
      />
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-forest">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

export function SaveBar({ label = "Enregistrer et publier" }: { label?: string }) {
  return (
    <div className="sticky bottom-4 flex justify-end">
      <button
        type="submit"
        className="rounded-md bg-forest px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90"
      >
        {label}
      </button>
    </div>
  );
}

export function SavedNotice({
  saved,
  imageError = false,
}: {
  saved: boolean;
  imageError?: boolean;
}) {
  if (imageError) {
    return (
      <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
        Image refusée. Utilisez un JPEG, un PNG ou un WebP de 8 Mo maximum.
      </p>
    );
  }

  if (!saved) {
    return null;
  }
  return (
    <p
      className="mt-4 rounded-md bg-green-50 px-4 py-2 text-sm text-green-700"
      role="status"
    >
      Modifications enregistrées et publiées.
    </p>
  );
}
