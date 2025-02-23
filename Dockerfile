FROM ubuntu:noble

RUN apt update \
  && apt install --no-install-recommends -y \
  && apt --no-install-recommends install -y dumb-init \
  && apt --no-install-recommends install -y apt-transport-https \
  && apt --no-install-recommends install -y nodejs \
  && apt --no-install-recommends install -y npm \
  && apt --no-install-recommends install -y curl \
  && apt --no-install-recommends install -y wget \
  && apt clean \
  \
  && npm install --ignore-scripts --omit=dev -g npm-run-all \
  && npm install --ignore-scripts --omit=dev -g figlet \
  && npm install --ignore-scripts --omit=dev -g nodemon \
  \
  && useradd -ms /bin/bash node

USER node
WORKDIR /usr/src/app

COPY --chmod=755 node_modules/ node_modules
COPY --chmod=755 dist/ dist

COPY --chmod=755 launch .
COPY --chmod=755 package.json .
COPY --chmod=755 package-lock.json .

COPY --chmod=755 newrelic.js .
COPY --chmod=755 listener.js .
COPY --chmod=755 override-console-log.js .
COPY --chmod=755 server.js .

COPY --chmod=755 scripts/healthcheck.sh .

COPY --chmod=755 env.sh .

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD healthcheck.sh

EXPOSE 5000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
SHELL ["/bin/bash", "-c"]
CMD . env.sh >/dev/null \
  && echo \
  && pwd \
  && echo \
  && ls -aF --color=always \
  && echo \
  && node server.js
