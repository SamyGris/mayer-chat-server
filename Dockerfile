FROM node:19 as build

COPY . /code
WORKDIR /code

CMD node server.js