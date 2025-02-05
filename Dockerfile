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

RUN npm install -g npm-run-all
RUN npm install -g figlet
RUN npm install -g nodemon

# RUN npm install

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

RUN useradd -ms /bin/bash appuser
USER appuser
WORKDIR /home/appuser

COPY . .

EXPOSE 5000

CMD . ./env.sh && npm start
