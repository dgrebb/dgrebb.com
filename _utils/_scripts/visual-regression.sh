#!/bin/bash
source $directory/_scripts/functions.sh

backstopURL='http://localhost:3000/bd/html_report?remote'

if [ -z "$2" ]; then
    env=l
else
    env=$2
fi

cd $directory/../_ci/backstop
if [[ $1 == 'ref' ]]; then
    npm run ref
elif [[ $1 == 'remote' ]]; then
    npm run remote.${env}
elif [[ $1 == 'test' ]]; then
    if [[ $env == 'l' ]]; then
        # build the static frontend with STG
        dg f b s
    fi
    # serve the frontend and run backstop remote with pm2
    cdbackstop
    echo ''
    echo 'Starting test for ${2}'
    echo ''
    npm run boot.${env}
    echo ''
    read -p 'Pausing for backstop remote startup...' -t 5
    echo ''
    echo 'Running tests...'
    backstopRunTests &
    npm run mon
    # open $backstopURL
    npm stop
elif [[ $1 == 'test-now' ]]; then
    # serve the frontend and run backstop remote with pm2
    cdbackstop
    npm run boot.${env}
    echo ''
    read -p 'Pausing for backstop remote startup...' -t 5
    echo ''
    echo 'Running tests...'
    backstopRunTests &
    npm run mon
    # open $backstopURL
    npm stop
elif [[ $1 == 'approve' ]]; then
    npm run approve
else
    echo "Do you know what you're doing? Double check."
fi
