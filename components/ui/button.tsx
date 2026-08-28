import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium tracking-wide transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-forest bg-transparent text-forest hover:bg-forest hover:text-paper",
  secondaryOnDark:
    "border border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-forest",
  ghost:
    "text-ink underline-offset-4 hover:underline",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(base, buttonVariants[variant], className);
}
