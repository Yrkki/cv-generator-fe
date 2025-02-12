#!/bin/bash

defaultPort=80
if [ -z "${PORT}" ]; then PORT=$defaultPort; fi
(sleep 3 && explorer "http://localhost":$PORT) &
docker run -p $PORT:5000 jorich/cv-generator-fe
