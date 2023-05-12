#!/bin/bash
source $directory/_scripts/functions.sh

environment=$1

if [ $# -eq 0 ]; then
    printDgErr "Missing args for Terraform commands!"
else
    while test "$2" != --; do
        cd $directory/../tf/$environment
        case $2 in
        i | init)
            setTfEnv
            printDgMsg "Initializing..."
                terraform init
            break 2
            ;;
        iu | init-upgrade)
            setTfEnv
            printDgMsg "Upgrading Terraform..."
                terraform init -upgrade
            break 2
            ;;
        p | plan)
            setTfEnv
            printDgMsg "Setting Terraform plan..."
                terraform plan
            break 2
            ;;
        a | apply)
            setTfEnv
            printDgMsg "Applying Terraform plan..."
                terraform apply
            break 2
            ;;
        re | refresh)
            setTfEnv
            printDgMsg "Refreshing Terraform state..."
                terraform refresh
            break 2
            ;;
        *)
            printDgErr "Unexpected options for terraform: wrong terraform args."
            break 2
            ;;
        esac
    done
fi
