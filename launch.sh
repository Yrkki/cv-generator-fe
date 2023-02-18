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

# default
defaultMode=0

# display menu
echo "0 - Running prod server integration"
echo "1 - Running prod server"
echo "2 - Running dev server integration"
echo "3 - Running dev server with configuration production"
echo "4 - Running source-map-explorer and dev server"

# override
echo -n "Enter mode number within 10 seconds [$defaultMode]: "
read -t 10 mode
if [ ! $? -eq 0 ]; then
  echo
  mode=$defaultMode
fi

# report
echo -n "Using mode $mode - "

# process
case $mode in

  0)
    echo "Running prod server integration"
    # ng build --configuration production
    npm run build-prod
    npm run dev:test:integrate:package
    nodemon server.js &
    ;;

  1)
    echo "Running prod server"
    npm run serve-prod
    ;;

  2)
    echo "Running dev server integration"
    npm run start:ng
    ;;

  3)
    echo "Running dev server with configuration production"
    ng serve --configuration production
    ;;

  4)
    echo "Running source-map-explorer and dev server"
    # npm run dev:build:build:analyze:action
    # ng build --stats-json && echo y | npx webpack-bundle-analyzer dist/stats.json
    ng build && echo y | npx source-map-explorer dist/main*.js
    ng start
    ;;

  *)
    echo "Mode unknown. Exiting."
    ;;
esac

echo
echo $'\033[1;32m'Server launched.$'\033[0m'


echo
# read  -n 1 -p "x" input
# return

echo .
pause
