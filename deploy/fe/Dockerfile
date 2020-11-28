FROM node:12 as builder
# Choose a workdir
WORKDIR /usr/src/app
# Copy sources
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
COPY angular.json .
COPY tools .
COPY decorate-angular-cli.js .
COPY nx.json .
COPY tsconfig.base.json .

RUN npm ci

COPY libs /usr/src/app/libs
COPY apps/fe /usr/src/app/apps/fe

# Build app
RUN npm run build:fe

FROM nginx:alpine

RUN mkdir -p /usr/fe/www
WORKDIR /usr/fe

# Copy custom configuration file from the current directory
COPY ./deploy/fe/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/apps/fe/ /usr/fe/www/

EXPOSE 80
