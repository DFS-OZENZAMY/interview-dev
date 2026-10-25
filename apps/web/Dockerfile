# Front InterviewLab : construction avec Vite, puis service statique par Nginx.
FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# URL de l'API vue par le navigateur (par défaut /api, transmis par Nginx)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
# La vérification des types est faite par la CI ; ici on construit seulement.
RUN pnpm exec vite build

FROM nginx:1.27-alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
ENV API_UPSTREAM=api:3000
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
