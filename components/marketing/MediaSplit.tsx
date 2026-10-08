import { CoverImage } from "@/components/ui/cover-image";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/types/media";

type MediaSplitProps = {
  image: MediaImage;
  side?: "left" | "right";
  tone?: "paper" | "mist";
  id?: string;
  children: React.ReactNode;
};

const tones = {
  paper: "bg-paper",
  mist: "bg-mist",
} as const;

/**
 * Photo plein cadre sur une moitié de l'écran (jusqu'au bord de la fenêtre),
 * texte sur l'autre moitié, aligné sur la grille de `Container` (max-w-7xl).
 */
export function MediaSplit({
  image,
  side = "left",
  tone = "paper",
  id,
  children,
}: MediaSplitProps) {
  return (
    <section id={id} className={cn("grid lg:grid-cols-2", tones[tone])}>
      <div
        className={cn(
          "relative aspect-[4/3] bg-navy lg:aspect-auto lg:min-h-[34rem]",
          side === "right" && "lg:order-2",
        )}
      >
        {image.src ? (
          <CoverImage
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : null}
      </div>
      <div
        className={cn(
          "flex items-center px-4 py-16 sm:px-6 lg:py-24",
          side === "left"
            ? "lg:pl-16 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]"
            : "lg:pr-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]",
        )}
      >
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </section>
  );
}
