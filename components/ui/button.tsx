import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-8 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants = {
  primary: "bg-navy text-paper hover:bg-navy-deep",
  secondary:
    "border border-navy bg-transparent text-navy hover:bg-navy hover:text-paper",
  secondaryOnDark:
    "border border-paper/50 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-navy",
  ghost: "text-ink underline-offset-4 hover:underline",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(base, buttonVariants[variant], className);
}

const textLinkBase =
  "inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] transition-colors";

/** Lien texte secondaire (« Découvrir… → »), en petites capitales. */
export const textLinkClassName = `${textLinkBase} text-navy hover:text-brass`;

export const textLinkOnDarkClassName = `${textLinkBase} text-paper hover:text-brass-light`;
