import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

/**
 * Logo PNG transparent + mention « Énergies Services » en texte (TSM seul
 * n'est pas distinctif). Les bleus du logo manquent de contraste sur fond
 * sombre : en mode `inverted`, le logo est rendu en blanc monochrome.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  const site = getSiteContent();

  return (
    <Link
      href={routes.home}
      className={cn(
        "inline-flex items-center gap-3",
        className,
      )}
    >
      <Image
        src="/logo-tsm-v2.png"
        alt=""
        width={345}
        height={218}
        priority={!inverted}
        sizes="76px"
        className={cn("h-12 w-auto", inverted && "brightness-0 invert")}
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex flex-col border-l pl-3 text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.18em]",
          inverted ? "border-paper/30 text-paper" : "border-line text-navy",
        )}
      >
        <span>Énergies</span>
        <span>Services</span>
      </span>
      <span className="sr-only">{site.name} — Accueil</span>
    </Link>
  );
}
