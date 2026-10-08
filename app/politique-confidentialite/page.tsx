import type { Metadata } from "next";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export function generateMetadata(): Metadata {
  return legalPageMetadata("politique-confidentialite");
}

export default function PolitiqueConfidentialitePage() {
  return <LegalPage slug="politique-confidentialite" />;
}
