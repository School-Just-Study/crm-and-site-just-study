FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/crm.conf /etc/nginx/conf.d/crm.conf
COPY /nginx/site.conf /etc/nginx/conf.d/site.conf

COPY /nginx/start-nginx.sh /start-nginx.sh

RUN chmod +x /start-nginx.sh

EXPOSE 80
EXPOSE 443
CMD [ "/start-nginx.sh" ]
