import type { Certification } from "@/types/content";

/** MAQUETTE — labels fictifs à remplacer par les qualifications réellement en cours. */
export const certifications: Certification[] = [
  {
    id: "rge-qualibat",
    name: "Qualibat RGE",
    description:
      "Qualification pour la rénovation énergétique : isolation, menuiseries et systèmes associés.",
  },
  {
    id: "qualipac",
    name: "QualiPAC",
    description:
      "Compétence reconnue pour l’installation de pompes à chaleur et de climatisation.",
  },
  {
    id: "decennale",
    name: "Garantie décennale",
    description:
      "Travaux couverts par une assurance décennale, selon la nature des ouvrages concernés.",
  },
  {
    id: "rc-pro",
    name: "Assurance responsabilité civile",
    description:
      "Couverture professionnelle pour les interventions sur maisons individuelles et locaux.",
  },
];
