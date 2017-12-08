FROM nginx:alpine
COPY ./build/ /var/www/goparentgui/html
COPY ./k8s/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080 80