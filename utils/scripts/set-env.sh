#!/bin/bash
directory=$(dirname $(realpath /usr/local/bin/dg))
source $directory/scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for local (-l) or production (-p) is required.\n"
    exit 1
fi
>$directory/../strapi/.env
echo "PORT=1337" >>$directory/../strapi/.env
echo "APP_KEYS=$(pass dg/cms/appkeys)" >>$directory/../strapi/.env
echo "API_TOKEN_SALT=$(pass dg/cms/apitokensalt)" >>$directory/../strapi/.env
echo "ADMIN_JWT_SECRET=$(pass dg/cms/adminjwtsecret)" >>$directory/../strapi/.env
echo "JWT_SECRET=$(pass dg/cms/jwtsecret)" >>$directory/../strapi/.env
echo "TRANSFER_TOKEN_SALT=$(pass dg/cms/transfertokensalt)" >>$directory/../strapi/.env
echo "AWS_ACCESS_KEY_ID=$(pass dg/aws/id)" >>$directory/../strapi/.env
echo "AWS_ACCESS_SECRET=$(pass dg/aws/secret)" >>$directory/../strapi/.env
echo "AWS_REGION=$(pass dg/aws/region)" >>$directory/../strapi/.env
echo "AWS_S3_BUCKET=$(pass dg/cms/bucket)" >>$directory/../strapi/.env
echo "CDN_BASE_URL=$(pass dg/cms/cdnbaseurl)" >>$directory/../strapi/.env
echo "DATABASE_PASSWORD=$(pass dg/cms/db/password)" >>$directory/../strapi/.env

while test "$1" != --; do
    case $1 in
    l)
        echo "HOST=0.0.0.0" >>$directory/../strapi/.env
        echo "DATABASE_HOST=host.docker.internal" >>$directory/../strapi/.env
        echo "NODE_ENV=development" >>$directory/../strapi/.env
        break
        ;;
    ld)
        echo "HOST=local.cms.dgrebb.com" >>$directory/../strapi/.env
        echo "DATABASE_HOST=localhost" >>$directory/../strapi/.env
        echo "NODE_ENV=development" >>$directory/../strapi/.env
        break
        ;;
    p)
        echo "HOST=0.0.0.0" >>$directory/../strapi/.env
        echo "DATABASE_HOST=$(pass dg/cms/db/host)" >>$directory/../strapi/.env
        echo "NODE_ENV=production" >>$directory/../strapi/.env
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [-l] [-ld] [-p]" >&2
        break
        ;;
    esac
done

echo "Environment set."
exit
