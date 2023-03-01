#!/bin/bash

minutes="$1"
if [ ! "$minutes" ]; then
  minutes=1
fi

kind="$2"
if [ ! "$kind" ]; then
  kind=9
fi

message=$'\033[?25l\033[1;34m'"%1s"$'\033[1;30m'" %4d:%02d.%03d second(s) to go...\r"$'\033[0m'
for ((i = $minutes - 1; i >= 0; i--)); do
  case "$kind" in
  1)
    for ((seconds = 59; seconds >= 0; seconds--)); do
      sleep 0.25
      printf "$message" "▄" "$i" "$seconds" "750"
      sleep 0.25
      printf "$message" "▄" "$i" "$seconds" "500"
      sleep 0.25
      printf "$message" "▀" "$i" "$seconds" "250"
      sleep 0.25
      printf "$message" "▀" "$i" "$seconds" "000"
    done
    ;;

  2)
    for ((seconds = 59; seconds >= 0; seconds--)); do
      sleep 0.25
      printf "$message" "▄▄" "$i" "$seconds" "750"
      sleep 0.25
      printf "$message" "▄▄" "$i" "$seconds" "500"
      sleep 0.25
      printf "$message" "▀▀" "$i" "$seconds" "250"
      sleep 0.25
      printf "$message" "▀▀" "$i" "$seconds" "000"
    done
    ;;

  10)
    for ((seconds = 59; seconds >= 0; seconds--)); do
      sleep 0.13
      printf "$message" "◡" "$i" "$seconds" "875"
      sleep 0.25
      printf "$message" "◟" "$i" "$seconds" "625"
      sleep 0.12
      printf "$message" "◜" "$i" "$seconds" "500"
      sleep 0.13
      printf "$message" "◠" "$i" "$seconds" "375"
      sleep 0.25
      printf "$message" "◝" "$i" "$seconds" "125"
      sleep 0.12
      printf "$message" "◞" "$i" "$seconds" "000"
    done
    ;;

  *)
    for ((seconds = 59; seconds >= 0; seconds--)); do
      sleep 0.125
      printf "$message" "|" "$i" "$seconds" "875"
      sleep 0.125
      printf "$message" "/" "$i" "$seconds" "750"
      sleep 0.125
      printf "$message" "—" "$i" "$seconds" "625"
      sleep 0.125
      printf "$message" "\\" "$i" "$seconds" "500"
      sleep 0.125
      printf "$message" "|" "$i" "$seconds" "375"
      sleep 0.125
      printf "$message" "/" "$i" "$seconds" "250"
      sleep 0.125
      printf "$message" "—" "$i" "$seconds" "125"
      sleep 0.125
      printf "$message" "\\" "$i" "$seconds" "000"
    done
    ;;
  esac
done
echo "                                                      "$'\033[?25h'$'\033[0m'
