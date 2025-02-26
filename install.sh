#!/bin/bash

echo $'\033[1;33m'Running environment setup script installer
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Installing environment...$'\033[0m'
echo
# pwd=$(pwd)
pwd
echo
ls -aF --color=always
echo

apps=(cv-generator-fe cv-generator-fe-eu)
services=(cv-generator-project-server cv-generator-project-server-eu)

report() {
  heroku config -a "$app"
  # heroku run env -a "$app"
}

for i in "${!apps[@]}"; do
  app=${apps[$i]}
  service=${services[$i]}
  echo $'\033[1;30m'Connecting the $'\033[1;35m'"$app"$'\033[1;30m' app to the $'\033[0;35m'"$service"$'\033[1;30m' service...$'\033[0m'

  report
  echo

  maintenanceIsOff=$(heroku maintenance -a "$app")
  echo Maintenance is: "$maintenanceIsOff"
  echo

  if [ "$maintenanceIsOff" == "off" ]; then
    heroku maintenance:on -a "$app"
    echo Maintenance is: $(heroku maintenance -a "$app")
  fi

  sed "s/""${services[0]}""/""$service""/g" <./env.sh >env-tmp-"$app".sh
  sed "s/export /heroku config:set -a ""$app"" /g" <./env-tmp-"$app".sh >env-remote-"$app".sh
  . ./env-remote-"$app".sh

  if [ "$maintenanceIsOff" == "off" ]; then
    heroku maintenance:off -a "$app"
    echo Maintenance is: $(heroku maintenance -a "$app")
  fi

  report
  echo
done

echo
echo $'\033[1;32m'Environment installed.$'\033[0m'

echo
# read  -n 1 -p "x" input
# return
