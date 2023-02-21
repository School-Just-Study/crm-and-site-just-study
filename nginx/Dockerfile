FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY /nginx.conf /etc/nginx
COPY /site.conf /etc/nginx/conf.d
COPY /crm.conf /etc/nginx/conf.d
COPY /gzip.conf /etc/nginx/conf.d
COPY /gzip.conf /etc/nginx/conf.d
COPY /ssl.conf /etc/nginx

COPY /start-nginx.sh /start-nginx.sh

RUN chmod +x /start-nginx.sh

EXPOSE 80
EXPOSE 443
CMD [ "/start-nginx.sh" ]
