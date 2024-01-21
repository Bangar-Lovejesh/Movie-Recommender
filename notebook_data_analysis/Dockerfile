FROM jupyter/minimal-notebook
WORKDIR /jupyter

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
COPY . /jupyter


ARG DATABASE_URL
ARG CERT

RUN curl --create-dirs -o $HOME/.postgresql/root.crt ${CERT}
