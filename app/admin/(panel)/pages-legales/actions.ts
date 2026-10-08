"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readOverride, writeOverride } from "@/lib/admin/content-store";
import { getLegalPageContent } from "@/lib/admin/content-read";
import { isLegalSlug } from "@/lib/legal";
import { legalPaths, routes } from "@/lib/routes";
import type { LegalPageContent, LegalSlug } from "@/types/legal";
import { str } from "../_components/form-utils";

type LegalOverrides = Partial<Record<LegalSlug, LegalPageContent>>;

export async function saveLegalPageAction(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");

  if (!isLegalSlug(slug)) {
    redirect(routes.adminLegalPages);
  }

  const current = getLegalPageContent(slug);
  const rawBody = formData.get("body");

  const next: LegalPageContent = {
    title: str(formData, "title") || current.title,
    updatedAt: str(formData, "updatedAt"),
    seoDescription: str(formData, "seoDescription"),
    body: typeof rawBody === "string" ? rawBody.replace(/\r\n/g, "\n").trim() : "",
  };

  const overrides = readOverride<LegalOverrides>("legalPages") ?? {};
  overrides[slug] = next;
  writeOverride<LegalOverrides>("legalPages", overrides);

  revalidatePath(legalPaths[slug]);
  revalidatePath(routes.adminLegalPage(slug));

  redirect(`${routes.adminLegalPage(slug)}?saved=1`);
}
