#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (l) or production (p) is required.\n"
    exit 1
fi
backEnv=$directory/../back/.env

>$backEnv

if [ $1 == "ld" ] || [ $1 == "l" ] || [ $1 == "ls" ]; then
    ENV="development"
elif [ $1 == "s" ]; then
    ENV="staging"
else
    ENV="production"
fi

echo "NODE_ENV=${ENV}" >>$backEnv
echo "PORT=1337" >>$backEnv
echo "APP_KEYS=$(pass dg/cms/appkeys)" >>$backEnv
echo "API_TOKEN_SALT=$(pass dg/cms/apitokensalt)" >>$backEnv
echo "ADMIN_JWT_SECRET=$(pass dg/cms/adminjwtsecret)" >>$backEnv
echo "JWT_SECRET=$(pass dg/cms/jwtsecret)" >>$backEnv
echo "TRANSFER_TOKEN_SALT=$(pass dg/cms/transfertokensalt)" >>$backEnv
echo "AWS_ACCESS_KEY_ID=$(pass dg/aws/id)" >>$backEnv
echo "AWS_ACCESS_SECRET=$(pass dg/aws/secret)" >>$backEnv
echo "AWS_REGION=$(pass dg/aws/region)" >>$backEnv
echo "AWS_S3_BUCKET=$(pass dg/cms/s/bucket)" >>$backEnv
echo "CDN_BASE_URL=$(pass dg/cms/stg-cdnbaseurl)" >>$backEnv
echo "DATABASE_PASSWORD=$(pass dg/cms/db/password)" >>$backEnv
echo "PUBLIC_ENV=${ENV}" >>$backEnv
echo "PUBLIC_SENTRY_DSN=$(pass dg/www/logs/sentrydsn)" >>$backEnv
echo "DISPATCH_TOKEN=$(pass dg/github/dispatch_token)" >>$backEnv

while test "$1" != --; do
    case $1 in
    ld | local-dev)
        echo "HOST=local.cms.dgrebb.com" >>$backEnv
        echo "DATABASE_HOST=localhost" >>$backEnv
        break
        ;;
    ls | local-dev-stage)
        echo "HOST=local.cms.dgrebb.com" >>$backEnv
        echo "DATABASE_HOST=$(pass dg/cms/db/s/host)" >>$backEnv
        break
        ;;
    l | local-docker)
        echo "HOST=0.0.0.0" >>$backEnv
        echo "DATABASE_HOST=host.docker.internal" >>$backEnv
        break
        ;;
    s | stg)
        echo "HOST=0.0.0.0" >>$backEnv
        echo "DATABASE_HOST=$(pass dg/cms/db/s/host)" >>$backEnv
        break
        ;;
    p | prd | prod)
        echo "HOST=0.0.0.0" >>$backEnv
        echo "AWS_S3_BUCKET=$(pass dg/cms/p/bucket)" >>$backEnv
        echo "CDN_BASE_URL=$(pass dg/cms/cdnbaseurl)" >>$backEnv
        echo "DATABASE_HOST=$(pass dg/cms/db/host)" >>$backEnv
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [-l] [-ld] [-p]" >&2
        break
        ;;
    esac
done
