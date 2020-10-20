FROM node:latest

COPY . .

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y upgrade \
    && npm install --unsafe-perm=true --allow-root

ENTRYPOINT [ "node", "src/index.js" ]