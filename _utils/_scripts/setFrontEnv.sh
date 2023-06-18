#!/bin/bash
source $directory/_scripts/functions.sh

if [ $# -eq 0 ]; then
    printDgErr "Argument for local (l), staging (s), or production (p) is required."
    exit 1
fi

frontEnvFile=$directory/../front/.env
dockerEnvFile=$directory/../_docker/.env
>$frontEnvFile
>$dockerEnvFile

if [ $1 == "l" ]; then
    ENV="development"
elif [ $1 == "s" ]; then
    ENV="staging"
else
    ENV="production"
fi

printDgBnr "Setting ${ENV} environment variables..."

echo "PROJECT_NAME=\"$(pass dg/www/${1}/dashed-domain)\"" | tee -a $dockerEnvFile >/dev/null
echo "WWW_DOMAIN=\"$(pass dg/www/${1}/domain)\"" | tee -a $dockerEnvFile >/dev/null
echo "CMS_DOMAIN=\"$(pass dg/cms/${1}/domain)\"" | tee -a $dockerEnvFile >/dev/null

echo "PUBLIC_ENV=${ENV}" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "API_KEY=\"$(pass dg/api/${1}/apikey)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "PUBLIC_API_PATH_NAVIGATION=$(pass dg/cms/api/paths/navigation)" >>$frontEnvFile
echo "PUBLIC_API_PATH_HOME=$(pass dg/cms/api/paths/home)" >>$frontEnvFile
echo "PUBLIC_API_PATH_FOOTER=$(pass dg/cms/api/paths/footer)" >>$frontEnvFile
echo "PUBLIC_API_URL=\"$(pass dg/api/${1}/url)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "PUBLIC_SENTRY_DSN=\"$(pass dg/www/logs/sentrydsn)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
