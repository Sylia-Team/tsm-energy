"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import {
  getRealisationsListingContent,
  getServicesListingContent,
  getZonesListingContent,
} from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import { num, paragraphs, str } from "../_components/form-utils";
import type { MediaImage } from "@/types/media";

type BaseListing = {
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: MediaImage;
};

function readBase(
  formData: FormData,
  prefix: string,
  currentImage: MediaImage,
): BaseListing {
  return {
    eyebrow: str(formData, `${prefix}.eyebrow`),
    title: str(formData, `${prefix}.title`),
    description: str(formData, `${prefix}.description`),
    seoTitle: str(formData, `${prefix}.seoTitle`),
    seoDescription: str(formData, `${prefix}.seoDescription`),
    image: {
      src: str(formData, `${prefix}.image.src`),
      alt: str(formData, `${prefix}.image.alt`),
      width: num(formData, `${prefix}.image.width`, currentImage.width),
      height: num(formData, `${prefix}.image.height`, currentImage.height),
    },
  };
}

export async function saveListingsAction(formData: FormData): Promise<void> {
  const currentServices = getServicesListingContent();
  const currentZones = getZonesListingContent();
  const currentRealisations = getRealisationsListingContent();

  writeOverride("servicesListing", {
    ...currentServices,
    ...readBase(formData, "services", currentServices.image),
  });

  writeOverride("zonesListing", {
    ...currentZones,
    ...readBase(formData, "zones", currentZones.image),
    introTitle: str(formData, "zones.introTitle"),
    intro: paragraphs(formData, "zones.intro"),
    surroundingTitle: str(formData, "zones.surroundingTitle"),
    surrounding: str(formData, "zones.surrounding"),
  });

  writeOverride("realisationsListing", {
    ...currentRealisations,
    ...readBase(formData, "realisations", currentRealisations.image),
  });

  revalidatePath(routes.services);
  revalidatePath(routes.zones);
  revalidatePath(routes.realisations);
  revalidatePath(routes.adminListings);

  redirect(`${routes.adminListings}?saved=1`);
}
