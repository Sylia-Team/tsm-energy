# PROJECT.md — TSM Énergies Services

## Objectif business

Le site vitrine de **TSM Énergies Services** n’est pas une brochure institutionnelle. C’est un **outil d’acquisition commerciale**.

Il doit transformer un visiteur (Google, Google Business Profile, réseaux sociaux) en **demande de devis** ou en **appel téléphonique**, en s’appuyant sur des preuves locales : services, réalisations, zones d’intervention, avis.

Parcours principal :

**Découverte → page service ou réalisation → preuves → demande de devis**

À terme, le site doit permettre de mesurer :

- origine du prospect
- pages consultées
- clics téléphone
- clics e-mail
- demandes de devis
- conversions

## Entreprise

TSM Énergies Services est une **entreprise générale du bâtiment** située à **Sanary-sur-Mer (Var)**.

Informations publiques reprises du site actuel [tsm83.com](http://www.tsm83.com/) — **à confirmer avant mise en production** :

- Adresse : Parc d’activité de la Baou, 95 rue de l’Innovation, 83110 Sanary-sur-Mer
- Téléphone : 04 94 32 36 15
- Activité : rénovation, construction, extension, isolation, tous corps d’état
- Présence affichée depuis 2004

Tout le reste (e-mail, certifications en cours de validité, assurances, chiffres, avis, photos de chantiers, SIRET) est traité comme **placeholder** jusqu’à validation client. Voir `CONTENT_RULES.md`.

## Cible

Prioritaire :

- propriétaires de maisons individuelles dans le Var (Sanary, Six-Fours, Bandol, Toulon, La Seyne et communes proches)
- projets de rénovation, isolation, toiture, climatisation, extension

Secondaire :

- professionnels et copropriétés
- prescripteurs locaux (architectes, agences)

Intention de recherche typique : *rénovation Sanary*, *entreprise générale du bâtiment Var*, *isolation maison*, *climatisation*, *toiture*, *extension maison*.

## Parcours utilisateur

1. Arrivée via Google, fiche Google Business Profile, ou lien social.
2. Atterrissage sur l’accueil, une **page service** ou une **réalisation**.
3. Lecture courte : besoin, méthode, preuves (chantiers, zones, avis).
4. Action : **Demander un devis** ou **appeler**.
5. Formulaire multi-étapes, puis confirmation.

Le maillage interne relie services ↔ réalisations ↔ zones, sans pages SEO artificielles.

## Fonctionnalités (cible)

| Domaine | Statut actuel | Cible |
| --- | --- | --- |
| Layout, navigation, footer | Phase 2 | Fait |
| Accueil orienté conversion | Phase 3 | Fait (contenu maquette à valider) |
| Pages services | Phase 4 | Fait (contenu maquette à valider) |
| Portfolio réalisations | Phase 5 | Fait (contenu maquette à valider) |
| SEO local / zones | Phase 6 | Fait (contenu maquette à valider) |
| Formulaire devis multi-étapes | Phase 7 | Fait (envoi log, sans base) |
| SEO technique (JSON-LD, sitemap) | Phase 8 | Fait |
| Performance / QA | Phase 9 | Fait |
| CMS headless | Plus tard | Couche `/content` remplaçable |
| Analytics (GA4 / GTM) | Plus tard | Abstraction `/lib/analytics` |
| Envoi leads (CRM, n8n, Make) | Plus tard | Abstraction formulaire |

## Stack

- Next.js 16 (App Router)
- TypeScript strict
- React 19
- Tailwind CSS 4
- Server Components par défaut
- `next/font`, `next/image`
- ESLint + Prettier
- shadcn/ui **uniquement** lorsqu’un composant complexe le justifie (formulaire, accordion FAQ, dialog)

Pas de SPA. Pas de CMS branché tant que l’architecture n’est pas stabilisée. Pas de tracker sans consentement.
