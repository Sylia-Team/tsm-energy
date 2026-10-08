import type { Metadata } from "next";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export function generateMetadata(): Metadata {
  return legalPageMetadata("mentions-legales");
}

export default function MentionsLegalesPage() {
  return <LegalPage slug="mentions-legales" />;
}
