FROM nginx:stable

RUN rm -f /etc/nginx/conf.d/default.conf

COPY /nginx.conf /etc/nginx/nginx.conf
COPY /site.conf /etc/nginx/conf.d/site.conf
COPY /crm.conf /etc/nginx/conf.d/crm.conf

COPY /start-nginx.sh /start-nginx.sh

RUN chmod +x /start-nginx.sh

EXPOSE 80
EXPOSE 443
CMD [ "/start-nginx.sh" ]
