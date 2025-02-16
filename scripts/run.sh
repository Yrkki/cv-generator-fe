#!/bin/bash

defaultSeconds=5
if [ -z "${LS_SECONDS}" ]; then LS_SECONDS=$defaultSeconds; fi

defaultPort=80
if [ -z "${LS_PORT}" ]; then LS_PORT=$defaultPort; fi

echo wait $LS_SECONDS seconds
(sleep $LS_SECONDS && explorer "http://localhost":$LS_PORT) &

docker run -p $LS_PORT:5000 jorich/cv-generator-fe

# read  -n 1 -p "x" input
