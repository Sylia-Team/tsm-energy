import Link from "next/link";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { saveSiteAction } from "./actions";
import {
  SaveBar,
  SavedNotice,
  SectionCard,
  TextAreaField,
  TextField,
} from "../_components/fields";

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const site = getSiteContent();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-navy">
          Configuration du site
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          <Link href={routes.admin} className="underline underline-offset-4">
            ← Retour
          </Link>
        </p>
      </div>

      <SavedNotice saved={saved === "1"} />

      <form action={saveSiteAction} className="mt-6 grid gap-6">
        <SectionCard title="Identité">
          <TextField name="name" label="Nom" defaultValue={site.name} />
          <TextField
            name="shortName"
            label="Nom court"
            defaultValue={site.shortName}
          />
          <TextField
            name="legalName"
            label="Raison sociale"
            defaultValue={site.legalName}
          />
          <TextField name="tagline" label="Slogan" defaultValue={site.tagline} />
          <TextAreaField
            name="description"
            label="Description"
            defaultValue={site.description}
          />
        </SectionCard>

        <SectionCard title="Contact">
          <TextField name="phone" label="Téléphone (affiché)" defaultValue={site.phone} />
          <TextField
            name="phoneHref"
            label="Téléphone (lien tel:)"
            defaultValue={site.phoneHref}
          />
          <TextField
            name="email"
            label="E-mail"
            defaultValue={site.email ?? ""}
          />
          <TextField
            name="openingHours"
            label="Horaires"
            defaultValue={site.openingHours ?? ""}
          />
        </SectionCard>

        <SectionCard title="Adresse">
          <TextField
            name="address.additional"
            label="Complément (ex. parc d’activité)"
            defaultValue={site.address.additional ?? ""}
          />
          <TextField
            name="address.street"
            label="Rue"
            defaultValue={site.address.street}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="address.postalCode"
              label="Code postal"
              defaultValue={site.address.postalCode}
            />
            <TextField
              name="address.city"
              label="Ville"
              defaultValue={site.address.city}
            />
            <TextField
              name="address.region"
              label="Région / département"
              defaultValue={site.address.region}
            />
            <TextField
              name="address.country"
              label="Pays"
              defaultValue={site.address.country}
            />
          </div>
        </SectionCard>

        <SectionCard title="Informations légales">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              name="foundedYear"
              label="Année de création"
              type="number"
              defaultValue={site.foundedYear ?? ""}
            />
            <TextField name="siret" label="SIRET" defaultValue={site.siret ?? ""} />
            <TextField
              name="vatNumber"
              label="N° TVA"
              defaultValue={site.vatNumber ?? ""}
            />
          </div>
          <p className="text-xs text-ink-muted">
            L’URL du site n’est pas modifiable ici (paramètre technique).
          </p>
        </SectionCard>

        <SaveBar />
      </form>
    </div>
  );
}
