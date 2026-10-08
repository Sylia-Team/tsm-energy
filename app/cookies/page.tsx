import type { Metadata } from "next";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export function generateMetadata(): Metadata {
  return legalPageMetadata("cookies");
}

export default function CookiesPage() {
  return <LegalPage slug="cookies" />;
}
