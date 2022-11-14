FROM node:18 as dependencies
WORKDIR /app
COPY ./crm/package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18 as builder
WORKDIR /app
COPY ./crm .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_ENV production
RUN yarn build

FROM node:18 as runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/schema.graphql ./schema.graphql
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder /app/node_modules ./node_modules

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80
CMD ["yarn", "start"]
