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
  avis-clients/              # avis Google (repli : témoignages) + en-tête éditable
  demande-de-devis/          # /demande-de-devis et /demande-de-devis/confirmation
  contact/
  mentions-legales/          # pages légales : components/legal/LegalPage, noindex/follow, hors sitemap
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
  marketing/     # Hero, PageHeader, SectionTitle, MediaSplit, ManagerQuote, CTASection, cartes
  legal/         # LegalPage (rendu texte simple, sans HTML)
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
  avis-page.ts     # en-tête de /avis-clients
  legal.ts         # mentions légales, confidentialité, cookies
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
  leads/           # submitLead() — adaptateurs log | webhook
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

Adaptateur sélectionné par `LEAD_ADAPTER` (défaut `log`), **sans base de données** :

- `log` : journal serveur (`console.info`).
- `webhook` : POST JSON `{ id, submittedAt, lead }` vers `LEAD_WEBHOOK_URL` (n8n, Make, Zapier, CRM…), en-tête `Authorization: Bearer` optionnel via `LEAD_WEBHOOK_SECRET`, timeout 8 s.

Implémentations futures interchangeables : e-mail transactionnel, API interne.

Anti-spam : honeypot + timestamp de remplissage (pas de captcha lourd tant que le volume ne le justifie pas).

Suggestion de communes : le champ « Commune » propose les communes correspondant au code postal. Le navigateur interroge la route interne `GET /api/communes?cp=<5 chiffres>` (même origine, conforme à `connect-src 'self'`) ; celle-ci proxifie l'API publique **geo.api.gouv.fr** côté serveur (sans clé, cache 7 j). Dégradation gracieuse : en cas d'échec, la saisie manuelle reste possible.

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

## Administration du contenu (`/admin`)

Espace d'édition du contenu éditorial sans toucher au code.

- **Modèle** : les fichiers `content/*.ts` restent la **valeur par défaut**. Les modifications saisies dans l'admin sont stockées comme **overrides partiels** dans `data/content-overrides.json` et **fusionnés** (`deepMerge`) à la lecture par `lib/content.ts`. Les types de `types/` restent le contrat unique ; l'UI publique est inchangée.
- **Lecture** : `lib/admin/content-store.ts` lit/écrit le fichier d'overrides (fs synchrone). Les `get*()` restent synchrones — pas de bascule async des pages.
- **Publication** : chaque enregistrement écrit le JSON puis appelle `revalidatePath()` pour régénérer les pages concernées (ISR à la demande).
- **Images** : l’admin n’accepte plus d’URL. Un fichier JPEG, PNG ou WebP (8 Mo max.) est écrit dans `public/uploads/` (`lib/admin/media-store.ts`), avec remplacement ou suppression. Seuls les fichiers créés par l’admin sont effacés du disque. Supprimer une photo rétablit l’image par défaut du contenu lorsqu’elle existe. Même contrainte disque que les overrides JSON.
- **Authentification** : mot de passe unique (`ADMIN_PASSWORD`) → cookie de session signé HMAC (`ADMIN_SESSION_SECRET`), vérifié par `proxy.ts` (ex-`middleware`, Next 16) sur `/admin/*` (sauf `/admin/login`). Voir `lib/admin/auth.ts`.
- **Contrainte hébergement** : nécessite un système de fichiers **accessible en écriture** (`next start` / VPS). Pour un hébergement serverless en lecture seule (Vercel), remplacer l'implémentation de `content-store.ts` par une base de données (Postgres) ou un CMS headless — le reste (types, UI, `get*()`) est inchangé.
- **Portée actuelle** : accueil (`/admin/accueil`), entreprise (`/admin/entreprise`, dont « Le mot du gérant » repris sur l’accueil), contact (`/admin/contact`), avis clients (`/admin/avis` : configuration Google + en-tête de la page `/avis-clients`), pages légales (`/admin/pages-legales/[slug]`), services (`/admin/services`), zones (`/admin/zones`), réalisations (`/admin/realisations`), configuration du site (`/admin/site`), listings (`/admin/listings`) et certifications (`/admin/certifications`). Le contenu du devis (`quote.ts`) reste non éditable pour l'instant.
- **Pages légales** : liste fixe (`LEGAL_SLUGS`, `types/legal.ts`), overrides par slug (clé `legalPages`). Le texte est saisi en format simple (`## ` = sous-titre, ligne vide = paragraphe) et rendu sans HTML (`lib/legal.ts`).
- **Retour visuel** : après enregistrement, `SavedNotice` (client) affiche un message flottant puis retire `?saved=1` de l’URL ; `SaveBar` passe en « Enregistrement… » via `useFormStatus`. Les aperçus d’images externes passent par `/_next/image` (même origine, compatible CSP).
- **Services / Zones** : listes **fixes** (unions `SERVICE_SLUGS` / `ZONE_SLUGS`, liées aux types) — pas d'ajout/suppression via l'admin. Overrides stockés **par slug** (`Record<Slug, …>`) et fusionnés par `getServicesContent()` / `getZonesContent()`.
- **Réalisations** : slugs **libres** → l'admin permet **créer / modifier / supprimer**. L'override stocke la **collection entière** (`Realisation[]`), qui remplace les défauts dès la première modification (seed depuis `content/realisations.ts`). Les nouveaux slugs sont rendus en ISR (`dynamicParams`).
- **Config site** : `getSiteContent()` (serveur) fusionne défauts + override. Les composants **serveur** (layout, Header, Footer, Logo, pages, metadata, JSON-LD) l'utilisent ; le composant **client** `MobileNavigation` reçoit `phone`/`phoneHref` en **props** depuis `Header` (pas d'accès `fs` côté client). `url` reste non éditable (utilitaires SEO bas niveau). `content/site.ts` et `getSite()` (client-safe) restent les valeurs par défaut.

## Avis Google

Affichage des avis Google **sans widget tiers** (respect CSP `default-src 'self'` + RGPD, aucun script/cookie tiers).

- **Source** : API Google Places v1 (`lib/reviews/google.ts`), fetch **serveur → serveur** avec clé `GOOGLE_PLACES_API_KEY` (jamais exposée au client).
- **Cache** : ISR `revalidate` 24 h (limite le quota API). L'accueil reste statique quand les avis sont désactivés ; il passe en ISR lorsqu'ils sont activés.
- **Rendu** : composant serveur `components/marketing/GoogleReviews.tsx` → cartes texte (`ReviewCard`), note globale + nombre d'avis. **Pas d'avatars externes** (image externe interdite par la CSP).
- **Configuration** : `content/reviews.ts` (défauts) + overrides admin (`/admin/avis`) : activation, Place ID, note minimale, nombre affiché.
- **Repli** : si désactivé, non configuré, erreur API ou aucun avis, affichage automatique des avis manuels (`content/testimonials.ts`).
- **Chrome** : les pages `/admin` restent imbriquées dans le layout racine (Header/Footer du site) pour ne pas forcer le rendu dynamique global. Séparation propre via route groups possible ultérieurement.

## Tests

`tests/` contient :

- validation du devis
- constantes de routes
- JSON-LD, sitemap, pages indexables
- en-têtes de sécurité
- découpage du texte des pages légales

Runner : **Vitest** (`npm test`).
