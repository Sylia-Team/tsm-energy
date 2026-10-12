import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  inverted?: boolean;
  centered?: boolean;
  className?: string;
};

/** Sur-titre : petites capitales espacées précédées d’un filet laiton. */
export function Eyebrow({
  children,
  inverted = false,
  centered = false,
  className,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.32em]",
        centered && "justify-center",
        inverted ? "text-paper/75" : "text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-10 shrink-0", inverted ? "bg-brass-light" : "bg-brass")}
      />
      {children}
    </p>
  );
}
