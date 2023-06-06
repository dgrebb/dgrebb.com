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

printDgBnr "Preparing ${1} Docker Build..."

echo "PROJECT_NAME=\"$(pass dg/www/${1}/dashed-domain)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "WWW_DOMAIN=\"$(pass dg/www/${1}/domain)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "CMS_DOMAIN=\"$(pass dg/cms/${1}/domain)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "API_URL=\"$(pass dg/api/${1}/url)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "PUBLIC_API_URL=\"$(pass dg/api/${1}/url)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null
echo "API_KEY=\"$(pass dg/api/${1}/apikey)\"" | tee -a $dockerEnvFile $frontEnvFile >/dev/null