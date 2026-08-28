"use client";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

type ErrorFallbackProps = {
  retry: () => void;
};

export function ErrorFallback({ retry }: ErrorFallbackProps) {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Erreur
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-forest">
        Une erreur s’est produite
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">
        Le contenu n’a pas pu s’afficher. Vous pouvez réessayer ou revenir à
        l’accueil.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={retry}
          className={buttonClassName("primary")}
        >
          Réessayer
        </button>
        <a href={routes.home} className={buttonClassName("secondary")}>
          Retour à l’accueil
        </a>
      </div>
    </Container>
  );
}
