# Buildtime Layer
FROM node:lts-alpine as Build

WORKDIR /usr/src/
COPY package*.json ./

# Install Native NodeJS Dependencies from source
RUN apk add --no-cache --virtual .gyp python3 make g++

# Install Canvas Dependency from source
# https://github.com/Automattic/node-canvas/issues/866#issuecomment-292816286
RUN apk add --no-cache --virtual .npm-deps cairo-dev libjpeg-turbo-dev pango-dev

RUN npm ci
# RUN npm ci | npm install

RUN apk del .gyp python3 make g++ .npm-deps cairo-dev libjpeg-turbo-dev pango-dev

# Runtime Layer
FROM node:lts-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/node_modules /usr/src/node_modules
COPY . .

ENTRYPOINT [ "node", "src/index.js" ]