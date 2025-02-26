#!/bin/bash

echo $'\033[1;33m'Running start script
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Starting up server...$'\033[0m'
echo
pwd
echo
ls -aF --color=always
echo

. env.sh >/dev/null

npm start

echo
echo $'\033[1;32m'Server started up.$'\033[0m'

echo
# read  -n 1 -p "x" input
