import { routes } from "@/lib/routes";

export type NavItem = {
  href: string;
  label: string;
};

export const headerNav: NavItem[] = [
  { href: routes.services, label: "Services" },
  { href: routes.realisations, label: "Réalisations" },
  { href: routes.zones, label: "Zones d’intervention" },
  { href: routes.entreprise, label: "L’entreprise" },
  { href: routes.contact, label: "Contact" },
];

export const footerNav: NavItem[] = [
  { href: routes.home, label: "Accueil" },
  { href: routes.services, label: "Services" },
  { href: routes.realisations, label: "Réalisations" },
  { href: routes.zones, label: "Zones d’intervention" },
  { href: routes.entreprise, label: "L’entreprise" },
  { href: routes.avis, label: "Avis clients" },
  { href: routes.actualites, label: "Actualités" },
  { href: routes.quote, label: "Demande de devis" },
  { href: routes.contact, label: "Contact" },
];

export const legalNav: NavItem[] = [
  { href: routes.legal, label: "Mentions légales" },
  { href: routes.privacy, label: "Politique de confidentialité" },
  { href: routes.cookies, label: "Cookies" },
];
