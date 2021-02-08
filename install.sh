#!/bin/bash

echo $'\033[1;33m'Running environment setup script installer
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Installing environment...$'\033[0m'
echo
pwd=$(pwd)
pwd
ls -aF --color=always
echo

apps=(cv-generator-fe cv-generator-fe-eu)

report() {
  heroku config -a $app
  # heroku run env -a $app
}

for i in "${!apps[@]}"; do
  app=${apps[$i]}
  echo $'\033[1;30m'Processing the $'\033[0;35m'$app$'\033[1;30m' app...$'\033[0m'

  report
  echo

  maintenanceIsOff=$(heroku maintenance -a $app)

  if [ $maintenanceIsOff == "off" ]; then
    heroku maintenance:on -a $app
  fi

  cat ./env.sh | sed "s/export /heroku config:set -a $app /g" >env-remote-$app.sh
  . ./env-remote-$app.sh

  if [ $maintenanceIsOff == "off" ]; then
    heroku maintenance:off -a $app
  fi

  report
  echo
done

echo
echo $'\033[1;32m'Environment installed.$'\033[0m'

echo
# read  -n 1 -p "x" input
# exit
