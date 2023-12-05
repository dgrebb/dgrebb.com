#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for front command [dev] is required.\n"
    exit 1
fi

if [ -z "$2" ]; then
    env=l
else
    env=$2
fi

while test "$1" != --; do
    case $1 in
    d | dev)
        setFrontEnv ${env}
        cdfront &&
            npm run dev.${env} -- --host
        break
        ;;
    dn | dev-network)
        setFrontEnv ${env}
        cdfront &&
            npm run dev -- --host
        break
        ;;
    i | install)
        cdfront && npm i
        break
        ;;
    b | build)
        setFrontEnv ${env}
        cdfront && npm run build.${env}
        break
        ;;
    bp | build-production)
        setFrontEnv ${env}
        cdfront && npm run build.p
        break
        ;;
    bx | bx)
        setFrontEnv ${env}
        branch=$(git branch --show-current)
        cdfront &&
            SENTRY_AUTH_TOKEN=$(pass dg/sentry/authtoken) \
            DIST=$(date +%y%m%d-%H%M%S) \
            RELEASE_NAME=dev-$(sed "s/\//-/g" <<<"$branch") \
            DEPLOY_ENV=development \
            UPLOAD_SOURCEMAPS=true \
            RELEASE_NAME=$RELEASE_NAME DIST=$DIST \
            DEPLOY_ENV=$DEPLOY_ENV npm run build.${env}
        break
        ;;
    s | http-server)
        pwd
        cdfront && sudo http-server -b -S -p 443 -a local.dgrebb.com \
            -C local.dgrebb.com.crt -K local.dgrebb.com.key \
            --cors='*' ./build
        break
        ;;
    p | preview)
        cdfront && npm run preview.local -- --host
        break
        ;;
    l | lint)
        cdfront && npm run lint
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
# shred
