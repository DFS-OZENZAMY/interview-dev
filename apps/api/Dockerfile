# Image unique pour toute plateforme à conteneurs : Docker local, VPS, Cloud Run,
# ECS/Fargate, App Runner, Fly.io, Render, Railway, Koyeb, Azure Container Apps, Cloudflare Containers…
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY prompts ./prompts
COPY scripts ./scripts
COPY src ./src
RUN pnpm build

# L'app est entièrement regroupée dans dist/node.js : pas besoin de node_modules à l'exécution.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app/dist/node.js ./node.js
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1
CMD ["node", "node.js"]
