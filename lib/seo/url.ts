import { getSite } from "@/lib/content";

export const LOCAL_BUSINESS_ID = "#localbusiness";

export function siteOrigin(url = getSite().url): string {
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path: string, origin = siteOrigin()): string {
  if (path === "/" || path === "") {
    return origin;
  }

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localBusinessId(origin = siteOrigin()): string {
  return `${origin}/${LOCAL_BUSINESS_ID}`;
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
