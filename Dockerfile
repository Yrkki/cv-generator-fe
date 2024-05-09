FROM node:latest

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./
COPY launch ./
RUN npm install --legacy-peer-deps

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

RUN useradd -ms /bin/bash appuser
USER appuser
WORKDIR /home/appuser

COPY . .

EXPOSE 5000

CMD . ./env.sh && npm start
