#!/bin/bash

echo $'\033[1;33m'Running update remotes script
echo ------------------------------------------------------$'\033[1;33m'
echo

echo $'\033[0;33m'Updating remotes...$'\033[0m'
echo
# pwd=$(pwd)
pwd
echo
ls -aF --color=always
echo

git remote rm bitbucket
git remote rm gitlab
git remote rm heroku
git remote rm origin
git remote add bitbucket https://Yrkki@bitbucket.org/Yrkki/cv-generator-fe.git
git remote add gitlab https://gitlab.com/Yrkki/cv-generator-fe.git
git remote add heroku https://git.heroku.com/cv-generator-fe.git
git remote add origin https://github.com/Yrkki/cv-generator-fe.git
git remote set-url --add origin https://Yrkki@bitbucket.org/Yrkki/cv-generator-fe.git
git remote set-url --add origin https://gitlab.com/Yrkki/cv-generator-fe.git
git remote -v

echo
echo $'\033[1;32m'Remotes updated.$'\033[0m'

echo
# read  -n 1 -p "x" input
# return
