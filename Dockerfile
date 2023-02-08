# build environment
FROM node:19.6-alpine as build
WORKDIR /app
COPY ./app/package.json .
COPY  
RUN npm
RUN npm build

# production environment
FROM nginx:stable-alpine
COPY - from=build /app/build /usr/share/nginx/html/
COPY - from=build /app/nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]