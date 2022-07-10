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

# # Option 1: Run dev server
# ng serve --configuration production

# Option 2: Run prod server
# # ng build --configuration production
npm run build-prod
npm run dev:test:integrate:package:action
nodemon server.js &

echo
echo $'\033[1;32m'Server launched.$'\033[0m'


echo
# read  -n 1 -p "x" input
# return
