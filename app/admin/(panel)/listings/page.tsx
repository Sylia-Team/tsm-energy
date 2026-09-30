import Link from "next/link";
import {
  getRealisationsListingContent,
  getServicesListingContent,
  getZonesListingContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import type { MediaImage } from "@/types/media";
import { saveListingsAction } from "./actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

function BaseFields({
  prefix,
  base,
}: {
  prefix: string;
  base: {
    eyebrow: string;
    title: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    image: MediaImage;
  };
}) {
  return (
    <>
      <TextField
        name={`${prefix}.eyebrow`}
        label="Sur-titre"
        defaultValue={base.eyebrow}
      />
      <TextField name={`${prefix}.title`} label="Titre" defaultValue={base.title} />
      <TextAreaField
        name={`${prefix}.description`}
        label="Description"
        defaultValue={base.description}
      />
      <TextField
        name={`${prefix}.seoTitle`}
        label="Titre SEO"
        defaultValue={base.seoTitle}
      />
      <TextAreaField
        name={`${prefix}.seoDescription`}
        label="Description SEO"
        defaultValue={base.seoDescription}
      />
      <TextField
        name={`${prefix}.image.src`}
        label="Image — URL"
        defaultValue={base.image.src}
      />
      <TextField
        name={`${prefix}.image.alt`}
        label="Image — texte alternatif"
        defaultValue={base.image.alt}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name={`${prefix}.image.width`}
          label="Image — largeur"
          type="number"
          defaultValue={base.image.width}
        />
        <TextField
          name={`${prefix}.image.height`}
          label="Image — hauteur"
          type="number"
          defaultValue={base.image.height}
        />
      </div>
    </>
  );
}

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const services = getServicesListingContent();
  const zones = getZonesListingContent();
  const realisations = getRealisationsListingContent();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-forest">
          Pages d’index (listings)
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          <Link href={routes.admin} className="underline underline-offset-4">
            ← Retour
          </Link>
        </p>
      </div>

      <SavedNotice saved={saved === "1"} />

      <form action={saveListingsAction} className="mt-6 grid gap-6">
        <SectionCard title="Page « Services »">
          <BaseFields prefix="services" base={services} />
        </SectionCard>

        <SectionCard title="Page « Zones d’intervention »">
          <BaseFields prefix="zones" base={zones} />
          <TextField
            name="zones.introTitle"
            label="Titre de l’introduction"
            defaultValue={zones.introTitle}
          />
          <TextAreaField
            name="zones.intro"
            label="Introduction (paragraphes)"
            rows={5}
            defaultValue={zones.intro.join("\n\n")}
            hint="Séparez chaque paragraphe par une ligne vide."
          />
          <TextField
            name="zones.surroundingTitle"
            label="Titre « Communes voisines »"
            defaultValue={zones.surroundingTitle}
          />
          <TextAreaField
            name="zones.surrounding"
            label="Communes voisines"
            defaultValue={zones.surrounding}
          />
        </SectionCard>

        <SectionCard title="Page « Réalisations »">
          <BaseFields prefix="realisations" base={realisations} />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
