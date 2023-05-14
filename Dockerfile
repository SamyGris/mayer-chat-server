FROM node as build

COPY . /code
WORKDIR /code

CMD node server.js