FROM ubuntu:noble
RUN apt update && apt install -y --no-install-recommends
RUN apt install -y dumb-init
RUN apt install -y apt-transport-https --no-install-recommends
RUN apt install -y nodejs --no-install-recommends
RUN apt install -y npm --no-install-recommends
RUN apt install -y curl --no-install-recommends
RUN apt install -y wget --no-install-recommends

RUN npm install -g npm-run-all
RUN npm install -g figlet
RUN npm install -g nodemon

RUN useradd -ms /bin/bash node
USER node

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

WORKDIR /usr/src/app
COPY --chown=node:node . .

EXPOSE 5000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
SHELL ["/bin/bash", "-c"]
CMD . ./env.sh && node server.js
