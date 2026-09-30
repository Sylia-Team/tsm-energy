"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { getSiteContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import type { SiteConfig } from "@/types/site";
import { str } from "../_components/form-utils";

function nullable(value: string): string | null {
  return value.length > 0 ? value : null;
}

export async function saveSiteAction(formData: FormData): Promise<void> {
  const current = getSiteContent();
  const foundedYearRaw = Number(str(formData, "foundedYear"));

  const next: SiteConfig = {
    ...current,
    name: str(formData, "name") || current.name,
    shortName: str(formData, "shortName") || current.shortName,
    legalName: str(formData, "legalName") || current.legalName,
    tagline: str(formData, "tagline"),
    description: str(formData, "description"),
    phone: str(formData, "phone"),
    phoneHref: str(formData, "phoneHref"),
    email: nullable(str(formData, "email")),
    address: {
      ...current.address,
      street: str(formData, "address.street"),
      additional: nullable(str(formData, "address.additional")),
      postalCode: str(formData, "address.postalCode"),
      city: str(formData, "address.city"),
      region: str(formData, "address.region"),
      country: str(formData, "address.country"),
    },
    foundedYear: Number.isFinite(foundedYearRaw) && foundedYearRaw > 0
      ? foundedYearRaw
      : null,
    openingHours: nullable(str(formData, "openingHours")),
    siret: nullable(str(formData, "siret")),
    vatNumber: nullable(str(formData, "vatNumber")),
  };

  writeOverride<SiteConfig>("site", next);

  // Le site (coordonnées, en-tête, pied de page) apparaît sur toutes les pages.
  revalidatePath("/", "layout");
  revalidatePath(routes.adminSite);

  redirect(`${routes.adminSite}?saved=1`);
}
