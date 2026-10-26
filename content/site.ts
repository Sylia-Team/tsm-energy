import type { SiteConfig } from "@/types/site";

/**
 * Identité de l'entreprise. Forme juridique, adresse, SIREN/SIRET, TVA,
 * téléphone, e-mail, horaires et année de création confirmés par TSM (oct. 2026).
 * Domaine : piste issue du site actuel tsm83.com, à confirmer.
 * Coordonnées GPS : Base Adresse Nationale (précision au numéro).
 */
export const site: SiteConfig = {
  name: "TSM Énergies Services",
  shortName: "TSM",
  legalName: "TSM Énergies Services",
  legalForm: "SARL",
  tagline: "Entreprise générale du bâtiment à Sanary-sur-Mer",
  description:
    "TSM Énergies Services, entreprise générale du bâtiment à Sanary-sur-Mer, rénove, isole, agrandit et construit des maisons dans le Var, de Six-Fours à Toulon.",
  url: "https://www.tsm83.com",
  urlStatus: "needs-confirmation",
  phone: "04 94 32 36 15",
  phoneHref: "tel:+33494323615",
  phoneStatus: "confirmed",
  email: "buro@tsm83.com",
  address: {
    street: "95 rue de l’Innovation",
    additional: "Parc d’activité de la Baou",
    postalCode: "83110",
    city: "Sanary-sur-Mer",
    region: "Var",
    country: "France",
  },
  addressStatus: "confirmed",
  geo: { latitude: 43.125239, longitude: 5.816045 },
  foundedYear: 2004,
  foundedYearStatus: "confirmed",
  openingHours: "Du lundi au vendredi, 8h – 18h",
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  siren: "477 959 225",
  siret: "477 959 225 00046",
  vatNumber: "FR19477959225",
};
