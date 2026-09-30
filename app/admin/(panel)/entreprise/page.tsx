import Link from "next/link";
import { getEntrepriseContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveEntrepriseAction } from "./actions";
import { ImageUploadField } from "../_components/image-upload-field";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminEntreprisePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const saved = params.saved === "1";
  const imageError = params.error === "image";
  const page = getEntrepriseContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">
            Page « L’entreprise »
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link href={routes.admin} className="underline underline-offset-4">
              ← Retour
            </Link>
          </p>
        </div>
        <Link
          href={routes.entreprise}
          target="_blank"
          className="text-sm font-medium text-forest underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved} imageError={imageError} />

      <form action={saveEntrepriseAction} className="mt-6 grid gap-6">
        <SectionCard title="En-tête (héros)">
          <TextField name="eyebrow" label="Sur-titre" defaultValue={page.eyebrow} />
          <TextField name="title" label="Titre" defaultValue={page.title} />
          <TextAreaField
            name="description"
            label="Description"
            defaultValue={page.description}
          />
          <ImageUploadField name="image" label="Photo" image={page.image} />
        </SectionCard>

        <SectionCard title="Référencement (SEO)">
          <TextField
            name="seoTitle"
            label="Titre SEO"
            defaultValue={page.seoTitle}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={page.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Notre histoire">
          <TextField
            name="storyTitle"
            label="Titre"
            defaultValue={page.storyTitle}
          />
          <TextAreaField
            name="story"
            label="Paragraphes"
            rows={8}
            defaultValue={page.story.join("\n\n")}
            hint="Séparez chaque paragraphe par une ligne vide."
          />
        </SectionCard>

        <SectionCard title="Méthode / déroulé de chantier">
          <TextField
            name="methodTitle"
            label="Titre"
            defaultValue={page.methodTitle}
          />
          <TextAreaField
            name="methodDescription"
            label="Description"
            defaultValue={page.methodDescription}
          />
          {page.method.map((item, index) => (
            <div
              key={`${index}-${item.title}`}
              className="grid gap-4 rounded-md border border-stone-200 p-4"
            >
              <p className="text-xs font-medium uppercase text-ink-muted">
                Étape {index + 1}
              </p>
              <TextField
                name={`method.${index}.title`}
                label="Titre"
                defaultValue={item.title}
              />
              <TextAreaField
                name={`method.${index}.description`}
                label="Description"
                defaultValue={item.description}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Section « Garanties »">
          <TextField
            name="certificationsEyebrow"
            label="Sur-titre"
            defaultValue={page.certificationsEyebrow}
          />
          <TextField
            name="certificationsTitle"
            label="Titre"
            defaultValue={page.certificationsTitle}
          />
          <TextAreaField
            name="certificationsDescription"
            label="Description"
            defaultValue={page.certificationsDescription}
          />
        </SectionCard>

        <SectionCard title="Section « Zones »">
          <TextField
            name="zonesEyebrow"
            label="Sur-titre"
            defaultValue={page.zonesEyebrow}
          />
          <TextField
            name="zonesTitle"
            label="Titre"
            defaultValue={page.zonesTitle}
          />
          <TextAreaField
            name="zonesDescription"
            label="Description"
            defaultValue={page.zonesDescription}
          />
        </SectionCard>

        <SectionCard title="Appel à l’action final">
          <TextField
            name="ctaTitle"
            label="Titre"
            defaultValue={page.ctaTitle}
          />
          <TextAreaField
            name="ctaDescription"
            label="Description"
            defaultValue={page.ctaDescription}
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
