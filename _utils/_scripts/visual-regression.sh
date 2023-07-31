#!/bin/bash
source $directory/_scripts/functions.sh

if [ -z "$2" ]; then
    env=l
else
    env=$2
fi

cd $directory/../_ci/backstop
if [[ $env == 'l' ]]; then
    # build the static frontend with STG
    dg f b s
    # serve the frontend and run backstop remote with pm2
    cdbackstop
    npm start
fi
if [[ $1 == 'ref' ]]; then
    npm run ref
elif [[ $1 == 'remote' ]]; then
    npm run remote
elif [[ $1 == 'test' ]]; then
    echo ''
    read -p 'Pausing for backstop remote startup...' -t 5 
    echo ''
    echo 'Running tests...'
    curl -X POST http://localhost:3000/test -H "Content-Type: multipart/form-data" &
    npm run monitor
    npm stop
elif [[ $1 == 'approve' ]]; then
    npm run approve
fi
