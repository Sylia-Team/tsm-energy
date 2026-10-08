const labelClass = "block text-sm font-medium text-ink";
const inputClass =
  "mt-1 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";

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
    <section className="rounded-lg border border-line bg-paper-elevated p-6">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

export { SaveBar } from "./save-bar";
export { SavedNotice } from "./saved-notice";
