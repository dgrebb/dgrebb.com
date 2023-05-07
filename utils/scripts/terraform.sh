#!/bin/bash
directory=$(dirname $(realpath /usr/local/bin/dg))

acr_uri=$(pass aws/acr-uri)
region=$(pass aws/region)
image_name=cms.dgrebb.com

source $directory/scripts/functions.sh

if [ $# -eq 0 ]; then
    printf "Missing args"
else
    while test "$1" != --; do
        cd $directory/../tf
        case $1 in
        i | init)
            setTfEnv
            printf "\nInitializing Terraform...\n"
            cd $directory/../tf &&
                terraform init
            break 2
            ;;
        p | plan)
            setTfEnv
            printf "\nSetting Terraform plan...\n"
            cd $directory/../tf &&
                terraform plan
            break 2
            ;;
        a | apply)
            setTfEnv
            printf "\nApplying Terraform plan...\n"
            cd $directory/../tf &&
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
