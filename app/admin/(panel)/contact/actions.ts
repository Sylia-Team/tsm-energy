"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { routes } from "@/lib/routes";
import type { ContactContent } from "@/types/contact";
import { str } from "../_components/form-utils";

export async function saveContactAction(formData: FormData): Promise<void> {
  const next: ContactContent = {
    eyebrow: str(formData, "eyebrow"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    quoteHint: str(formData, "quoteHint"),
    quoteLabel: str(formData, "quoteLabel"),
    phoneLabel: str(formData, "phoneLabel"),
    emailLabel: str(formData, "emailLabel"),
    addressLabel: str(formData, "addressLabel"),
    hoursLabel: str(formData, "hoursLabel"),
    mapsLabel: str(formData, "mapsLabel"),
    ctaTitle: str(formData, "ctaTitle"),
    ctaDescription: str(formData, "ctaDescription"),
    primaryLabel: str(formData, "primaryLabel"),
    secondaryLabel: str(formData, "secondaryLabel"),
  };

  writeOverride<ContactContent>("contact", next);

  revalidatePath(routes.contact);
  revalidatePath(routes.adminContact);

  redirect(`${routes.adminContact}?saved=1`);
}
