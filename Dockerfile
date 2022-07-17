FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --verbose --only=production
RUN npm install typescript

COPY . /usr/src/app

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080
CMD npm run start
