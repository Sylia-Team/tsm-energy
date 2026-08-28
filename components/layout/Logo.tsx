import Link from "next/link";
import { getSite } from "@/lib/content";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  const site = getSite();

  return (
    <Link
      href={routes.home}
      className={cn(
        "group flex flex-col leading-none",
        inverted ? "text-paper" : "text-forest",
        className,
      )}
    >
      <span className="font-extrabold tracking-[-0.04em] text-[1.35rem] sm:text-[1.5rem]">
        {site.shortName}
      </span>
      <span
        className={cn(
          "mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.18em]",
          inverted ? "text-paper/75" : "text-ink-muted",
        )}
      >
        Énergies Services
      </span>
      <span className="sr-only">{site.name} — Accueil</span>
    </Link>
  );
}
