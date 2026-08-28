/** MAQUETTE — textes du formulaire de devis. */
export const quoteContent = {
  eyebrow: "Devis",
  title: "Demander un devis dans le Var",
  description:
    "Six étapes, deux minutes. Nous revenons vers vous pour convenir d’une visite. Le devis se fait après le rendez-vous, pas en ligne.",
  seoTitle: "Demande de devis rénovation dans le Var",
  seoDescription:
    "Demandez un devis de rénovation, isolation, toiture ou extension dans le Var. TSM vous rappelle pour organiser une visite depuis Sanary-sur-Mer.",
  phoneLabel: "Préférer un appel ?",
  steps: [
    { id: 1, title: "Type de projet" },
    { id: 2, title: "Localisation" },
    { id: 3, title: "Projet" },
    { id: 4, title: "Photos" },
    { id: 5, title: "Coordonnées" },
    { id: 6, title: "Validation" },
  ],
  projectTypes: {
    renovation: "Rénovation",
    construction: "Construction",
    extension: "Extension",
    isolation: "Isolation",
    climatisation: "Climatisation",
    toiture: "Toiture",
    plomberie: "Plomberie",
    electricite: "Électricité",
    peinture: "Peinture",
    autre: "Autre",
  },
  timelines: {
    asap: "Dès que possible",
    "1-3-months": "Dans 1 à 3 mois",
    "3-6-months": "Dans 3 à 6 mois",
    "6-months-plus": "Dans plus de 6 mois",
    unknown: "Pas encore défini",
  },
  budgets: {
    "under-10k": "Moins de 10 000 €",
    "10-30k": "10 000 à 30 000 €",
    "30-80k": "30 000 à 80 000 €",
    "80k-plus": "Plus de 80 000 €",
    unknown: "Je ne sais pas encore",
  },
  consent:
    "J’accepte que TSM Énergies Services utilise ces informations pour me recontacter au sujet de ce devis.",
  confirmationTitle: "Demande bien reçue",
  confirmationBody:
    "Merci. Nous relisons votre demande et vous recontactons pour convenir d’une visite. Ce n’est pas encore un devis : l’estimation se fait sur place.",
};

export const QUOTE_STEP_COUNT = quoteContent.steps.length;
