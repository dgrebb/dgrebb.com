#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (l) or production (p) is required.\n"
    exit 1
fi
strapiEnv=$directory/../back/.env
frontEnv=$directory/../front/.env
>$strapiEnv
>$frontEnv
echo "PORT=1337" >>$strapiEnv
echo "APP_KEYS=$(pass dg/cms/appkeys)" >>$strapiEnv
echo "API_TOKEN_SALT=$(pass dg/cms/apitokensalt)" >>$strapiEnv
echo "ADMIN_JWT_SECRET=$(pass dg/cms/adminjwtsecret)" >>$strapiEnv
echo "JWT_SECRET=$(pass dg/cms/jwtsecret)" >>$strapiEnv
echo "TRANSFER_TOKEN_SALT=$(pass dg/cms/transfertokensalt)" >>$strapiEnv
echo "AWS_ACCESS_KEY_ID=$(pass dg/aws/id)" >>$strapiEnv
echo "AWS_ACCESS_SECRET=$(pass dg/aws/secret)" >>$strapiEnv
echo "AWS_REGION=$(pass dg/aws/region)" >>$strapiEnv
echo "AWS_S3_BUCKET=$(pass dg/cms/s/bucket)" >>$strapiEnv
echo "CDN_BASE_URL=$(pass dg/cms/stg-cdnbaseurl)" >>$strapiEnv
echo "DATABASE_PASSWORD=$(pass dg/cms/db/password)" >>$strapiEnv

while test "$1" != --; do
    case $1 in
    ld | local-dev)
        echo "HOST=local.cms.dgrebb.com" >>$strapiEnv
        echo "DATABASE_HOST=localhost" >>$strapiEnv
        echo "NODE_ENV=development" >>$strapiEnv
        echo "API_URL=$(pass dg/api/l/url)" >>$frontEnv
        echo "API_KEY=$(pass dg/api/l/apikey)" >>$frontEnv
        break
        ;;
    l | local-docker)
        echo "HOST=0.0.0.0" >>$strapiEnv
        echo "DATABASE_HOST=host.docker.internal" >>$strapiEnv
        echo "NODE_ENV=development" >>$strapiEnv
        break
        ;;
    s | stg)
        echo "HOST=0.0.0.0" >>$strapiEnv
        echo "DATABASE_HOST=$(pass dg/cms/db/s/host)" >>$strapiEnv
        echo "NODE_ENV=production" >>$strapiEnv
        break
        ;;
    p | prd | prod)
        echo "HOST=0.0.0.0" >>$strapiEnv
        echo "AWS_S3_BUCKET=$(pass dg/cms/p/bucket)" >>$strapiEnv
        echo "CDN_BASE_URL=$(pass dg/cms/cdnbaseurl)" >>$strapiEnv
        echo "DATABASE_HOST=$(pass dg/cms/db/host)" >>$strapiEnv
        echo "NODE_ENV=production" >>$strapiEnv
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [-l] [-ld] [-p]" >&2
        break
        ;;
    esac
done