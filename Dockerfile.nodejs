FROM ubuntu:16.04

RUN \
  apt-get update && \
  apt-get install -y curl &&
  curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  apt-get install -y \
    build-essential \
    nodejs \

WORKDIR /app

RUN npm install -g yarn
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn
