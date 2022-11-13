FROM nginx:alpine

COPY ./nginx/nginx.yc.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/start-nginx.sh /start-nginx.sh

RUN chmod +x /start-nginx.sh

EXPOSE 80
EXPOSE 443
CMD [ "/start-nginx.sh" ]
