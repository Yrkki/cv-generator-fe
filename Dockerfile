FROM node:latest

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY dist/ ./
COPY logs/ ./
COPY documentation/ ./

COPY package*.json ./
COPY launch ./

COPY env.sh ./

COPY listener.js ./
COPY server.js ./

USER root

RUN apk update

RUN apk add --update docker openrc
RUN rc-update add docker boot
RUN service docker start

RUN apk add curl
RUN apk add systeminfo
RUN apk add nvm
RUN apk add hg
RUN apk add checkov
RUN apk add pip

RUN apk add bash
SHELL ["/bin/bash", "-c"]

RUN npm install -g npm-run-all
RUN npm install -g figlet
RUN npm install -g nodemon

RUN npm install

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

RUN useradd -ms /bin/bash appuser
USER appuser
WORKDIR /home/appuser

COPY . .

EXPOSE 5000

CMD . ./env.sh && npm start
