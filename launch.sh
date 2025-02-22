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
  "Running rebuild prod server with integration and config (nodemon server.js &)"
  "Running rebuild prod server with integration and config (start:node - node server.js)"
  "Running server with config (start:node - node server.js)"
  "Running prod server (start:ng:prod - ng serve --configuration production)"
  "Running dev server (start:ng - ng serve)"
  "Running rebuild prod server with integration (start:ng:prod - ng serve --configuration production)"
  "Running rebuild prod server with integration (start - node server.js & prometheus)"
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
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:node
  ;;

2)
  npm run start:node
  ;;

3)
  npm run start:ng:prod
  ;;

4)
  npm run start:ng
  ;;

5)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:ng:prod
  ;;

6)
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
