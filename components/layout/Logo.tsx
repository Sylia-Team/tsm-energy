import Link from "next/link";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

/**
 * Logo monochrome (couleur du texte courant) obtenu par masque CSS sur le PNG
 * transparent, + mention « Énergies Services » en texte (TSM seul n'est pas
 * distinctif). Les couleurs vives du logo ne sont pas utilisées dans le site.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  const site = getSiteContent();

  return (
    <Link
      href={routes.home}
      className={cn(
        "inline-flex items-center gap-3",
        inverted ? "text-paper" : "text-navy",
        className,
      )}
    >
      <span aria-hidden="true" className="logo-mask block aspect-[345/218] h-11" />
      <span
        aria-hidden="true"
        className={cn(
          "flex flex-col border-l pl-3 text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.18em]",
          inverted ? "border-paper/30" : "border-line",
        )}
      >
        <span>Énergies</span>
        <span>Services</span>
      </span>
      <span className="sr-only">{site.name} — Accueil</span>
    </Link>
  );
}
