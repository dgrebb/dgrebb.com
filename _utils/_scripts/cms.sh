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
        setBackEnv ld
        cdback && \
        trap 'printf "\n"; shred ; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop
        break
        ;;
    ad | admin-dev)
        setBackEnv ld
        cdback && \
        trap 'printf "\n"; shred ; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop -- --watch-admin
        break
        ;;
    ds | dev-stage)
        setBackEnv ls
        cdback && \
        trap 'printf "\n"; shred ; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop -- --watch-admin
        break
        ;;
    i | install)
        setBackEnv l
        cdback && npm i
        break
        ;;
    b | build)
        setBackEnv l
        cdback && npm run build
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
shred
