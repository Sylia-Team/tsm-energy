import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: "paper" | "mist" | "navy";
  className?: string;
};

const tones = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  navy: "bg-navy text-paper",
} as const;

export function Section({
  children,
  id,
  tone = "paper",
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}
