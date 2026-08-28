# ARCHITECTURE.md

## Principes

- Pages marketing **statiques** (SSG) par défaut.
- ISR uniquement pour les contenus amenés à évoluer (réalisations, actualités, avis).
- Server Actions / Route Handlers **uniquement** pour le devis, le contact et les webhooks futurs.
- Server Components par défaut. Client Components seulement pour l’interactif (menu mobile, formulaire, consentement cookies).
- Les composants UI ne lisent **jamais** des données métier hardcodées. Ils reçoivent des props ou consomment `/content` via des fonctions `get*()`.
- Les URLs métier vivent dans `lib/routes.ts`. Jamais dupliquées en dur dans plusieurs composants.
- Le site n’est pas une SPA : chaque route reste une page Next.js.

## Next.js

```text
app/                         # App Router — routes et layouts
  layout.tsx                 # HTML, fonts, viewport, header, footer
  page.tsx                   # Accueil
  error.tsx                  # Boundary d’erreur de segment
  global-error.tsx           # Erreur du layout racine (html/body propres)
  globals.css                # Tokens design (Tailwind @theme)
  services/                  # /services et /services/[slug]
  realisations/              # /realisations et /realisations/[slug]
  zones-intervention/        # /zones-intervention et /zones-intervention/[slug]
  entreprise/
  avis-clients/
  actualites/                # /actualites et /actualites/[slug]
  demande-de-devis/          # /demande-de-devis et /demande-de-devis/confirmation
  contact/
  mentions-legales/
  politique-confidentialite/
  cookies/
  sitemap.ts                 # pages indexables
  robots.ts                  # crawl + sitemap, noindex confirmation via disallow
```

Pas de dossier `src/` : l’arborescence métier reste à la racine, comme spécifié.

Rendu :

| Contenu | Stratégie |
| --- | --- |
| Accueil, entreprise, légal, listing services / zones | SSG |
| Page service ou commune (contenu éditorial) | SSG, ISR si CMS plus tard |
| Réalisations, actualités | SSG + `generateStaticParams` ; ISR après CMS |
| Devis, contact | Page statique + Server Action |

## Composants

```text
components/
  ui/            # Primitives (bouton, conteneur) — pas de données métier
  layout/        # Header, Footer, Navigation, MobileNavigation, ErrorFallback
  marketing/     # Hero, SectionTitle, CTASection, cartes
  services/      # ServiceCard, ServicePage, MethodSteps, OfferingList
  realisations/  # RealisationCard, RealisationPage, PhotoGallery
  zones/         # ZonePage
  forms/         # QuoteWizard, étapes, ChoiceCards
  contact/       # ContactDetails
  seo/           # JsonLd
  analytics/     # Liens trackés (client, minimal)
```

Avant de créer un composant : vérifier qu’un équivalent n’existe pas déjà.

shadcn/ui n’est **pas** installé à ce stade. Il sera ajouté pièce par pièce (ex. accordion FAQ, champs de formulaire) lorsqu’écrire le composant à la main coûterait plus cher que la dépendance.

## Data layer

```text
content/           # Source de vérité actuelle (fichiers TS)
  site.ts          # Identité, coordonnées, placeholders
  services.ts
  zones.ts
  zones-listing.ts
  realisations.ts
  realisations-listing.ts
  testimonials.ts
  certifications.ts
  home.ts
  entreprise.ts
  contact.ts
  quote.ts
  articles.ts      # à venir
  faq.ts           # à venir

lib/
  content.ts       # Accesseurs getSite(), getServices(), etc.
  routes.ts        # URLs canoniques
  seo/             # metadata, JSON-LD, sitemap
    url.ts
    json-ld.ts
    metadata.ts
    sitemap.ts
  security/        # en-têtes HTTP (CSP statique, framing, referrer)
    headers.ts
  analytics/       # événements, no-op jusqu’au consentement
  validations/     # schémas devis
  leads/           # submitLead() — log aujourd’hui, webhook/CRM plus tard
  utils.ts
```

Les fonctions `get*()` sont le **seul** contrat entre l’UI et les données.

Quand un CMS headless sera branché :

1. Remplacer l’implémentation de `lib/content.ts`.
2. Conserver les types de `types/`.
3. Ne pas modifier les composants UI.

Candidats CMS (non décidé) : Sanity, Contentful, ou un headless maison. Le choix se fera après stabilisation des types.

## Formulaires

Le devis sera un wizard client + validation serveur (Server Action).

Abstraction d’envoi prévue dans `lib/leads/` (à créer en phase 7) :

```ts
submitLead(payload) → { ok, id }
```

Implémentation initiale : log / e-mail transactionnel, **sans base de données**.

Implémentations futures interchangeables : webhook, n8n, Make, CRM, API interne.

Anti-spam : honeypot + timestamp de remplissage (pas de captcha lourd tant que le volume ne le justifie pas).

## Analytics

`lib/analytics` expose `track(event, payload)`.

Implémentation actuelle : no-op.

Branchement futur : GA4 et/ou GTM, **après** consentement cookies lorsque requis.

Événements : voir `types/analytics.ts`.

## Sécurité

- Pas de secrets dans le client. Variables d’environnement via `.env.example`.
- En-tête `X-Powered-By` désactivé.
- En-têtes statiques via `lib/security/headers.ts` (pas de nonce CSP : le nonce forcerait un rendu dynamique).
  - CSP : `default-src 'self'`, images via `/_next/image`, `frame-ancestors 'none'`, `object-src 'none'`.
  - `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Pas de scripts tiers sans nécessité (perf + RGPD).
- Validation serveur obligatoire pour tout POST.
- Anti-spam devis : honeypot (`aria-hidden`) + timestamp.

## Tests

`tests/` contient :

- validation du devis
- constantes de routes
- JSON-LD, sitemap, pages indexables
- en-têtes de sécurité

Runner : **Vitest** (`npm test`).
