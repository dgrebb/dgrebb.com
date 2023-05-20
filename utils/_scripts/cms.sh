#!/bin/bash
source $directory/_scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for cms command [dev] is required.\n"
    exit 1
fi
while test "$1" != --; do
    case $1 in
    d | dev)
        setEnv l
        cdcms && \
        trap 'printf "\n"; shredEnv ; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run strapi develop
        break
        ;;
    i | install)
        setEnv l
        cdcms && npm i
        break
        ;;
    b | build)
        setEnv l
        cdcms && npm run build
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
shredEnv
