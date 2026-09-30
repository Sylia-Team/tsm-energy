"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeOverride } from "@/lib/admin/content-store";
import { getCertificationsContent } from "@/lib/admin/content-read";
import { routes } from "@/lib/routes";
import type { Certification } from "@/types/content";
import { num, str } from "../_components/form-utils";

function revalidateAll(): void {
  // Les certifications apparaissent sur l'accueil, l'entreprise et les services.
  revalidatePath("/", "layout");
  revalidatePath(routes.adminCertifications);
}

export async function saveCertificationsAction(
  formData: FormData,
): Promise<void> {
  const count = num(formData, "count", 0);
  const list: Certification[] = [];

  for (let index = 0; index < count; index += 1) {
    const name = str(formData, `items.${index}.name`);
    const description = str(formData, `items.${index}.description`);
    if (!name && !description) {
      continue;
    }
    list.push({
      id: str(formData, `items.${index}.id`) || `certification-${index}`,
      name,
      description,
    });
  }

  writeOverride<Certification[]>("certifications", list);
  revalidateAll();

  redirect(`${routes.adminCertifications}?saved=1`);
}

export async function addCertificationAction(): Promise<void> {
  const list = getCertificationsContent();
  const next: Certification = {
    id: `certification-${Date.now()}`,
    name: "",
    description: "",
  };

  writeOverride<Certification[]>("certifications", [...list, next]);
  redirect(routes.adminCertifications);
}

export async function deleteCertificationAction(
  formData: FormData,
): Promise<void> {
  const id = str(formData, "id");
  const list = getCertificationsContent().filter((item) => item.id !== id);

  writeOverride<Certification[]>("certifications", list);
  revalidateAll();

  redirect(routes.adminCertifications);
}
