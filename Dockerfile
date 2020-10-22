FROM node:latest

COPY . /usr/src

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y upgrade \
    && cd /usr/src && ls \
    && npm ci

ENTRYPOINT [ "node", "src/index.js" ]