import Link from "next/link";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

/** Logo monochrome (couleur du texte courant) obtenu par masque CSS sur le PNG transparent. */
export function Logo({ className, inverted = false }: LogoProps) {
  const site = getSiteContent();

  return (
    <Link
      href={routes.home}
      className={cn(
        "inline-flex items-center",
        inverted ? "text-paper" : "text-navy",
        className,
      )}
    >
      <span aria-hidden="true" className="logo-mask block aspect-[467/300] h-12" />
      <span className="sr-only">{site.name} — Accueil</span>
    </Link>
  );
}
