"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { entreprise } from "@/content/entreprise";
import { writeOverride } from "@/lib/admin/content-store";
import { getEntrepriseContent } from "@/lib/admin/content-read";
import { MediaUploadError, resolveMediaImage } from "@/lib/admin/media-store";
import { routes } from "@/lib/routes";
import type { EntrepriseContent } from "@/types/entreprise";
import { paragraphs, str } from "../_components/form-utils";

export async function saveEntrepriseAction(formData: FormData): Promise<void> {
  const current = getEntrepriseContent();

  let image = current.image;
  let storyImage = current.storyImage;
  let managerImage = current.manager.image;
  try {
    image = await resolveMediaImage(formData, "image", current.image, entreprise.image);
    storyImage = await resolveMediaImage(
      formData,
      "storyImage",
      current.storyImage,
      entreprise.storyImage,
    );
    managerImage = await resolveMediaImage(
      formData,
      "manager.image",
      current.manager.image,
      entreprise.manager.image,
    );
  } catch (error) {
    if (error instanceof MediaUploadError) {
      redirect(`${routes.adminEntreprise}?error=image`);
    }
    throw error;
  }

  const next: EntrepriseContent = {
    eyebrow: str(formData, "eyebrow"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    image,
    storyTitle: str(formData, "storyTitle"),
    story: paragraphs(formData, "story"),
    storyImage,
    manager: {
      eyebrow: str(formData, "manager.eyebrow"),
      name: str(formData, "manager.name"),
      role: str(formData, "manager.role"),
      quote: str(formData, "manager.quote"),
      paragraphs: paragraphs(formData, "manager.paragraphs"),
      image: managerImage,
    },
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
  revalidatePath(routes.home);
  revalidatePath(routes.adminEntreprise);

  redirect(`${routes.adminEntreprise}?saved=1`);
}
