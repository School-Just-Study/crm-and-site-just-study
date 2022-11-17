FROM node:18 as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install --frozen-lockfile

ENV NODE_ENV production
RUN yarn build

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80
CMD ["yarn", "start"]
