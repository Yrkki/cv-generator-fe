#!/bin/bash

echo $'\033[1;33m'Running hash generator
echo $'\033[0m'

echo $'\033[1;30m'Generating hashes for [$'\033[0m'"$1"$'\033[1;30m']:
echo

# define hash types
hashTypes=(
  "sha512"
  "sha384"
  "sha256"
)

# process hash types
for i in "${!hashTypes[@]}"; do
  echo -n $'\033[1;30m'${hashTypes[$i]}-$'\033[0m'
  curl -s "$1" |
    openssl dgst -${hashTypes[$i]} -binary |
    openssl base64 -A
  echo
done

echo
echo $'\033[1;32m'Hash generator finished.$'\033[0m'

echo
# read  -n 1 -p "x" input
# return
