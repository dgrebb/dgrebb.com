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
        setEnv ld
        prepBuild l
        cdfront &&
            npm run dev
        break
        ;;
    i | install)
        cdfront && npm i
        break
        ;;
    b | build)
        prepBuild l
        cdfront && npm run build
        break
        ;;
    s | start)
        cdfront && \
        mkdir -p .next/standalone/.next
        cp -r .next/static .next/standalone/.next
        __NEXT_PRIVATE_PREBUNDLED_REACT=next \
        node .next/standalone/server.js
        break
        ;;
    ls | lstart)
        cdfront && npm run lstart
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
shredEnv
