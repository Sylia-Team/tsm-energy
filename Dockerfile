# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Dépendances (cache tant que package-lock.json ne change pas)
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Build Next.js (sortie standalone)
FROM base AS builder
# Variable publique : intégrée au bundle client au moment du build
ARG NEXT_PUBLIC_SITE_URL=https://www.tsm83.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_OUTPUT=standalone
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Image d'exécution
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Contenu modifiable depuis /admin
COPY --from=builder --chown=nextjs:nodejs /app/data ./data
RUN mkdir -p public/uploads && chown nextjs:nodejs public/uploads

USER nextjs
EXPOSE 3000

# Données écrites par l'admin : à monter en volumes pour les conserver
VOLUME ["/app/data", "/app/public/uploads"]

CMD ["node", "server.js"]
