FROM python:alpine

WORKDIR /app

RUN mkdir /downloads

COPY requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt


COPY entrypoint.sh /tmp/
