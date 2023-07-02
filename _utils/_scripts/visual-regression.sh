#!/bin/bash
source $directory/_scripts/functions.sh

# npm i -g live-server
if ! [ -x "$(command -v npm)" ]; then
    printDgErr 'Error: npm is not installed.' >&2
    exit 1
fi
if ! [ -x "$(command -v live-server)" ]; then
    printDgErr 'Error: live-server is not installed.' >&2
    read -p $'\e[31mWould you like to install live-server now?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    npm i -g live-server
fi

# build the static frontend
dg f b
# serve the frontend
trap "kill 0" EXIT
live-server --no-browser $directory/../front/build &
cd $directory/../_ci/backstop
if [[ $1 == 'ref' ]]; then
    npm run ref
else
    npm run test
    npm run backstop openReport
fi