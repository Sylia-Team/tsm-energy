import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRealisationContent,
  getServicesContent,
  getZonesContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveRealisationAction } from "../actions";
import { ImageUploadField } from "../../_components/image-upload-field";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../../_components/fields";

const selectClass =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-forest focus:ring-1 focus:ring-forest";

export default async function AdminRealisationEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { saved, error } = await searchParams;

  const realisation = getRealisationContent(slug);

  if (!realisation) {
    notFound();
  }

  const services = getServicesContent();
  const zones = getZonesContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">
            Chantier · {realisation.name}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link
              href={routes.adminRealisations}
              className="underline underline-offset-4"
            >
              ← Retour aux réalisations
            </Link>
          </p>
        </div>
        <Link
          href={routes.realisation(realisation.slug)}
          target="_blank"
          className="text-sm font-medium text-forest underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

      <SavedNotice saved={saved === "1"} imageError={error === "image"} />

      <form action={saveRealisationAction} className="mt-6 grid gap-6">
        <input type="hidden" name="originalSlug" value={realisation.slug} />

        <SectionCard title="Présentation">
          <label className="flex items-center gap-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={realisation.featured}
              className="h-4 w-4 rounded border-stone-300"
            />
            Mettre ce chantier en avant (accueil)
          </label>
          <TextField
            name="name"
            label="Nom du chantier"
            defaultValue={realisation.name}
          />
          <TextField
            name="slug"
            label="Identifiant URL (slug)"
            defaultValue={realisation.slug}
          />
          <TextField
            name="city"
            label="Ville"
            defaultValue={realisation.city}
          />
          <TextAreaField
            name="excerpt"
            label="Accroche (résumé)"
            defaultValue={realisation.excerpt}
          />
        </SectionCard>

        <SectionCard title="Rattachements">
          <div>
            <label htmlFor="zoneSlug" className="block text-sm font-medium text-ink">
              Commune (zone)
            </label>
            <select
              id="zoneSlug"
              name="zoneSlug"
              defaultValue={realisation.zoneSlug}
              className={selectClass}
            >
              {zones.map((zone) => (
                <option key={zone.slug} value={zone.slug}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-ink">
              Services concernés
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <label
                  key={service.slug}
                  className="flex items-center gap-2 text-sm text-ink"
                >
                  <input
                    type="checkbox"
                    name="serviceSlugs"
                    value={service.slug}
                    defaultChecked={realisation.serviceSlugs.includes(
                      service.slug,
                    )}
                    className="h-4 w-4 rounded border-stone-300"
                  />
                  {service.shortTitle}
                </label>
              ))}
            </div>
          </fieldset>
        </SectionCard>

        <SectionCard title="Référencement (SEO)">
          <TextField
            name="seoTitle"
            label="Titre SEO"
            defaultValue={realisation.seoTitle}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={realisation.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Étude de cas">
          <TextAreaField
            name="context"
            label="Contexte"
            defaultValue={realisation.context}
          />
          <TextAreaField
            name="problem"
            label="Problématique"
            defaultValue={realisation.problem}
          />
          <TextAreaField
            name="works"
            label="Travaux réalisés"
            rows={5}
            defaultValue={realisation.works.join("\n")}
            hint="Un élément par ligne."
          />
          <TextAreaField
            name="trades"
            label="Corps d’état"
            rows={4}
            defaultValue={realisation.trades.join("\n")}
            hint="Un élément par ligne."
          />
          <TextAreaField
            name="result"
            label="Résultat"
            defaultValue={realisation.result}
          />
        </SectionCard>

        <SectionCard title="Image principale">
          <ImageUploadField name="image" label="Photo" image={realisation.image} />
        </SectionCard>

        <SectionCard title="Galerie">
          <input type="hidden" name="gallery.count" value={realisation.gallery.length} />
          {realisation.gallery.map((item, index) => (
            <div
              key={`${index}-${item.src}`}
              className="rounded-md border border-stone-200 p-4"
            >
              <ImageUploadField
                name={`gallery.${index}`}
                label={`Photo ${index + 1}`}
                image={item}
              />
            </div>
          ))}
          <ImageUploadField
            name="gallery.new"
            label="Ajouter une photo"
            image={{ src: "", alt: "", width: 0, height: 0 }}
            allowRemove={false}
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
