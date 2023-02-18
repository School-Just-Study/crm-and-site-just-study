FROM node:18-alpine3.16 as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/app/.yarn \
     yarn install --frozen-lockfile

FROM node:18-alpine3.16 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_ENV production
RUN yarn build

FROM node:18-alpine3.16 as runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/schema.graphql ./schema.graphql
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder /app/node_modules ./node_modules

ENV PORT 80
EXPOSE 80
ENV NODE_OPTIONS '--max-old-space-size=1024'

CMD ["yarn", "start"]
