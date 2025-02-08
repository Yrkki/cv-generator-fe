FROM ubuntu:noble
RUN apt update && apt install --no-install-recommends -y
RUN apt  --no-install-recommends install -y dumb-init
RUN apt  --no-install-recommends install -y apt-transport-https
RUN apt  --no-install-recommends install -y nodejs
RUN apt  --no-install-recommends install -y npm
RUN apt  --no-install-recommends install -y curl
RUN apt  --no-install-recommends install -y wget

RUN npm install --ignore-scripts -g npm-run-all
RUN npm install --ignore-scripts -g figlet
RUN npm install --ignore-scripts -g nodemon

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

WORKDIR /usr/src/app

COPY --chmod=755 ./node_modules/ .
COPY --chmod=755 ./dist/ .

COPY --chmod=755 ./launch .
COPY --chmod=755 ./package.json .
COPY --chmod=755 ./package-lock.json .

COPY --chmod=755 ./newrelic.js .
COPY --chmod=755 ./listener.js .
COPY --chmod=755 ./override-console-log.js .
COPY --chmod=755 ./server.js .

COPY --chmod=755 ./env.sh .

RUN useradd -ms /bin/bash node
USER node

EXPOSE 5000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
SHELL ["/bin/bash", "-c"]
CMD . ./env.sh && node server.js
