FROM nginx:alpine 

ENV NODE_ENV production

COPY /apps/frontend/nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf.template /etc/nginx/templates/default.conf.template


WORKDIR /usr/share/nginx/html

COPY /dist/apps/frontend .



