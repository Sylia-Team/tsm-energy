# DESIGN_SYSTEM.md

Direction artistique : **entreprise générale du bâtiment**, sérieuse, premium, technique, locale, rassurante.

Ce n’est pas un template SaaS. Pas de gros dégradés, pas d’esthétique startup, pas d’animations décoratives.

Références visuelles : photographie de chantier, mer, Var, outillage, typographie forte, beaucoup d’espace.

## Couleurs

Tokens définis dans `app/globals.css` (`@theme`).

| Token | Valeur | Usage |
| --- | --- | --- |
| `--color-ink` | `#1F2A33` | Texte principal |
| `--color-ink-muted` | `#5A6772` | Texte secondaire |
| `--color-paper` | `#F4F7F9` | Fond de page (gris-bleu clair) |
| `--color-paper-elevated` | `#FFFFFF` | Surfaces / cartes |
| `--color-mist` | `#E3EAEF` | Bandes alternées, fonds secondaires |
| `--color-line` | `#CFD8DF` | Bordures |
| `--color-navy` | `#0B2A4A` | Header top bar, footer, blocs sombres (marine du logo) |
| `--color-navy-deep` | `#071C33` | Footer inférieur |
| `--color-accent` | `#0A5A9E` | CTA (bleu du logo) |
| `--color-accent-hover` | `#084A82` | Hover CTA |
| `--color-accent-foreground` | `#FFFFFF` | Texte sur accent |
| `--color-focus` | `#0A5A9E` | Outline `:focus-visible` |
| `--color-danger` | `#8A2F2A` | Messages d’erreur de formulaire |
| `--color-success` | `#0E6E6A` | Messages de confirmation (admin, formulaires) |
| `--color-brand-green` | `#8CC63F` | Vert du logo : filets, puces, accents sur fond sombre uniquement (contraste 2,05 sur blanc : jamais pour du texte sur fond clair) |
| `--color-brand-teal` | `#0E6E6A` | Vert foncé : liens, badges, icônes sur fond clair |

### Usage du vert

Le vert du logo (`brand-green`) est une **petite touche**, jamais une couleur de texte sur fond clair :

- trait court devant les sur-titres (`SectionTitle`, `PageHeader`) ;
- filet sous le H1 du hero ;
- soulignement des numéros d’étape (`MethodSteps`), puces des prestations (`OfferingList`) ;
- bordure haute du footer et de l’en-tête admin, contour du portrait du gérant.

Contraste texte `ink` sur `paper` et texte clair sur `navy` / `accent` : viser WCAG AA.

Ne pas introduire de couleur supplémentaire sans l’ajouter ici.

`cn()` concatène les classes **sans** `tailwind-merge`. Ne pas combiner deux utilitaires `display` non préfixés (`hidden` + `inline-flex`). Préférer une variante responsive (`max-lg:hidden`).

## Typographie

Une seule famille pour limiter le CLS et le poids : **Archivo** via `next/font/google`, chargée avec son axe de largeur (`axes: ["wdth"]`).

Les titres H1 / H2 (et chiffres clés) utilisent l’utilitaire `font-display` (`app/globals.css`) : graisse 800, police élargie (`font-stretch: 112%`), tracking `-0.035em`, interligne `1.05`. C’est la signature typographique du site : ne pas l’appliquer au texte courant.

| Rôle | Poids | Tracking | Usage |
| --- | --- | --- | --- |
| Display / H1 | 800, élargie 112 % (`font-display`) | `-0.035em` | Titres de page |
| H2 | 800, élargie 112 % (`font-display`) | `-0.035em` | Titres de section |
| H3 | 600 | `-0.01em` | Sous-sections |
| Body | 400 | `0` | Paragraphes |
| UI / nav | 500 | `0.02em` | Navigation, boutons, labels |

Corps : `1rem` / `1.65` line-height.
Mesure des paragraphes : max `65ch`.

## Tailles de titres

Mobile-first.

| Niveau | Mobile | Desktop (`lg`) |
| --- | --- | --- |
| H1 | `2.25rem` (36px) | `4rem` (64px) |
| H2 | `1.875rem` (30px) | `2.75rem` (44px) |
| H3 | `1.25rem` (20px) | `1.5rem` (24px) |
| Eyebrow | `0.75rem` / uppercase / tracking large | identique |

Un seul **H1** par page.

## Spacing

Échelle Tailwind. Sections marketing :

| Contexte | Mobile | Desktop |
| --- | --- | --- |
| Section verticale | `py-16` (64px) | `py-24` (96px) |
| Gap interne section | `gap-8` | `gap-12` |
| Gap grille cartes | `gap-4` | `gap-6` |
| Padding conteneur | `px-4` | `px-6` / `lg:px-8` |

Ne pas créer d’espacements ad hoc (`mt-[13px]`). Utiliser l’échelle.

## Conteneur

`max-w-7xl` (80rem) centré. Sur écrans larges, le contenu ne s’étire pas indéfiniment.

## Border radius

Esthétique technique, coins discrets :

| Token | Valeur | Usage |
| --- | --- | --- |
| `--radius-sm` | `2px` | Chips, inputs |
| `--radius-md` | `4px` | Boutons, cartes |
| `--radius-lg` | `8px` | Médias / grandes photos |

Pas de `rounded-full` sur les CTA principaux (sauf pastilles téléphone mobile).

## Boutons

Hauteur mini 44px (touch target).

- **Primary** : fond `accent`, texte `accent-foreground`, hover `accent-hover`.
- **Secondary** : fond transparent, bordure `navy`, texte `navy`. Sur fond sombre : bordure claire.
- **Ghost** : texte seul, soulignement au hover.

Un CTA principal visible au-dessus de la ligne de flottaison sur chaque page métier.

## Photo plein cadre (`MediaSplit`)

`components/marketing/MediaSplit.tsx` : la photo occupe une moitié de l’écran jusqu’au bord de la fenêtre, le texte l’autre moitié, aligné sur la grille `max-w-7xl`. Alterner `side="left"` / `side="right"` d’une section à l’autre. Sur mobile, photo au-dessus du texte (4/3).

Utilisé sur : accueil (à propos), entreprise (histoire, gérant), services (le besoin), zones (introduction).

## Cards

Fond `paper-elevated`, bordure `line`, pas d’ombre portée lourde.

Structure type : média 4/3 → eyebrow → titre → extrait → lien.

Hover : bordure qui passe à `navy`, pas de translation agressive.

## Formulaires

- Labels toujours visibles (pas de placeholder comme seul label).
- Message d’erreur sous le champ, lié via `aria-describedby`.
- Bordure `line`, focus `accent`.
- Erreurs en `danger`, liées via `aria-describedby`.
- Champs pleine largeur sur mobile.

Wizard devis (6 étapes) : type de projet → localisation → projet → photos → coordonnées → résumé + consentement RGPD. Anti-spam : honeypot + délai minimum de remplissage.

## Breakpoints

Breakpoints Tailwind par défaut :

| Token | Largeur | Intention |
| --- | --- | --- |
| `sm` | 640px | Grand téléphone |
| `md` | 768px | Tablette |
| `lg` | 1024px | Nav desktop |
| `xl` | 1280px | Grille confortable |
| `2xl` | 1536px | Marges, pas plus de contenu |

Règles responsive :

- Mobile-first.
- Navigation hamburger **sous `lg`**.
- Grilles : 1 col → 2 (`md`) → 3 (`lg`) pour les cartes.
- Photos plein cadre sur mobile ; ne pas recadrer le sujet principal (toiture, façade).
- Le numéro de téléphone reste accessible dès le header mobile.

## Images

- Toujours `next/image`.
- `alt` descriptif (métier + lieu), jamais vide sur une photo de chantier.
- Formats : WebP (`images.formats` dans `next.config.ts`). Ne pas compter sur l’optimisation AVIF (désactivée côté Next.js 16.3.x pour raisons de sécurité).
- Réserver les dimensions pour éviter le CLS.
- Lazy-load sous la ligne de flottaison. LCP : image hero prioritaire (`priority`).

## Motion

- Pas d’animation d’entrée au scroll.
- Transitions de couleur / bordure ≤ 150ms.
- Respecter `prefers-reduced-motion`.

## Accessibilité

- `:focus-visible` obligatoire, jamais `outline-none` sans remplacement.
- Contraste AA.
- Skip link « Aller au contenu ».
- `html lang="fr"`.
