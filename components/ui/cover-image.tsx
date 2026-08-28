import Image from "next/image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={75}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
