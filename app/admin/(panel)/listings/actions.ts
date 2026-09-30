"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { realisationsListing } from "@/content/realisations-listing";
import { servicesListing } from "@/content/services-listing";
import { zonesListing } from "@/content/zones-listing";
import { writeOverride } from "@/lib/admin/content-store";
import {
  getRealisationsListingContent,
  getServicesListingContent,
  getZonesListingContent,
} from "@/lib/admin/content-read";
import { MediaUploadError, resolveMediaImage } from "@/lib/admin/media-store";
import { routes } from "@/lib/routes";
import { paragraphs, str } from "../_components/form-utils";
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
  image: MediaImage,
): BaseListing {
  return {
    eyebrow: str(formData, `${prefix}.eyebrow`),
    title: str(formData, `${prefix}.title`),
    description: str(formData, `${prefix}.description`),
    seoTitle: str(formData, `${prefix}.seoTitle`),
    seoDescription: str(formData, `${prefix}.seoDescription`),
    image,
  };
}

export async function saveListingsAction(formData: FormData): Promise<void> {
  const currentServices = getServicesListingContent();
  const currentZones = getZonesListingContent();
  const currentRealisations = getRealisationsListingContent();

  let servicesImage = currentServices.image;
  let zonesImage = currentZones.image;
  let realisationsImage = currentRealisations.image;
  try {
    servicesImage = await resolveMediaImage(
      formData,
      "services.image",
      currentServices.image,
      servicesListing.image,
    );
    zonesImage = await resolveMediaImage(
      formData,
      "zones.image",
      currentZones.image,
      zonesListing.image,
    );
    realisationsImage = await resolveMediaImage(
      formData,
      "realisations.image",
      currentRealisations.image,
      realisationsListing.image,
    );
  } catch (error) {
    if (error instanceof MediaUploadError) {
      redirect(`${routes.adminListings}?error=image`);
    }
    throw error;
  }

  writeOverride("servicesListing", {
    ...currentServices,
    ...readBase(formData, "services", servicesImage),
  });

  writeOverride("zonesListing", {
    ...currentZones,
    ...readBase(formData, "zones", zonesImage),
    introTitle: str(formData, "zones.introTitle"),
    intro: paragraphs(formData, "zones.intro"),
    surroundingTitle: str(formData, "zones.surroundingTitle"),
    surrounding: str(formData, "zones.surrounding"),
  });

  writeOverride("realisationsListing", {
    ...currentRealisations,
    ...readBase(formData, "realisations", realisationsImage),
  });

  revalidatePath(routes.services);
  revalidatePath(routes.zones);
  revalidatePath(routes.realisations);
  revalidatePath(routes.adminListings);

  redirect(`${routes.adminListings}?saved=1`);
}
