import type { Testimonial } from "@/types/content";

/** MAQUETTE — avis fictifs à remplacer par de vrais témoignages. */
export const testimonials: Testimonial[] = [
  {
    id: "martine-sanary",
    quote:
      "Nous avions peur de multiplier les artisans. TSM a tout coordonné : maçonnerie, peinture, plomberie. Le chantier a tenu les délais annoncés.",
    author: "Martine L.",
    city: "Sanary-sur-Mer",
    project: "Rénovation complète",
  },
  {
    id: "jean-six-fours",
    quote:
      "L’isolation des combles a changé le confort d’été. L’équipe a été claire sur les travaux, sans mauvaise surprise sur le devis.",
    author: "Jean-Pierre M.",
    city: "Six-Fours-les-Plages",
    project: "Isolation",
  },
  {
    id: "claire-bandol",
    quote:
      "L’extension s’intègre à la maison existante. Un interlocuteur unique, des réponses rapides, et un suivi de chantier sérieux.",
    author: "Claire D.",
    city: "Bandol",
    project: "Extension",
  },
];
