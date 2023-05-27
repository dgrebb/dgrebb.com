#!/bin/bash
source $directory/_scripts/functions.sh

if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (l), staging (s), or production (p) is required.\n"
    exit 1
fi

nextEnvFile=$directory/../front/.env
envFile=$directory/../_docker/.env
>$nextEnvFile
>$envFile

printDgBnr "Preparing ${1} Docker Build..."

setEnv $1

echo "PROJECT_NAME=$(pass dg/www/${1}/dashed-domain)" | tee -a $envFile $nextEnvFile > /dev/null
echo "API_URL=$(pass dg/api/url)" | tee -a $envFile $nextEnvFile > /dev/null
echo "API_KEY=$(pass dg/api/${1}/apikey)" | tee -a $envFile $nextEnvFile > /dev/null