import type { Metadata } from "next";
import { getSiteContent } from "@/lib/admin/content-read";
import { absoluteUrl } from "@/lib/seo/url";
import type { MediaImage } from "@/types/media";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: MediaImage;
  index?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  index = true,
}: PageMetadataInput): Metadata {
  const site = getSiteContent();
  const images = image
    ? [
        {
          url: image.src,
          alt: image.alt,
          width: image.width,
          height: image.height,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title,
      description,
      url: absoluteUrl(path),
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.map((item) => item.url),
    },
  };
}
