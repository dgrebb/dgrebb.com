#!/bin/bash
directory=$(dirname $(realpath /usr/local/bin/dg))

source $directory/scripts/functions.sh

if [ $# -eq 0 ]; then
    printf "Missing args"
else
    while test "$1" != --; do
        hello
        cd $directory/../tf
        case $1 in
        i | init)
            setTfEnv
            printf "${BOLDYELLOW}Initializing...${NC} \n"
                terraform init
            break 2
            ;;
        iu | init-upgrade)
            setTfEnv
            printf "${BOLDYELLOW}Upgrading Terraform...${NC} \n"
                terraform init -upgrade
            break 2
            ;;
        p | plan)
            setTfEnv
            printf "${BOLDYELLOW}Setting Terraform plan...${NC} \n"
                terraform plan
            break 2
            ;;
        a | apply)
            setTfEnv
            printf "${BOLDYELLOW}Applying Terraform plan...${NC}    \n"
                terraform apply
            break 2
            ;;
        *)
            printf "${red}██████████ Unexpected options for terraform: wrong terraform args. ██████████\n\n"
            break 2
            ;;
        esac
    done
fi
