#!/bin/bash

minutes=$1

message=$'\033[1;30m'$'\033[1;34m'"%1s"$'\033[1;30m'" %4d:%02d minute(s) to go...\r"$'\033[0m'
for ((i = $minutes - 1; i >= 0; i--)); do
    for ((seconds = 59; seconds >= 0; seconds--)); do
        sleep 0.5
        printf "$message" "▀" "$i" "$seconds"
        sleep 0.5
        printf "$message" "▄" "$i" "$seconds"
    done
done
echo "                                                      "
