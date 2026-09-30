"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { getEntrepriseContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import type { EntrepriseContent } from "@/types/entreprise";
import { num, paragraphs, str } from "../_components/form-utils";

export async function saveEntrepriseAction(formData: FormData): Promise<void> {
  const current = getEntrepriseContent();

  const next: EntrepriseContent = {
    eyebrow: str(formData, "eyebrow"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    image: {
      src: str(formData, "image.src"),
      alt: str(formData, "image.alt"),
      width: num(formData, "image.width", current.image.width),
      height: num(formData, "image.height", current.image.height),
    },
    storyTitle: str(formData, "storyTitle"),
    story: paragraphs(formData, "story"),
    methodTitle: str(formData, "methodTitle"),
    methodDescription: str(formData, "methodDescription"),
    method: current.method.map((item, index) => ({
      title: str(formData, `method.${index}.title`),
      description: str(formData, `method.${index}.description`),
    })),
    certificationsEyebrow: str(formData, "certificationsEyebrow"),
    certificationsTitle: str(formData, "certificationsTitle"),
    certificationsDescription: str(formData, "certificationsDescription"),
    zonesEyebrow: str(formData, "zonesEyebrow"),
    zonesTitle: str(formData, "zonesTitle"),
    zonesDescription: str(formData, "zonesDescription"),
    ctaTitle: str(formData, "ctaTitle"),
    ctaDescription: str(formData, "ctaDescription"),
  };

  writeOverride<EntrepriseContent>("entreprise", next);

  revalidatePath(routes.entreprise);
  revalidatePath(routes.adminEntreprise);

  redirect(`${routes.adminEntreprise}?saved=1`);
}
