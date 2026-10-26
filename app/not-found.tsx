import type { Metadata } from "next";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <Eyebrow centered>Erreur 404</Eyebrow>
      <h1 className="mt-6 font-display text-4xl text-navy lg:text-[3.5rem]">
        Page introuvable
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">
        Cette page n’existe pas encore ou l’adresse a changé.
      </p>
      <Link href={routes.home} className={buttonClassName("primary", "mt-8")}>
        Retour à l’accueil
      </Link>
    </Container>
  );
}
