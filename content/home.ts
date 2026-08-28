import type { HomeContent } from "@/types/home";

/** MAQUETTE — textes et photos d’illustration à remplacer. */
export const home: HomeContent = {
  hero: {
    eyebrow: "Sanary-sur-Mer · Var",
    title:
      "Rénovation de maison et entreprise générale du bâtiment dans le Var",
    description:
      "Un interlocuteur unique pour rénover, isoler, agrandir ou construire votre maison, de Sanary-sur-Mer à Toulon.",
    image: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=75",
      alt: "Maison individuelle en bord de Méditerranée — photo d’illustration",
      width: 1920,
      height: 1280,
    },
    primaryCta: "Demander un devis",
    secondaryCta: "Appeler",
  },
  value: {
    eyebrow: "Pourquoi TSM",
    title: "Un chantier cadré, du premier rendez-vous à la réception",
    description:
      "Nous intervenons comme entreprise générale : étude, coordination des métiers, suivi de chantier et interlocuteur dédié.",
    items: [
      {
        id: "interlocutor",
        title: "Un seul interlocuteur",
        description:
          "Vous ne pilotez pas une dizaine d’artisans. Un chef de projet suit votre maison de l’étude à la livraison.",
        icon: "interlocutor",
      },
      {
        id: "trades",
        title: "Tous corps d’état",
        description:
          "Maçonnerie, isolation, toiture, plomberie, électricité, peinture, climatisation : les métiers avancent ensemble.",
        icon: "trades",
      },
      {
        id: "local",
        title: "Ancrage local",
        description:
          "Basés à Sanary-sur-Mer, nous connaissons le climat, les maisons et les contraintes du littoral varois.",
        icon: "local",
      },
      {
        id: "followup",
        title: "Suivi de chantier",
        description:
          "Planning, points d’étape et réception : vous savez où en est le projet, sans jargon inutile.",
        icon: "followup",
      },
    ],
  },
  services: {
    eyebrow: "Métiers",
    title: "Les travaux que nous prenons en charge",
    description:
      "Rénovation, extension, isolation, toiture ou confort thermique : chaque mission peut être menée seule ou dans un projet global.",
    allLabel: "Tous les services",
  },
  about: {
    eyebrow: "L’entreprise",
    title: "TSM, entreprise générale du bâtiment à Sanary-sur-Mer",
    paragraphs: [
      "Depuis 2004, TSM Énergies Services accompagne particuliers et professionnels du Var sur des projets de rénovation, d’agrandissement et de construction. L’entreprise est installée au parc d’activité de la Baou, à Sanary-sur-Mer.",
      "Nous travaillons maison par maison : visite, devis détaillé, coordination des corps d’état et suivi jusqu’à la réception. L’objectif n’est pas d’empiler les interventions, mais de livrer un chantier cohérent, dans les règles de l’art.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=75",
      alt: "Équipe sur un chantier de rénovation — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    linkLabel: "Découvrir l’entreprise",
  },
  realisations: {
    eyebrow: "Chantiers",
    title: "Réalisations récentes dans le Var",
    description:
      "Quelques maisons rénovées, isolées ou agrandies autour de Sanary, Six-Fours, Bandol et Toulon.",
    allLabel: "Toutes les réalisations",
  },
  stats: {
    eyebrow: "En chiffres",
    title: "Une entreprise structurée pour vos travaux",
    items: [
      { id: "years", value: "20 ans", label: "d’activité dans le Var" },
      { id: "projects", value: "450", label: "maisons accompagnées" },
      { id: "trades", value: "14", label: "métiers coordonnés" },
      { id: "contact", value: "1", label: "interlocuteur dédié" },
    ],
  },
  certifications: {
    eyebrow: "Garanties",
    title: "Qualifications et assurances",
    description:
      "Les travaux sont menés dans un cadre professionnel : qualifications, décennale et responsabilité civile.",
  },
  testimonials: {
    eyebrow: "Avis",
    title: "Ce que disent nos clients",
    description:
      "Des propriétaires du Var qui nous ont confié une rénovation, une isolation ou une extension.",
    allLabel: "Tous les avis",
  },
  zones: {
    eyebrow: "Secteur",
    title: "Zones d’intervention",
    description:
      "Nous intervenons principalement sur le littoral ouest varois, autour de notre agence de Sanary-sur-Mer.",
    allLabel: "Voir le secteur d’intervention",
  },
  cta: {
    title: "Un projet de rénovation dans le Var ?",
    description:
      "Décrivez-nous votre maison, votre commune et le délai souhaité. Nous revenons vers vous pour un rendez-vous sur place.",
    primaryLabel: "Demander un devis",
    secondaryLabel: "Nous appeler",
  },
};
