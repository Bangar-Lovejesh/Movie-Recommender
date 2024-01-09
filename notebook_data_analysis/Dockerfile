FROM jupyter/minimal-notebook
WORKDIR /jupyter

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
COPY . /jupyter
