ARG VARIENT="14"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIENT}

RUN apt-get update \
    && apt-get install ffmpeg \
    && apt-get install mongodb-server