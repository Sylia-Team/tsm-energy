# SEO_RULES.md

Le SEO est une priorité. Le site doit travailler **avec** Google Business Profile, pas le remplacer.

## Métadonnées

Chaque page doit exposer :

- `title` unique (formule : sujet + TSM + localité quand pertinent)
- `description` unique, naturelle, ≤ 160 caractères
- `alternates.canonical`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:locale` = `fr_FR`)
- `metadataBase` issu de `site.url`

Titre type (accueil) : `Rénovation et entreprise générale du bâtiment dans le Var | TSM Énergies Services`

Pas de keyword stuffing. Pas de title identique entre services.

## Structure HTML

- Un seul `h1` par page.
- `h2` / `h3` dans l’ordre, sans sauter de niveau.
- HTML sémantique : `header`, `nav`, `main`, `footer`, `article`.
- Fil d’Ariane visible sur les pages internes + JSON-LD `BreadcrumbList`.

## JSON-LD (phase 8)

À implémenter via `lib/seo` :

- `Organization` + `LocalBusiness` (coordonnées confirmées uniquement)
- `Service` sur les pages services
- `BreadcrumbList` sur les pages internes
- `FAQPage` seulement si la FAQ est réellement affichée
- `CreativeWork` / projet sur les réalisations si pertinent

Ne pas déclarer de certification, note Google, ou CA dans le schema s’ils ne sont pas validés.

## Sitemap et robots

- `app/sitemap.ts` : pages indexables uniquement.
- `app/robots.ts` : autoriser le crawl, pointer le sitemap.
- Exclure `/demande-de-devis` des priorités marketing si besoin, mais la page reste indexable (intention « devis rénovation Var »).
- Pas d’indexation des pages de remerciement / précoces.

## Contenu et local

Requêtes naturelles à couvrir **dans le vrai contenu**, pas dans une liste de mots-clés :

- rénovation Var / rénovation Sanary
- entreprise générale du bâtiment
- maçonnerie, isolation, climatisation, toiture, extension, rénovation maison

Maillage :

```text
page service → réalisations de ce métier → zone (commune du chantier) → devis
page zone → services + réalisations de la commune → devis
```

**Interdit** : générer toutes les combinaisons service × ville. Pas de pages portes. Pas de contenu dupliqué à 90 %.

Les pages zones listent les communes desservies. Une page commune n’existe que si elle a un vrai contenu différenciant (réalisations, texte spécifique).

## Performance SEO

Core Web Vitals = signal. Objectifs Lighthouse : Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 95.

Images, fonts, JS client minimal : voir `DESIGN_SYSTEM.md`.

## Canonical et domaine

Le domaine de production est à confirmer (`NEXT_PUBLIC_SITE_URL`). Tant qu’il n’est pas figé, `content/site.ts` porte la valeur de travail et un placeholder `[INFORMATION À CONFIRMER]`.
