#!/bin/bash
source $directory/_scripts/functions.sh

if [[ $1 != p ]]; then EVENT_JSON="dev"; else EVENT_JSON="main"; fi

if [ $2 == "f" ]; then
    action="-j front"
elif [ $2 == "b" ]; then
    action="-j back"
elif [ $2 == "p" ]; then
    action="push"
elif [ $2 == "d" ]; then
    action="workflow_dispatch"
else
    printDgErr "Argument needed to specify job."
fi

act --pull=false \
    -P ubuntu-latest=github-actions-test:latest \
    -e $directory/../_ci/dispatches/${EVENT_JSON}.workflow_dispatch.json \
    -s GITHUB_TOKEN=$(pass dg/github/pat) \
    -s PUBLIC_ENV=development \
    -s PUBLIC_MEDIA_URL="" \
    -s PUBLIC_API_PATH_NAVIGATION="$(pass dg/cms/api/paths/navigation)" \
    -s PUBLIC_API_PATH_HOME="$(pass dg/cms/api/paths/home)" \
    -s PUBLIC_API_PATH_FOOTER="$(pass dg/cms/api/paths/footer)" \
    -s PUBLIC_API_URL=$(pass dg/api/${1}/url) \
    -s API_KEY=$(pass dg/api/${1}/apikey) \
    -s PUBLIC_SENTRY_DSN=$(pass dg/www/logs/sentrydsn) \
    -s AWS_ACCESS_KEY_ID=$(pass dg/aws/id) \
    -s AWS_SECRET_ACCESS_KEY=$(pass dg/aws/secret) \
    -s AWS_REGION=$(pass dg/aws/region) \
    -s AWS_S3_BUCKET=$(pass dg/www/${1}/bucket) \
    -s DISTRIBUTION=$(pass dg/aws/${1}/distribution) \
    -s AWS_ECR_ROLE=$(pass dg/aws/ecr_role) \
    -s AWS_ECR_REPOSITORY=$(pass dg/cms/${1}/domain) \
    --container-architecture linux/amd64 \
    $action
