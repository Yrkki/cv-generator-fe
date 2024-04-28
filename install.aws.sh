#!/bin/bash

echo $'\033[1;33m'Running environment setup script installer
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Installing environment...$'\033[0m'
echo
export pwd=$(pwd)
pwd
ls -aF --color=always
echo

apps=(cv-generator-fe)
services=(cv-generator-project-server)

export MSYS2_ARG_CONV_EXCL=*

report() {
  # aws ssm get-parameters-by-path --path "/$app"
  :
}

for i in "${!apps[@]}"; do
  app=${apps[$i]}
  service=${services[$i]}
  echo $'\033[1;30m'Connecting the $'\033[1;35m'"$app"$'\033[1;30m' app to the $'\033[0;35m'"$service"$'\033[1;30m' service...$'\033[0m'

  report
  echo

  sed "s/""${services[0]}""/""$service""/g" <./env.sh >env-tmp-"$app".aws.sh
  sed "s/export \(.*\)=\(.*\)/aws ssm put-parameter --name \"\/$app\/\1\" --value \"\2\" --type String --overwrite /g" <./env-tmp-"$app".aws.sh >env-remote-"$app".aws.sh
  . ./env-remote-"$app".aws.sh

  report
  echo
done

export MSYS2_ARG_CONV_EXCL=

echo
echo $'\033[1;32m'Environment installed.$'\033[0m'

echo
# read  -n 1 -p "x" input
# exit
