#!/bin/bash

echo $'\033[1;33m'Running launch script
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Launching server environment...$'\033[0m'
echo
# pwd=$(pwd)
pwd
ls -aF --color=always
echo

. ./env.sh
nodemon server.js &

echo
echo $'\033[1;32m'Server launched.$'\033[0m'


echo
# read  -n 1 -p "x" input
# return