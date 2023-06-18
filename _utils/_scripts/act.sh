#!/bin/bash
source $directory/_scripts/functions.sh

if [ $2 == "f" ]; then
    action="-j front"
elif [ $2 == "b" ]; then
    action="-j back"
elif [ $2 == "p" ]; then
    action="push"
elif [ $2 == "d" ]; then
    action="-j dispatch"
else
    printDgErr "Argument needed to specify job."
fi

act -P ubuntu-latest=catthehacker/ubuntu:act-latest \
    -s GITHUB_TOKEN=$(pass dg/github/pat) \
    -s DEPLOYMENT_BRANCH=develop \
    -s PUBLIC_ENV=staging \
    -s PUBLIC_MEDIA_URL= \
    -s PUBLIC_API_PATH_NAVIGATION=$(pass dg/cms/api/paths/navigation) \
    -s PUBLIC_API_PATH_HOME=$(pass dg/cms/api/paths/home) \
    -s PUBLIC_API_PATH_FOOTER=$(pass dg/cms/api/paths/footer) \
    -s PUBLIC_API_URL=$(pass dg/api/${1}/url) \
    -s API_KEY=$(pass dg/api/${1}/apikey) \
    -s PUBLIC_SENTRY_DSN=$(pass dg/www/logs/sentrydsn) \
    -s AWS_ACCESS_KEY_ID=$(pass dg/aws/id) \
    -s AWS_SECRET_ACCESS_KEY=$(pass dg/aws/secret) \
    -s AWS_REGION=$(pass dg/aws/region) \
    -s AWS_S3_BUCKET=$(pass dg/www/${1}/bucket) \
    -s DISTRIBUTION=$(pass dg/aws/${1}/distribution) \
    --container-architecture linux/amd64 \
    $action
