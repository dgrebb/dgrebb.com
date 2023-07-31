#!/bin/bash
source $directory/_scripts/functions.sh

# npm i -g live-server
if ! [ -x "$(command -v npm)" ]; then
    printDgErr 'Error: npm is not installed.' >&2
    exit 1
fi
# if ! [ -x "$(command -v live-server)" ]; then
#     printDgErr 'Error: live-server is not installed.' >&2
#     read -p $'\e[31mWould you like to install live-server now?\e[0m: ' -n 1 -r
#     echo # newline
#     if [[ ! $REPLY =~ ^[Yy]$ ]]; then
#         exit 1
#     fi
#     npm i -g live-server
# fi

if [ -z "$2" ]; then
    env=l
else
    env=$2
fi

cd $directory/../_ci/backstop
if [[ $env == 'l' ]]; then
    # build the static frontend
    # dg f b
    # serve the frontend
    trap "kill 0" EXIT
    live-server --no-browser $directory/../front/build &
fi
if [[ $1 == 'ref' ]]; then
    npm run ref
elif [[ $1 == 'remote' ]]; then
    npm run remote
elif [[ $1 == 'test' ]]; then
    npm run test
elif [[ $1 == 'approve' ]]; then
    npm run approve
fi