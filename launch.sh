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

# define menu
options=(
  "Running prod server integration"
  "Running prod server"
  "Running dev server"
  "Running rebuild prod server"
  "Running full integration rebuild and start prod server"
)

# display menu
for i in "${!options[@]}"; do
  echo "$i - "$'\033[1;30m'${options[$i]}$'\033[0m'
done

# override
echo -n "Enter mode number within 10 seconds [$defaultMode]: "
read -t 10 mode
if [ ! "$?" -eq 0 ] || [ ! "$mode" ]; then
  echo
  mode="$defaultMode"
fi
echo

# report
echo -n "Using mode "$'\033[1;30m'${options[$mode]}$'\033[0m'
echo
echo
case "$mode" in

0)
  npm run dev:build:build
  npm run dev:test:integrate:package
  nodemon server.js &
  ;;

1)
  npm run start:ng:prod
  ;;

2)
  npm run start:ng
  ;;

3)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:ng:prod
  ;;

4)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm start
  ;;

*)
  echo "Mode unknown. Exiting."
  ;;
esac

echo
echo $'\033[1;32m'Server launched.$'\033[0m'

echo
# read  -n 1 -p "x" input
# # return
# X
# echo $input

. ./scripts/tick.sh 1
