#!/bin/bash
source $DGPATH/_scripts/functions.sh

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
            pnpm run dev.${env} --host
        break
        ;;
    dn | dev-network)
        setFrontEnv ${env}
        cdfront &&
            pnpm run dev --host
        break
        ;;
    i | install)
        cdfront && pnpm i
        break
        ;;
    b | build)
        setFrontEnv ${env}
        cdfront && pnpm run build.${env}
        break
        ;;
    bp | build-production)
        setFrontEnv ${env}
        cdfront && pnpm run build.p
        break
        ;;
    u | update)
        printDgMsg "Updating dependencies..."
        echo
        cdfront && pnpx npm-check-updates -u --dep dev
        echo # newline
        printDgMsg "All dependencies up to date!"
        echo # newline
        read -p $'\e[33mFlush node_modules and reinstall now?\e[0m: ' -n 1 -r
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo # newline
            rm -rf package-lock.json pnpm-lock.yaml node_modules && pnpm i
            read -p $'\e[32mStart the dev server?\e[0m: ' -n 1 -r
            echo # newline
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                pnpm run dev.l
            else
                exit 0
            fi
        else
            exit 0
        fi
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
            DEPLOY_ENV=$DEPLOY_ENV pnpm run build.${env}
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
        cdfront && pnpm run preview.local --host
        break
        ;;
    l | lint)
        cdfront && pnpm run lint
        break
        ;;
    r | bundle-report)
        open $DGPATH/../front/.report/index.html
        break
        ;;
    ba | baseline-report)
        printDgMsg "Baselining the current BundleStats report..."
        cdfront && pnpm run baseline
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
# shred
