#!/bin/bash
source $DGPATH/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (l) or production (p) is required.\n"
    exit 1
fi

dockerEnv=$DGPATH/../_docker/.env
>$dockerEnv

printDgBnr "Setting ${ENV} Docker environment variables..."

echo "PROJECT_NAME=\"$(pass dg/www/${1}/dashed-domain)\"" >>$dockerEnv
echo "WWW_DOMAIN=\"$(pass dg/www/${1}/domain)\"" >>$dockerEnv
echo "CMS_DOMAIN=\"$(pass dg/cms/${1}/domain)\"" >>$dockerEnv
echo "PUBLIC_ENV=${ENV}" >>$dockerEnv
