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
            npm run dev.local -- --host
        break
        ;;
    i | install)
        cdfront && npm i
        break
        ;;
    b | build)
        setFrontEnv ${env}
        cdfront && npm run build.local
        break
        ;;
    s | live-server)
        cdfront && live-server ./build
        break
        ;;
    p | preview)
        cdfront && npm run preview.local -- --host
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
# shred
