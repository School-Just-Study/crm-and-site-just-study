FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "npm", "start" ]
