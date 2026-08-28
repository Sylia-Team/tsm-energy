import type { ServiceSlug, ZoneSlug } from "@/types/content";

export const routes = {
  home: "/",
  services: "/services",
  service: (slug: ServiceSlug) => `/services/${slug}`,
  realisations: "/realisations",
  realisation: (slug: string) => `/realisations/${slug}`,
  zones: "/zones-intervention",
  zone: (slug: ZoneSlug) => `/zones-intervention/${slug}`,
  entreprise: "/entreprise",
  avis: "/avis-clients",
  actualites: "/actualites",
  article: (slug: string) => `/actualites/${slug}`,
  quote: "/demande-de-devis",
  quoteConfirmation: "/demande-de-devis/confirmation",
  contact: "/contact",
  legal: "/mentions-legales",
  privacy: "/politique-confidentialite",
  cookies: "/cookies",
} as const;

export type AppPath =
  | (typeof routes)[keyof Omit<
      typeof routes,
      "service" | "realisation" | "article" | "zone"
    >]
  | ReturnType<typeof routes.service>
  | ReturnType<typeof routes.realisation>
  | ReturnType<typeof routes.article>
  | ReturnType<typeof routes.zone>;
