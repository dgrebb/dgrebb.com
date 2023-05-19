#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for front command [dev] is required.\n"
    exit 1
fi
while test "$1" != --; do
    case $1 in
    d | dev)
        cdfront && \
        npm run dev
        break
        ;;
    i | install)
        cdfront && npm i
        ;;
    b | build)
        cdfront && npm run build
        ;;
    s | start)
        cdfront && npm run start
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
shredEnv
