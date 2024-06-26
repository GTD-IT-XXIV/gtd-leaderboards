FROM node:20.15.0-bullseye AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS deps
WORKDIR /app

ENV HUSKY=0

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store corepack enable pnpm \
  && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app

COPY --from=builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /app/dist ./dist
COPY package.json ./

USER nonroot

EXPOSE 8080

ENV NODE_ENV production
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

CMD ["dist/app.js"]
