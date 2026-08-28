<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — TSM Énergies Services

Tu travailles sur le site vitrine d’acquisition de TSM Énergies Services.

## Avant toute modification importante

1. Lire `PROJECT.md`
2. Lire `ARCHITECTURE.md`
3. Lire `DESIGN_SYSTEM.md`
4. Lire `SEO_RULES.md`
5. Lire `CONTENT_RULES.md`
6. Examiner les composants existants dans `components/`

## Avant de créer un composant

- Vérifier qu’un composant similaire n’existe pas déjà.
- Préférer étendre un composant `ui/` plutôt que d’en dupliquer un.

## Toujours préférer

- code simple
- composants petits
- typage strict (`strict`, pas de `any` sans justification écrite)
- Server Components
- réutilisation
- URLs via `lib/routes.ts`
- données via `lib/content.ts` / `content/`

## Ne jamais

- inventer du contenu commercial (voir `CONTENT_RULES.md`)
- hardcoder une URL métier dans plusieurs composants
- ajouter une dépendance sans justification dans l’architecture
- dupliquer un composant
- transformer le site en SPA
- brancher un tracker sans couche de consentement
- modifier l’architecture sans mettre à jour `ARCHITECTURE.md`
- regrouper tout le site dans un seul changement énorme

## Phases

Ne pas générer le site entier d’un coup. Suivre :

1. Audit + docs + types
2. Fondations (layout, tokens, header, footer)
3. Homepage
4. Template services puis pages
5. Réalisations
6. SEO local / zones
7. Formulaire devis
8. SEO technique
9. Performance et QA

## Qualité

Après une étape importante :

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Corriger les erreurs avant de continuer.

## Commits recommandés

- `feat: initialize project`
- `feat: add design system`
- `feat: create homepage`
- `feat: create services architecture`
- `feat: add project portfolio`
- `feat: add quote form`
- `feat: implement SEO metadata`

Ne committer que si l’utilisateur le demande.
