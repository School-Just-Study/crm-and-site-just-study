# deps
FROM node:18 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .

ENV PUPPETEER_SKIP_DOWNLOAD 1
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn install --frozen-lockfile

ENV NODE_ENV production

RUN yarn build

EXPOSE 80
CMD ["yarn", "start"]
