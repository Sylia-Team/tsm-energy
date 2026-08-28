import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: "paper" | "stone" | "forest";
  className?: string;
};

const tones = {
  paper: "bg-paper text-ink",
  stone: "bg-stone text-ink",
  forest: "bg-forest text-paper",
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
