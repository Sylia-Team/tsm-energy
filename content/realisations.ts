import type { Realisation } from "@/types/content";

/** MAQUETTE — chantiers et photos d’illustration à remplacer. */
export const realisations: Realisation[] = [
  {
    slug: "renovation-villa-sanary",
    name: "Rénovation d’une villa à Sanary-sur-Mer",
    city: "Sanary-sur-Mer",
    zoneSlug: "sanary-sur-mer",
    serviceSlugs: ["renovation-maison", "maconnerie", "peinture"],
    excerpt:
      "Rénovation complète d’une villa des années 70 : distribution, façades et finitions.",
    seoTitle: "Rénovation d’une villa à Sanary-sur-Mer",
    seoDescription:
      "Rénovation d’une villa des années 70 à Sanary-sur-Mer : redistribution, façades et finitions, coordonnées par TSM.",
    context:
      "Maison individuelle sur colline, exposée sud, habitée à l’année par un couple.",
    problem:
      "Pièces cloisonnées, menuiseries fatiguées et isolation insuffisante en été comme en hiver.",
    works: [
      "Reprise de cloisons et redistribution du rez-de-chaussée",
      "Ravalement de façade et traitement des fissures",
      "Peintures intérieures et extérieures",
    ],
    trades: ["Maçonnerie", "Peinture", "Coordination tous corps d’état"],
    result:
      "Volume plus lisible, façades saines et une maison plus confortable au quotidien.",
    image: {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=75",
      alt: "Villa rénovée à Sanary-sur-Mer — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=75",
        alt: "Séjour rénové à Sanary-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=75",
        alt: "Façade de villa à Sanary-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: true,
  },
  {
    slug: "isolation-maison-six-fours",
    name: "Isolation d’une maison à Six-Fours-les-Plages",
    city: "Six-Fours-les-Plages",
    zoneSlug: "six-fours-les-plages",
    serviceSlugs: ["isolation", "toiture"],
    excerpt:
      "Isolation des combles et des murs pour réduire la chaleur estivale et les déperditions.",
    seoTitle: "Isolation d’une maison à Six-Fours-les-Plages",
    seoDescription:
      "Isolation des combles et des murs d’une maison à Six-Fours-les-Plages, pour plus de confort été comme hiver.",
    context:
      "Maison de village sur deux niveaux, combles perdus et murs peu isolés.",
    problem:
      "Surplus de chaleur l’été, factures de chauffage élevées, inconfort dans les chambres sous toiture.",
    works: [
      "Isolation des combles",
      "Isolation par l’intérieur des murs nord",
      "Reprise partielle de couverture",
    ],
    trades: ["Isolation", "Toiture"],
    result:
      "Températures plus stables et une maison plus économe, sans changer le caractère du bâtiment.",
    image: {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75",
      alt: "Intérieur de maison isolée à Six-Fours-les-Plages — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=75",
        alt: "Combles aménagés à Six-Fours-les-Plages — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1600566752229-250ed2c80f32?auto=format&fit=crop&w=1600&q=75",
        alt: "Toiture reprise à Six-Fours-les-Plages — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: true,
  },
  {
    slug: "extension-maison-bandol",
    name: "Extension d’une maison à Bandol",
    city: "Bandol",
    zoneSlug: "bandol",
    serviceSlugs: ["extension-maison", "maconnerie"],
    excerpt:
      "Pièce de vie supplémentaire ouverte sur le jardin, en continuité de la maison existante.",
    seoTitle: "Extension de maison à Bandol",
    seoDescription:
      "Extension de 28 m² à Bandol : pièce de vie ouverte sur le jardin, en continuité de la maison existante.",
    context:
      "Maison des années 80 trop juste pour une famille de quatre personnes.",
    problem:
      "Séjour étroit, cuisine fermée, besoin d’une pièce supplémentaire sans quitter le quartier.",
    works: [
      "Extension maçonnée de 28 m²",
      "Ouverture sur l’existant et reprise des seuils",
      "Raccordements plomberie et électricité",
    ],
    trades: ["Maçonnerie", "Électricité", "Plomberie"],
    result:
      "Un séjour agrandi, une circulation plus fluide et un jardin mieux relié à la maison.",
    image: {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=75",
      alt: "Extension de maison à Bandol — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1600&q=75",
        alt: "Pièce de vie ouverte sur le jardin à Bandol — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75",
        alt: "Liaison intérieur-jardin à Bandol — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: true,
  },
  {
    slug: "toiture-maison-toulon",
    name: "Réfection de toiture à Toulon",
    city: "Toulon",
    zoneSlug: "toulon",
    serviceSlugs: ["toiture"],
    excerpt:
      "Remplacement de couverture et reprise d’étanchéité sur une maison de ville.",
    seoTitle: "Réfection de toiture à Toulon",
    seoDescription:
      "Réfection de toiture à Toulon : dépose, écran de sous-toiture, tuiles et zinguerie pour une couverture étanche.",
    context:
      "Toiture tuiles canal, exposée mistral et embruns, fuites récurrentes.",
    problem:
      "Infiltrations en sous-face, liteaux fatigués, risque de dégradation de la charpente.",
    works: [
      "Dépose de la couverture existante",
      "Reprise d’écran de sous-toiture",
      "Pose de tuiles et zinguerie",
    ],
    trades: ["Toiture", "Charpente"],
    result:
      "Toiture étanche, charpente protégée et entretien facilité pour les années à venir.",
    image: {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=75",
      alt: "Chantier de toiture à Toulon — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=75",
        alt: "Chantier de couverture à Toulon — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=75",
        alt: "Toiture de maison de ville à Toulon — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: false,
  },
  {
    slug: "climatisation-maison-la-seyne",
    name: "Climatisation d’une maison à La Seyne-sur-Mer",
    city: "La Seyne-sur-Mer",
    zoneSlug: "la-seyne-sur-mer",
    serviceSlugs: ["climatisation"],
    excerpt:
      "Installation d’un système réversible pour le confort d’été dans une maison de plain-pied.",
    seoTitle: "Climatisation d’une maison à La Seyne-sur-Mer",
    seoDescription:
      "Installation d’une climatisation réversible dans une maison de plain-pied à La Seyne-sur-Mer.",
    context:
      "Maison orientée ouest, peu d’occultations, séjour surchauffé dès juin.",
    problem:
      "Températures intérieures difficiles à vivre l’après-midi, sans solution de rafraîchissement.",
    works: [
      "Étude des apports solaires",
      "Pose d’un système réversible",
      "Mise en service et consignes d’usage",
    ],
    trades: ["Climatisation"],
    result:
      "Séjour et chambres tenus à une température stable, avec un appareil dimensionné pour la maison.",
    image: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75",
      alt: "Maison climatisée à La Seyne-sur-Mer — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=75",
        alt: "Séjour d’une maison à La Seyne-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=75",
        alt: "Intérieur de maison à La Seyne-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: false,
  },
  {
    slug: "salle-de-bains-sanary",
    name: "Rénovation d’une salle de bains à Sanary-sur-Mer",
    city: "Sanary-sur-Mer",
    zoneSlug: "sanary-sur-mer",
    serviceSlugs: ["plomberie", "electricite", "peinture"],
    excerpt:
      "Reprise complète d’une salle de bains : réseaux, éclairage et finitions.",
    seoTitle: "Rénovation d’une salle de bains à Sanary-sur-Mer",
    seoDescription:
      "Rénovation d’une salle de bains à Sanary-sur-Mer : plomberie, électricité et finitions coordonnées.",
    context:
      "Maison des années 80, salle de bains d’origine trop étroite et mal ventilée.",
    problem:
      "Réseaux fatigués, éclairage insuffisant, peintures et joints en fin de vie.",
    works: [
      "Dépose et replomberie",
      "Nouveau tableau de pièce d’eau et points lumineux",
      "Peintures et finitions",
    ],
    trades: ["Plomberie", "Électricité", "Peinture"],
    result:
      "Une pièce d’eau plus claire, des réseaux sains et des finitions cohérentes avec le reste de la maison.",
    image: {
      src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=75",
      alt: "Salle de bains rénovée à Sanary-sur-Mer — photo d’illustration",
      width: 1600,
      height: 1067,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=75",
        alt: "Pièce d’eau rénovée à Sanary-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=75",
        alt: "Finitions de salle de bains à Sanary-sur-Mer — photo d’illustration",
        width: 1600,
        height: 1067,
      },
    ],
    featured: false,
  },
];
