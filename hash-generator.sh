#!/bin/bash

echo $'\033[1;33m'Running hash generator
echo $'\033[0m'

echo $'\033[1;30m'Generating hashes for [$'\033[0m'"$1"$'\033[1;30m']:
echo

echo -n $'\033[1;30m'sha384-$'\033[0m'
curl -s "$1" |
  openssl dgst -sha384 -binary |
  openssl base64 -A
echo

echo -n $'\033[1;30m'sha256-$'\033[0m'
curl -s "$1" |
  openssl dgst -sha256 -binary |
  openssl base64 -A
echo $'\033[0m'

echo
echo $'\033[1;32m'Hash generator finished.$'\033[0m'

echo
# read  -n 1 -p "x" input
# return
