# syntax=docker/dockerfile:1.4
FROM python:3.10-alpine AS builder

WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . .

ENV FLASK_DEBUG 1
ENV FLASK_APP src/app.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0
EXPOSE 8000
ARG CERT

CMD ["flask", "run"]

FROM builder AS dev-envs

RUN apk update && apk upgrade

RUN apk add git curl

RUN apk add postgresql-dev gcc python3-dev musl-dev py3-psycopg2

RUN pip install psycopg2

RUN addgroup -S docker
RUN adduser -S --shell /bin/bash --ingroup docker vscode
RUN export $(cat .env | xargs) && curl --create-dirs -o $HOME/.postgresql/root.crt $CERT

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

#CMD ["flask", "run"]
