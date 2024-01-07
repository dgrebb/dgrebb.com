#!/bin/bash
source $directory/_scripts/functions.sh

backstopURL='http://localhost:3000/bd/html_report?remote'

if [ "$2" == "s" ]; then
    ENV=staging
elif [ "$2" == "p" ]; then
    ENV=production
else
    ENV=local
fi

echo "${ENV} is the environment"

cd $directory/../_ci/backstop
if [[ $1 == 'ref' ]]; then
    echo "Generating reference bitmaps for ${ENV}"
    if [[ $ENV == 'local' ]]; then
        # build the static frontend with STG
        dg f b s
        dg f s
    fi
    ENV=$ENV pnpm run ref
elif [[ $1 == 'remote' ]]; then
    ENV=$ENV pnpm run remote
elif [[ $1 == 'test' ]]; then
    if [[ $ENV == 'local' ]]; then
        # build the static frontend with STG
        dg f b s
    fi
    # serve the frontend and run backstop remote with pm2
    cdbackstop
    echo ''
    echo "Starting test for ${ENV}"
    echo ''
    pm2 kill
    ENV=$ENV sudo pnpm run boot
    echo ''
    read -p 'Pausing for backstop remote startup...' -t 5
    echo ''
    echo 'Running tests...'
    backstopRunTests &
    pnpm run mon
    # open $backstopURL
    pnpm stop
elif [[ $1 == 'test-now' ]]; then
    # serve the frontend and run backstop remote with pm2
    cdbackstop
    ENV=$ENV pnpm run boot
    echo ''
    read -p 'Pausing for backstop remote startup...' -t 5
    echo ''
    echo 'Running tests...'
    backstopRunTests &
    pnpm run mon
    # open $backstopURL
    pnpm stop
elif [[ $1 == 'approve' ]]; then
    ENV=$ENV pnpm run approve
else
    echo "Do you know what you're doing? Double check."
fi
