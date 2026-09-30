import Link from "next/link";
import { notFound } from "next/navigation";
import { getZoneContent } from "@/lib/admin/content-read";
import { isZoneSlug } from "@/lib/content";
import { routes } from "@/lib/routes";
import { saveZoneAction } from "../actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../../_components/fields";

export default async function AdminZoneEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;

  if (!isZoneSlug(slug)) {
    notFound();
  }

  const zone = getZoneContent(slug);

  if (!zone) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">
            Commune · {zone.name}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link
              href={routes.adminZones}
              className="underline underline-offset-4"
            >
              ← Retour aux zones
            </Link>
          </p>
        </div>
        <Link
          href={routes.zone(zone.slug)}
          target="_blank"
          className="text-sm font-medium text-forest underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved === "1"} />

      <form action={saveZoneAction} className="mt-6 grid gap-6">
        <input type="hidden" name="slug" value={zone.slug} />

        <SectionCard title="Présentation">
          <TextField name="name" label="Nom de la commune" defaultValue={zone.name} />
          <TextAreaField
            name="excerpt"
            label="Accroche (résumé)"
            defaultValue={zone.excerpt}
          />
        </SectionCard>

        <SectionCard title="Référencement (SEO)">
          <TextField
            name="seoTitle"
            label="Titre SEO"
            defaultValue={zone.seoTitle}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={zone.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Héros">
          <TextField
            name="hero.eyebrow"
            label="Sur-titre"
            defaultValue={zone.hero.eyebrow}
          />
          <TextField
            name="hero.title"
            label="Titre"
            defaultValue={zone.hero.title}
          />
          <TextAreaField
            name="hero.description"
            label="Description"
            defaultValue={zone.hero.description}
          />
          <TextField
            name="hero.image.src"
            label="Image — URL"
            defaultValue={zone.hero.image.src}
          />
          <TextField
            name="hero.image.alt"
            label="Image — texte alternatif"
            defaultValue={zone.hero.image.alt}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="hero.image.width"
              label="Image — largeur"
              type="number"
              defaultValue={zone.hero.image.width}
            />
            <TextField
              name="hero.image.height"
              label="Image — hauteur"
              type="number"
              defaultValue={zone.hero.image.height}
            />
          </div>
        </SectionCard>

        <SectionCard title="Introduction locale">
          <TextField
            name="introTitle"
            label="Titre"
            defaultValue={zone.introTitle}
          />
          <TextAreaField
            name="intro"
            label="Paragraphes"
            rows={6}
            defaultValue={zone.intro.join("\n\n")}
            hint="Séparez chaque paragraphe par une ligne vide."
          />
        </SectionCard>

        <SectionCard title="Alentours">
          <TextAreaField
            name="surrounding"
            label="Communes alentours"
            defaultValue={zone.surrounding}
          />
        </SectionCard>

        <SectionCard title="Appel à l’action final">
          <TextField
            name="ctaTitle"
            label="Titre"
            defaultValue={zone.ctaTitle}
          />
          <TextAreaField
            name="ctaDescription"
            label="Description"
            defaultValue={zone.ctaDescription}
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
