# DESIGN_SYSTEM.md

Direction artistique : **entreprise générale du bâtiment haut de gamme**, posée, éditoriale, locale, rassurante. On vend le résultat (la maison), pas le chantier.

Ce n’est pas un template SaaS. Pas d’esthétique startup, pas d’animations d’entrée.

Références visuelles : photographie d’architecture en lumière naturelle, Méditerranée, matériaux, titres serif fins, beaucoup d’espace, peu d’éléments par écran.

## Couleurs

Tokens définis dans `app/globals.css` (`@theme`).

| Token | Valeur | Usage |
| --- | --- | --- |
| `--color-ink` | `#2B2723` | Texte principal (brun très sombre) |
| `--color-ink-muted` | `#6E655C` | Texte secondaire, sur-titres |
| `--color-paper` | `#FAF8F4` | Fond de page (blanc cassé chaud) |
| `--color-paper-elevated` | `#FFFFFF` | Surfaces / cartes |
| `--color-mist` | `#ECE5D9` | Bandes alternées (sable), avec parcimonie |
| `--color-line` | `#DCD2C3` | Bordures, filets |
| `--color-navy` | `#0B2A4A` | Couleur forte : titres, boutons, footer |
| `--color-navy-deep` | `#071C33` | Hero (fond sous photo), bloc CTA final |
| `--color-accent` | `#0B2A4A` | Alias de `navy` (CTA, focus admin) |
| `--color-accent-hover` | `#071C33` | Hover CTA |
| `--color-accent-foreground` | `#F6F2EB` | Texte sur accent |
| `--color-focus` | `#0B2A4A` | Outline `:focus-visible` |
| `--color-danger` | `#8A2F2A` | Erreurs |
| `--color-success` | `#2F5D3A` | Confirmations (admin, formulaires) |
| `--color-brass` | `#86663B` | Accent laiton sur fond clair : filets, numéros, villes, hover (AA petit texte sur `paper`) |
| `--color-brass-light` | `#C9AB7F` | Laiton sur fond sombre (`navy`) : filets, titres de colonnes du footer |

### Usage du laiton

Le laiton est l’**unique accent**, en petite touche : filet devant les sur-titres (`Eyebrow`), numéros (« 01 »), villes des réalisations, étoiles d’avis, hover des liens, bordure de l’en-tête admin. Ne jamais l’utiliser en aplat.

Les couleurs vives du logo (vert, bleu) ne sont **pas** utilisées dans l’interface : le logo est affiché en monochrome (`navy` ou `paper`) via un masque CSS (`.logo-mask`).

Contraste texte `ink` sur `paper` et texte clair sur `navy` : WCAG AA.

Ne pas introduire de couleur supplémentaire sans l’ajouter ici.

`cn()` concatène les classes **sans** `tailwind-merge`. Ne pas combiner deux utilitaires de même propriété (`px-5` + `px-8`). Préférer une variante responsive (`max-lg:hidden`).

## Typographie

Deux familles via `next/font/google` (`app/layout.tsx`) :

- **Cormorant Garamond** (variable, normal + italique) : titres, citations, chiffres clés, via l’utilitaire `font-display` (graisse 600, tracking `-0.01em`, interligne `1.08`).
- **Archivo** : texte courant, navigation, boutons, labels.

| Rôle | Famille / poids | Usage |
| --- | --- | --- |
| H1 / H2 / H3 | Cormorant 600 (`font-display`) | Titres |
| Citations | Cormorant 600 italique | Gérant, avis |
| Body | Archivo 400 | Paragraphes, `leading-relaxed` |
| Sur-titres, nav, boutons | Archivo 500, petites capitales, tracking `0.2–0.32em` | `Eyebrow`, `Navigation`, `buttonClassName`, `textLinkClassName` |

Chiffres en serif (téléphone, statistiques) : ajouter `lining-nums` (les chiffres elzéviriens de Cormorant descendent sous la ligne).

Mesure des paragraphes : max `60–65ch`.

## Tailles de titres

Mobile-first.

| Niveau | Mobile | Desktop (`lg`) |
| --- | --- | --- |
| H1 accueil (`Hero size="full"`) | `3rem` | `5.5rem` |
| H1 pages | `3rem` | `4.5rem` |
| H2 | `2.25rem` | `3.5rem` |
| H3 | `1.5rem` | `1.75–1.875rem` |
| Eyebrow | `0.7rem` / uppercase / tracking `0.32em` | identique |

Un seul **H1** par page.

## Spacing

Échelle Tailwind. Beaucoup d’air : c’est un marqueur premium.

| Contexte | Mobile | Desktop |
| --- | --- | --- |
| Section verticale (`Section`) | `py-20` | `py-32` |
| Sections éditoriales de l’accueil, CTA final | `py-28` | `py-40` |
| Grilles à filet (sans cadre) | `gap-12` | `gap-10` à `gap-x-16` |
| Grilles de cartes | `gap-4` | `gap-6` |
| Padding conteneur | `px-4` | `px-6` / `lg:px-8` |

Ne pas créer d’espacements ad hoc (`mt-[13px]`). Utiliser l’échelle.

## Conteneur

`max-w-7xl` (80rem) centré. Sur écrans larges, le contenu ne s’étire pas indéfiniment.

## Border radius

Coins droits partout : `--radius-sm`, `--radius-md` et `--radius-lg` valent `0` (y compris dans l’admin). Seule exception : portraits ronds (`rounded-full`).

## Boutons

`components/ui/button.tsx`. Hauteur mini 48px, petites capitales espacées, transitions 300ms.

- **Primary** : aplat `navy`, texte `paper`.
- **Secondary** : bordure fine `navy`, texte `navy`, aplat au hover. Utilisé dans le header.
- **SecondaryOnDark** : bordure claire sur fond sombre (hero, CTA final, footer).
- **Ghost** : texte seul.
- **`textLinkClassName`** : lien secondaire « Découvrir… → ».

Le téléphone est un **lien texte discret** (hero, CTA final, header ≥ `2xl`), pas un bouton. Icône seule sur mobile.

## Photo plein cadre (`MediaSplit`)

`components/marketing/MediaSplit.tsx` : la photo occupe une moitié de l’écran jusqu’au bord de la fenêtre, le texte l’autre moitié, aligné sur la grille `max-w-7xl`. Alterner `side="left"` / `side="right"` d’une section à l’autre. Sur mobile, photo au-dessus du texte (4/3).

Utilisé sur : accueil (à propos), entreprise (histoire, gérant), services (le besoin), zones (introduction).

## Accueil

Récit en peu de sections (`components/home/`) : hero plein écran → introduction centrée (`HomeIntro`) → réalisations éditoriales (une grande, deux petites) → entreprise (`MediaSplit`) → index des métiers sans cartes (`ServiceIndex`) → citation du gérant sur fond bleu nuit (`ManagerQuote`, pour casser la suite de fonds clairs) → extrait de 3 avis Google, sans note ni lien (`HomeReviews`, absent s’il n’y a pas de vrais avis) → bandeau discret garanties / secteur (`TrustBand`) → CTA final. Pas de chiffres ni de grille de certifications sur l’accueil. Jamais d’avis fictifs sur l’accueil.

## Cards

Deux registres :

- **Cartes cliquables** (services, réalisations, zones) : fond `paper-elevated`, bordure `line`, padding `p-8`, titre serif. Hover : bordure `navy`, zoom photo léger.
- **Blocs à filet** (atouts, garanties, étapes, prestations) : pas de cadre, filet `border-t border-line`, numéro ou icône laiton, titre serif.

Pas d’ombre portée.

## Formulaires

- Labels toujours visibles (pas de placeholder comme seul label).
- Message d’erreur sous le champ, lié via `aria-describedby`.
- Bordure `line`, focus `navy` (`accent`).
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
- Transitions de couleur / bordure : 300ms.
- Zoom très léger des photos au survol (`scale-[1.03]`, 700ms) sur les cartes et galeries.
- Respecter `prefers-reduced-motion` (désactivé globalement dans `globals.css`).

## Accessibilité

- `:focus-visible` obligatoire, jamais `outline-none` sans remplacement.
- Contraste AA.
- Skip link « Aller au contenu ».
- `html lang="fr"`.
