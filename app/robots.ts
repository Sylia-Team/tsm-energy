import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";
import { routes } from "@/lib/routes";
import { absoluteUrl, siteOrigin } from "@/lib/seo/url";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin(getSite().url);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.quoteConfirmation],
    },
    sitemap: absoluteUrl("/sitemap.xml", origin),
  };
}
