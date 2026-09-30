import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceContent } from "@/lib/admin/content-read";
import { isServiceSlug } from "@/lib/content";
import { routes } from "@/lib/routes";
import { saveServiceAction } from "../actions";
import { ImageUploadField } from "../../_components/image-upload-field";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../../_components/fields";

export default async function AdminServiceEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { saved, error } = await searchParams;

  if (!isServiceSlug(slug)) {
    notFound();
  }

  const service = getServiceContent(slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">
            Service · {service.title}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            <Link
              href={routes.adminServices}
              className="underline underline-offset-4"
            >
              ← Retour aux services
            </Link>
          </p>
        </div>
        <Link
          href={routes.service(service.slug)}
          target="_blank"
          className="text-sm font-medium text-forest underline underline-offset-4"
        >
          Voir la page
        </Link>
      </div>

        <SavedNotice saved={saved === "1"} imageError={error === "image"} />

      <form action={saveServiceAction} className="mt-6 grid gap-6">
        <input type="hidden" name="slug" value={service.slug} />

        <SectionCard title="Présentation">
          <label className="flex items-center gap-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={service.featured}
              className="h-4 w-4 rounded border-stone-300"
            />
            Mettre ce service en avant (accueil)
          </label>
          <TextField name="title" label="Titre" defaultValue={service.title} />
          <TextField
            name="shortTitle"
            label="Titre court"
            defaultValue={service.shortTitle}
          />
          <TextAreaField
            name="excerpt"
            label="Accroche (résumé)"
            defaultValue={service.excerpt}
          />
        </SectionCard>

        <SectionCard title="Référencement (SEO)">
          <TextField
            name="seoTitle"
            label="Titre SEO"
            defaultValue={service.seoTitle}
          />
          <TextAreaField
            name="seoDescription"
            label="Description SEO"
            defaultValue={service.seoDescription}
          />
        </SectionCard>

        <SectionCard title="Héros">
          <TextField
            name="hero.eyebrow"
            label="Sur-titre"
            defaultValue={service.hero.eyebrow}
          />
          <TextField
            name="hero.title"
            label="Titre"
            defaultValue={service.hero.title}
          />
          <TextAreaField
            name="hero.description"
            label="Description"
            defaultValue={service.hero.description}
          />
          <ImageUploadField
            name="hero.image"
            label="Photo"
            image={service.hero.image}
          />
        </SectionCard>

        <SectionCard title="Le besoin">
          <TextField
            name="needTitle"
            label="Titre"
            defaultValue={service.needTitle}
          />
          <TextAreaField
            name="need"
            label="Paragraphes"
            rows={6}
            defaultValue={service.need.join("\n\n")}
            hint="Séparez chaque paragraphe par une ligne vide."
          />
        </SectionCard>

        <SectionCard title="Prestations">
          <TextField
            name="offeringsTitle"
            label="Titre"
            defaultValue={service.offeringsTitle}
          />
          {service.offerings.map((item, index) => (
            <div
              key={`${index}-${item.title}`}
              className="grid gap-4 rounded-md border border-stone-200 p-4"
            >
              <p className="text-xs font-medium uppercase text-ink-muted">
                Prestation {index + 1}
              </p>
              <TextField
                name={`offerings.${index}.title`}
                label="Titre"
                defaultValue={item.title}
              />
              <TextAreaField
                name={`offerings.${index}.description`}
                label="Description"
                defaultValue={item.description}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Méthode">
          <TextField
            name="methodTitle"
            label="Titre"
            defaultValue={service.methodTitle}
          />
          {service.method.map((item, index) => (
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

        <SectionCard title="Questions fréquentes (FAQ)">
          {service.faqs.map((item, index) => (
            <div
              key={`${index}-${item.question}`}
              className="grid gap-4 rounded-md border border-stone-200 p-4"
            >
              <p className="text-xs font-medium uppercase text-ink-muted">
                Question {index + 1}
              </p>
              <TextField
                name={`faqs.${index}.question`}
                label="Question"
                defaultValue={item.question}
              />
              <TextAreaField
                name={`faqs.${index}.answer`}
                label="Réponse"
                defaultValue={item.answer}
              />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Appel à l’action final">
          <TextField
            name="ctaTitle"
            label="Titre"
            defaultValue={service.ctaTitle}
          />
          <TextAreaField
            name="ctaDescription"
            label="Description"
            defaultValue={service.ctaDescription}
          />
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
