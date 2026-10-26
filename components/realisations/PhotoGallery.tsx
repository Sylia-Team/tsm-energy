import { CoverImage } from "@/components/ui/cover-image";
import type { MediaImage } from "@/types/media";

type PhotoGalleryProps = {
  images: MediaImage[];
};

export function PhotoGallery({ images }: PhotoGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {images.map((image) => (
        <li key={image.src} className="group overflow-hidden">
          <figure className="relative aspect-[4/3]">
            <CoverImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}
