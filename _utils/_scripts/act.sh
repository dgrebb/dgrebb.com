#!/bin/bash
source $directory/_scripts/functions.sh

act \
-s GITHUB_TOKEN=$(pass dg/github/pat) \
-s PUBLIC_ENV=staging \
-s PUBLIC_API_URL=$(pass dg/api/${1}/url) \
-s API_KEY=$(pass dg/api/${1}/apikey) \
-s PUBLIC_SENTRY_DSN=$(pass dg/www/logs/sentrydsn) \
--container-architecture linux/amd64 \
repository_dispatch