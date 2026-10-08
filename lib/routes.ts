import type { ServiceSlug, ZoneSlug } from "@/types/content";
import type { LegalSlug } from "@/types/legal";

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
  quote: "/demande-de-devis",
  quoteConfirmation: "/demande-de-devis/confirmation",
  contact: "/contact",
  legal: "/mentions-legales",
  privacy: "/politique-confidentialite",
  cookies: "/cookies",
  admin: "/admin",
  adminLogin: "/admin/login",
  adminHome: "/admin/accueil",
  adminEntreprise: "/admin/entreprise",
  adminContact: "/admin/contact",
  adminReviews: "/admin/avis",
  adminServices: "/admin/services",
  adminService: (slug: ServiceSlug) => `/admin/services/${slug}`,
  adminZones: "/admin/zones",
  adminZone: (slug: ZoneSlug) => `/admin/zones/${slug}`,
  adminRealisations: "/admin/realisations",
  adminRealisation: (slug: string) => `/admin/realisations/${slug}`,
  adminSite: "/admin/site",
  adminListings: "/admin/listings",
  adminCertifications: "/admin/certifications",
  adminLegalPages: "/admin/pages-legales",
  adminLegalPage: (slug: LegalSlug) => `/admin/pages-legales/${slug}`,
  apiCommunes: "/api/communes",
} as const;

export const legalPaths: Record<LegalSlug, string> = {
  "mentions-legales": routes.legal,
  "politique-confidentialite": routes.privacy,
  cookies: routes.cookies,
};

export type AppPath =
  | (typeof routes)[keyof Omit<
      typeof routes,
      | "service"
      | "realisation"
      | "zone"
      | "adminService"
      | "adminZone"
      | "adminRealisation"
      | "adminLegalPage"
    >]
  | ReturnType<typeof routes.service>
  | ReturnType<typeof routes.realisation>
  | ReturnType<typeof routes.zone>
  | ReturnType<typeof routes.adminService>
  | ReturnType<typeof routes.adminZone>
  | ReturnType<typeof routes.adminRealisation>
  | ReturnType<typeof routes.adminLegalPage>;
