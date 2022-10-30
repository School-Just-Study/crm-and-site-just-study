FROM node:18 AS builder

# Copy
WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile && yarn build && ls -lah

FROM nginx:1.23.2-alpine AS final
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/.keystone /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/crm-just-study.conf /etc/nginx/conf.d/crm-just-study.conf

EXPOSE 8000
CMD ["yarn", "start"]
