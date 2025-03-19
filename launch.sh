#!/bin/bash

echo $'\033[1;33m'Running launch script
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Launching server environment...$'\033[0m'
echo
# pwd=$(pwd)
pwd
echo
ls -aF --color=always
echo

. ./env.sh

# default
defaultMode=0

# define menu
options=(
  "Rebuilding prod server with integration with config and prometheus|npm start|node server.js & prometheus"
  "Rebuilding prod server with integration with config and monitoring||nodemon server.js &"
  "Rebuilding prod server with integration with config|start:node|node server.js"
  "Rebuilding prod server with integration|start:ng:prod|ng serve --configuration production"
  "Server with config, and prometheus|npm start|node server.js & prometheus"
  "Server with config|start:node|node server.js"
  "Prod server|start:ng:prod|ng serve --configuration production"
  "Dev server|start:ng|ng serve"
)

# display menu
for i in "${!options[@]}"; do
  option=${options[$i]}
  IFS='|'; arrOptionItems=($option); unset IFS;
  echo "$i - "$'\033[1;30m'${arrOptionItems[0]}" ("$'\033[0;34m'${arrOptionItems[1]}$'\033[1;30m'": "$'\033[0;36m'${arrOptionItems[2]}$'\033[1;30m'")"$'\033[0m'
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
option=${options[$mode]}
IFS='|'; arrOptionItems=($option); unset IFS;
echo -n "Using mode $mode - "$'\033[1;30m'${arrOptionItems[0]}" ("$'\033[0;34m'${arrOptionItems[1]}$'\033[1;30m'": "$'\033[0;36m'${arrOptionItems[2]}$'\033[1;30m'")"$'\033[0m'
echo
echo
case "$mode" in

0)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm start
  ;;

1)
  npm run dev:build:build
  npm run dev:test:integrate:package
  nodemon server.js &
  ;;

2)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:node
  ;;

3)
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:ng:prod
  ;;

4)
  npm start
  ;;

5)
  npm run start:node
  ;;

6)
  npm run start:ng:prod
  ;;

7)
  npm run start:ng
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
