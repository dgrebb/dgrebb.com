#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (l) or production (p) is required.\n"
    exit 1
fi

dockerEnv=$directory/../_docker/.env
>$dockerEnv

if [ $1 == "l" ]; then
    ENV="development"
    echo "PUBLIC_MEDIA_URL=\"$(pass dg/cms/l/mediaurl)\"" >> $dockerEnv
elif [ $1 == "s" ]; then
    ENV="staging"
    echo "PUBLIC_MEDIA_URL=\"\"" >> $dockerEnv
else
    ENV="production"
    echo "PUBLIC_MEDIA_URL=\"\"" >> $dockerEnv
fi

printDgBnr "Setting ${ENV} Docker environment variables..."

echo "PROJECT_NAME=\"$(pass dg/www/${1}/dashed-domain)\"" >> $dockerEnv
echo "WWW_DOMAIN=\"$(pass dg/www/${1}/domain)\"" >> $dockerEnv
echo "CMS_DOMAIN=\"$(pass dg/cms/${1}/domain)\"" >> $dockerEnv
echo "PUBLIC_ENV=${ENV}" >> $dockerEnv