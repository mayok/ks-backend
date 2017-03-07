FROM node:7.7
ENV NPM_CONFIG_LOGLEVEL warn

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json yarn.lock $HOME/web/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/web

RUN npm install

USER root
COPY . $HOME/web
RUN chown -R app:app $HOME/*
USER app

RUN npm run build
CMD ["npm", "run", "start"]
