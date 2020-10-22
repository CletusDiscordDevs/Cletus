# https://code.visualstudio.com/docs/remote/containers-advanced#_reducing-dockerfile-build-warnings
FROM node:latest

COPY . .

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y upgrade \
    && npm ci --unsafe-perm=true --allow-root || npm install --unsafe-perm=true --allow-root