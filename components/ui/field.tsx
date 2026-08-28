import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export const controlClassName =
  "min-h-11 w-full rounded-sm border border-line bg-paper-elevated px-3 text-base text-ink";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactElement<Record<string, unknown>>;
};

export function Field({ id, label, error, hint, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium tracking-wide text-forest">
        {label}
      </label>
      {control}
      {hint && !error ? (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...props }: TextInputProps) {
  return <input className={cn(controlClassName, className)} {...props} />;
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(controlClassName, "min-h-32 py-3", className)}
      {...props}
    />
  );
}

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ className, children, ...props }: SelectInputProps) {
  return (
    <select className={cn(controlClassName, className)} {...props}>
      {children}
    </select>
  );
}
