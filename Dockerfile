FROM node:18 as dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18 as builder
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN yarn build

FROM node:18 as runner
WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.keystone ./.keystone
COPY --from=builder /usr/src/app/node_modules ./node_modules

ENV PORT 3000

EXPOSE 3000
CMD ["yarn", "start"]
