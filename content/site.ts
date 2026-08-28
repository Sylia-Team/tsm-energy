import type { SiteConfig } from "@/types/site";

/**
 * MAQUETTE — contenu fictif à remplacer avant mise en production.
 * Téléphone et adresse : pistes issues du site actuel tsm83.com.
 */
export const site: SiteConfig = {
  name: "TSM Énergies Services",
  shortName: "TSM",
  legalName: "TSM Énergies Services",
  tagline: "Entreprise générale du bâtiment à Sanary-sur-Mer",
  description:
    "TSM Énergies Services, entreprise générale du bâtiment à Sanary-sur-Mer, rénove, isole, agrandit et construit des maisons dans le Var, de Six-Fours à Toulon.",
  url: "https://www.tsm83.com",
  urlStatus: "needs-confirmation",
  phone: "04 94 32 36 15",
  phoneHref: "tel:+33494323615",
  phoneStatus: "needs-confirmation",
  email: "contact@tsm83.com",
  address: {
    street: "95 rue de l’Innovation",
    additional: "Parc d’activité de la Baou",
    postalCode: "83110",
    city: "Sanary-sur-Mer",
    region: "Var",
    country: "France",
  },
  addressStatus: "needs-confirmation",
  foundedYear: 2004,
  foundedYearStatus: "needs-confirmation",
  openingHours: "Du lundi au vendredi, 8h30 – 18h",
  siret: "478 392 601 00027",
  vatNumber: "FR19478392601",
};
