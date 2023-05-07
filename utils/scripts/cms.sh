#!/bin/bash
directory=$(dirname $(realpath /usr/local/bin/dg))
source $directory/scripts/functions.sh

# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
    printf "\n${red}Argument for cms command [dev] is required.\n"
    exit 1
fi
while test "$1" != --; do
    case $1 in
    dev)
        cd strapi && npm run develop
        break
        ;;
    ?)
        echo "script usage: $(basename \$0) [dev]" >&2
        break
        ;;
    esac
done

echo "Running local Strapi development server."
exit
