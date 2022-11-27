# deps
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./

ENV PUPPETEER_SKIP_DOWNLOAD 1
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn install --frozen-lockfile

# build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 80
CMD ["yarn", "start"]
