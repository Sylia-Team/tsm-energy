# TSM Énergies Services — site vitrine

Site d’acquisition commerciale de TSM Énergies Services, entreprise générale du bâtiment à Sanary-sur-Mer (Var).

## Documentation

- [PROJECT.md](./PROJECT.md) — objectif, cible, parcours, stack
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Next.js, data layer, CMS, formulaires
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — couleurs, typo, composants
- [SEO_RULES.md](./SEO_RULES.md)
- [CONTENT_RULES.md](./CONTENT_RULES.md) — interdiction d’inventer du contenu
- [AGENTS.md](./AGENTS.md) — règles pour l’agent IA

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Stack

Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, Server Components.
