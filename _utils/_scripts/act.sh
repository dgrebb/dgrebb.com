#!/bin/bash
source $directory/_scripts/functions.sh

act \
-s GITHUB_TOKEN=$(pass dg/github/pat) \
-s DEPLOYMENT_BRANCH=develop \
-s PUBLIC_ENV=staging \
-s PUBLIC_API_URL=$(pass dg/api/${1}/url) \
-s API_KEY=$(pass dg/api/${1}/apikey) \
-s PUBLIC_SENTRY_DSN=$(pass dg/www/logs/sentrydsn) \
-s AWS_ACCESS_KEY_ID=$(pass dg/aws/id) \
-s AWS_SECRET_ACCESS_KEY=$(pass dg/aws/secret) \
-s AWS_REGION=$(pass dg/aws/region) \
-s AWS_S3_BUCKET=$(pass dg/www/${1}/bucket) \
-s DISTRIBUTION=$(pass dg/aws/${1}/distribution) \
--container-architecture linux/amd64 \
repository_dispatch