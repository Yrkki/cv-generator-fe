FROM nginx:alpine
COPY src/docker/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html/cv-generator-fe
ONBUILD COPY dist/ .

HEALTHCHECK --interval=5m --timeout=90s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 775 /var/cache/nginx /var/run /var/log/nginx

RUN addgroup -S fegroup && adduser -S feuser -G fegroup -h /home/feuser/ -s /bin/bash

RUN touch /run/nginx.pid \
 && chown -R feuser:fegroup /run/nginx.pid /var/cache/nginx

USER feuser
