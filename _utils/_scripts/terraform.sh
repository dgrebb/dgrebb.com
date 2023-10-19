#!/bin/bash
source $directory/_scripts/functions.sh

environment=$1
state_bucket=$(pass dg/aws/$environment/state-bucket)
key="terraform.tfstate"

if [ $# -eq 0 ]; then
    printDgErr "Missing args for Terraform commands!"
else
    while test "$2" != --; do
        cd $directory/../_tf/$environment
        printDgMsg "Working with Terraform in --- ${environment} --- environment!"
        case $2 in
        f | fmt | format)
            printDgMsg "Formatting..."
            terraform fmt -recursive
            break 2
            ;;
        v | val | validate)
            setTfEnv
            printDgMsg "Validating..."
            terraform validate
            break 2
            ;;
        i | init)
            setTfEnv
            printDgMsg "Initializing..."
            terraform init -backend-config="key=$key" -backend-config="bucket=$state_bucket" -backend-config="region=us-east-2"
            break 2
            ;;
        iu | init-upgrade)
            setTfEnv
            printDgMsg "Upgrading Terraform..."
            terraform init -backend-config="key=$key" -backend-config="bucket=$state_bucket" -backend-config="region=us-east-2" -upgrade
            break 2
            ;;
        ir | init-reconfigure)
            setTfEnv
            printDgMsg "Upgrading Terraform..."
            terraform init -backend-config="key=$key" -backend-config="bucket=$state_bucket" -backend-config="region=us-east-2" -reconfigure
            break 2
            ;;
        im | import)
            setTfEnv
            printDgMsg "Initializing..."
            terraform import -backend-config="key=$key" -backend-config="bucket=$state_bucket" -backend-config="region=us-east-2" $3 $4
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
        at | apply-target)
            setTfEnv
            printDgMsg "Applying Terraform plan..."
            terraform apply -target=$3
            break 2
            ;;
        re | refresh)
            setTfEnv
            printDgMsg "Refreshing Terraform state..."
            terraform refresh
            break 2
            ;;
        d | destroy)
            setTfEnv
            printDgMsg "Destroying Terraform infrastructure..."
            if [ -z $3 ]; then
                terraform destroy
            else
                terraform destroy -target=$3
            fi
            break 2
            ;;
        *)
            printDgErr "Unexpected options for terraform: wrong terraform args."
            break 2
            ;;
        esac
    done
fi
