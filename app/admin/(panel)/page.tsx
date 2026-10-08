import Link from "next/link";
import { routes } from "@/lib/routes";

const sections = [
  {
    href: routes.adminHome,
    title: "Page d’accueil",
    description:
      "Héros, sections, chiffres, appels à l’action et textes de la page d’accueil.",
    available: true,
  },
  {
    href: routes.adminEntreprise,
    title: "Page « L’entreprise »",
    description:
      "Héros, histoire, méthode, garanties, zones et appel à l’action.",
    available: true,
  },
  {
    href: routes.adminContact,
    title: "Page « Contact »",
    description: "En-tête, encart devis, libellés des coordonnées et SEO.",
    available: true,
  },
  {
    href: routes.adminServices,
    title: "Services",
    description:
      "Contenu de chaque service : héros, besoin, prestations, méthode, FAQ, SEO.",
    available: true,
  },
  {
    href: routes.adminZones,
    title: "Zones d’intervention",
    description:
      "Contenu de chaque commune : héros, introduction locale, alentours, SEO.",
    available: true,
  },
  {
    href: routes.adminRealisations,
    title: "Réalisations",
    description:
      "Créer, modifier et supprimer des chantiers : étude de cas, images, rattachements.",
    available: true,
  },
  {
    href: routes.adminReviews,
    title: "Avis clients",
    description:
      "Page « Avis clients » et avis Google (API Places) : Place ID, note minimale, nombre affiché.",
    available: true,
  },
  {
    href: routes.adminSite,
    title: "Configuration du site",
    description:
      "Identité, coordonnées, adresse, horaires et informations légales.",
    available: true,
  },
  {
    href: routes.adminListings,
    title: "Pages d’index (listings)",
    description:
      "En-têtes et introductions des pages Services, Zones et Réalisations.",
    available: true,
  },
  {
    href: routes.adminCertifications,
    title: "Certifications & garanties",
    description: "Qualifications et assurances affichées sur le site.",
    available: true,
  },
  {
    href: routes.adminLegalPages,
    title: "Pages légales",
    description: "Mentions légales, politique de confidentialité et cookies.",
    available: true,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Contenu du site</h1>
      <p className="mt-2 text-ink-muted">
        Choisissez la section à modifier. Les changements sont publiés
        immédiatement après enregistrement.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const card = (
            <div
              className={`h-full rounded-lg border p-6 ${
                section.available
                  ? "border-line bg-paper-elevated hover:border-navy"
                  : "border-dashed border-line bg-mist opacity-70"
              }`}
            >
              <h2 className="font-semibold text-ink">{section.title}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {section.description}
              </p>
            </div>
          );

          return section.available ? (
            <Link key={section.title} href={section.href} className="block">
              {card}
            </Link>
          ) : (
            <div key={section.title} aria-disabled="true">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
