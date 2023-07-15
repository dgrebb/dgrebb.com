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
        echo # newline
        warning
        echo # newline
        read -p $'\e[44m\e[1;33m\n\n  Before you start Strapi, are you sure \n  there will be no content loss starting\n\n  it right now? \n  > ' -n 1 -r
        echo # newline
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
        setBackEnv ld
        cdback && \
        trap 'printf "\n"; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop
        break
        ;;
    ad | admin-dev)
        setBackEnv ld
        cdback && \
        trap 'printf "\n"; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop -- --watch-admin
        break
        ;;
    ds | dev-stage)
        setBackEnv ls
        cdback && \
        trap 'printf "\n"; printDgMsg "Done!" ; exit 0' SIGINT; \
        npm run develop -- --watch-admin
        break
        ;;
    i | install)
        setBackEnv ld
        cdback && npm i
        break
        ;;
    b | build)
        setBackEnv ld
        cdback && npm run build
        break
        ;;
    ba | backup)
        setBackEnv ld
        APP_KEYS=$(pass dg/cms/appkeys)
        filename=export_$(date '+%Y.%m.%d_%H-%M-%S')
        cdback && npm run --silent strapi export -- -f ./.backups/${filename} -k ${APP_KEYS}
        break
        ;;
    im | import)
        setBackEnv ld
        APP_KEYS=$(pass dg/cms/appkeys)
        filename=export_$(date '+%Y.%m.%d_%H-%M-%S')
        cdback && npm run --silent strapi import -- -f ./.backups/$2 -k ${APP_KEYS}
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done
# shred
