# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts-alpine AS development

# Set working directory
WORKDIR /app

#
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Same as npm install
RUN npm ci

COPY . /app

ENV CI=true
ENV PORT=5000

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build


FROM development as dev-envs
RUN apk update && apk upgrade
RUN apk add git

RUN addgroup -S docker
RUN adduser -S --shell /bin/bash --ingroup docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]
