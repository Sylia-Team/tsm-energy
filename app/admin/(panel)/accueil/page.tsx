import Link from "next/link";
import { getHomeContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveHomeAction } from "./actions";
import { ImageUploadField } from "../_components/image-upload-field";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const saved = params.saved === "1";
  const imageError = params.error === "image";
  const home = getHomeContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">
            Page d’accueil
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <Link
          href={routes.home}
          target="_blank"
          className="text-sm font-medium text-navy underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved} imageError={imageError} />

      <form action={saveHomeAction} className="mt-6 grid gap-6">
        <SectionCard title="Héros">
          <TextField
            name="hero.eyebrow"
            label="Sur-titre"
            defaultValue={home.hero.eyebrow}
          />
          <TextField
            name="hero.title"
            label="Titre"
            defaultValue={home.hero.title}
          />
          <TextAreaField
            name="hero.description"
            label="Description"
            defaultValue={home.hero.description}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="hero.primaryCta"
              label="Bouton principal"
              defaultValue={home.hero.primaryCta}
            />
            <TextField
              name="hero.secondaryCta"
              label="Bouton secondaire"
              defaultValue={home.hero.secondaryCta}
            />
          </div>
          <ImageUploadField
            name="hero.image"
            label="Photo du héros"
            image={home.hero.image}
          />
        </SectionCard>

        <SectionCard title="Section « Pourquoi TSM »">
          <TextField
            name="value.eyebrow"
            label="Sur-titre"
            defaultValue={home.value.eyebrow}
          />
          <TextField
            name="value.title"
            label="Titre"
            defaultValue={home.value.title}
          />
          <TextAreaField
            name="value.description"
            label="Description"
            defaultValue={home.value.description}
          />
          {home.value.items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-md border border-line p-4"
            >
              <p className="mb-3 text-xs font-medium uppercase text-ink-muted">
                Atout {index + 1}
              </p>
              <input
                type="hidden"
                name={`value.items.${index}.id`}
                value={item.id}
              />
              <input
                type="hidden"
                name={`value.items.${index}.icon`}
                value={item.icon}
              />
              <div className="grid gap-4">
                <TextField
                  name={`value.items.${index}.title`}
                  label="Titre"
                  defaultValue={item.title}
                />
                <TextAreaField
                  name={`value.items.${index}.description`}
                  label="Description"
                  defaultValue={item.description}
                />
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Section « Services »">
          <TextField
            name="services.eyebrow"
            label="Sur-titre"
            defaultValue={home.services.eyebrow}
          />
          <TextField
            name="services.title"
            label="Titre"
            defaultValue={home.services.title}
          />
          <TextAreaField
            name="services.description"
            label="Description"
            defaultValue={home.services.description}
          />
          <TextField
            name="services.allLabel"
            label="Libellé du lien"
            defaultValue={home.services.allLabel}
          />
        </SectionCard>

        <SectionCard title="Section « L’entreprise »">
          <TextField
            name="about.eyebrow"
            label="Sur-titre"
            defaultValue={home.about.eyebrow}
          />
          <TextField
            name="about.title"
            label="Titre"
            defaultValue={home.about.title}
          />
          <TextAreaField
            name="about.paragraphs"
            label="Paragraphes"
            rows={6}
            defaultValue={home.about.paragraphs.join("\n\n")}
            hint="Séparez chaque paragraphe par une ligne vide."
          />
          <ImageUploadField
            name="about.image"
            label="Photo de la section"
            image={home.about.image}
          />
          <TextField
            name="about.linkLabel"
            label="Libellé du lien"
            defaultValue={home.about.linkLabel}
          />
        </SectionCard>

        <SectionCard title="Section « Réalisations »">
          <TextField
            name="realisations.eyebrow"
            label="Sur-titre"
            defaultValue={home.realisations.eyebrow}
          />
          <TextField
            name="realisations.title"
            label="Titre"
            defaultValue={home.realisations.title}
          />
          <TextAreaField
            name="realisations.description"
            label="Description"
            defaultValue={home.realisations.description}
          />
          <TextField
            name="realisations.allLabel"
            label="Libellé du lien"
            defaultValue={home.realisations.allLabel}
          />
        </SectionCard>

        <SectionCard title="Section « En chiffres »">
          <TextField
            name="stats.eyebrow"
            label="Sur-titre"
            defaultValue={home.stats.eyebrow}
          />
          <TextField
            name="stats.title"
            label="Titre"
            defaultValue={home.stats.title}
          />
          {home.stats.items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-md border border-line p-4 sm:grid-cols-2"
            >
              <input
                type="hidden"
                name={`stats.items.${index}.id`}
                value={item.id}
              />
              <TextField
                name={`stats.items.${index}.value`}
                label={`Chiffre ${index + 1}`}
                defaultValue={item.value}
              />
              <TextField
                name={`stats.items.${index}.label`}
                label="Libellé"
                defaultValue={item.label}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Section « Garanties »">
          <TextField
            name="certifications.eyebrow"
            label="Sur-titre"
            defaultValue={home.certifications.eyebrow}
          />
          <TextField
            name="certifications.title"
            label="Titre"
            defaultValue={home.certifications.title}
          />
          <TextAreaField
            name="certifications.description"
            label="Description"
            defaultValue={home.certifications.description}
          />
        </SectionCard>

        <SectionCard title="Section « Avis »">
          <TextField
            name="testimonials.eyebrow"
            label="Sur-titre"
            defaultValue={home.testimonials.eyebrow}
          />
          <TextField
            name="testimonials.title"
            label="Titre"
            defaultValue={home.testimonials.title}
          />
          <TextAreaField
            name="testimonials.description"
            label="Description"
            defaultValue={home.testimonials.description}
          />
          <TextField
            name="testimonials.allLabel"
            label="Libellé du lien"
            defaultValue={home.testimonials.allLabel}
          />
        </SectionCard>

        <SectionCard title="Section « Zones »">
          <TextField
            name="zones.eyebrow"
            label="Sur-titre"
            defaultValue={home.zones.eyebrow}
          />
          <TextField
            name="zones.title"
            label="Titre"
            defaultValue={home.zones.title}
          />
          <TextAreaField
            name="zones.description"
            label="Description"
            defaultValue={home.zones.description}
          />
          <TextField
            name="zones.allLabel"
            label="Libellé du lien"
            defaultValue={home.zones.allLabel}
          />
        </SectionCard>

        <SectionCard title="Appel à l’action final">
          <TextField
            name="cta.title"
            label="Titre"
            defaultValue={home.cta.title}
          />
          <TextAreaField
            name="cta.description"
            label="Description"
            defaultValue={home.cta.description}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="cta.primaryLabel"
              label="Bouton principal"
              defaultValue={home.cta.primaryLabel}
            />
            <TextField
              name="cta.secondaryLabel"
              label="Bouton secondaire"
              defaultValue={home.cta.secondaryLabel}
            />
          </div>
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
