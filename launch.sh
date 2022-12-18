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
mode=0

# override
echo -n "Enter mode number [$mode]: "
read mode

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

  *)
    echo "Mode unknown. Exiting."
    ;;
esac

echo
echo $'\033[1;32m'Server launched.$'\033[0m'


echo
# read  -n 1 -p "x" input
# return
