#!/bin/bash
source $directory/_scripts/functions.sh

acr_uri=$(pass dg/cms/acr-uri)
stg_acr_uri=$(pass dg/cms/stg-acr-uri)
region=$(pass aws/region)
image_name=cms.dgrebb.com

source $directory/_scripts/functions.sh

if [ $# -eq 0 ]; then
    printf "Missing args"
else
    while test "$1" != --; do
        cd $directory/../strapi
        case $1 in
        build)
            setEnv
            printf "\nBuilding Docker image...\n"
            docker buildx build --platform linux/amd64 \
                -t ${image_name} ../strapi/. &&
                shredEnv
            break 2
            ;;
        build-stg)
            setStgEnv
            printf "\nBuilding Docker image...\n"
            docker buildx build --platform linux/amd64 \
                -t ${image_name} ../strapi/. &&
                shredEnv
            break 2
            ;;
        rebuild)
            setEnv
            docker buildx build --platform linux/amd64 \
                --no-cache \
                -t ${image_name} ../strapi/. &&
                shredEnv
            break 2
            ;;
        buildlocal)
            setLocalEnv
            docker buildx build \
                --build-arg NODEENV=development \
                --platform linux/amd64 -t local.${image_name} ../strapi/. &&
                shredEnv
            break 2
            ;;
        rebuildlocal)
            setLocalEnv
            docker buildx build --platform linux/amd64 \
                --no-cache \
                -t ${image_name} ../strapi/. &&
                shredEnv
            break 2
            ;;
        run)
            printf "Running local Docker image"
            docker run -p 1337:1337 -it local.${image_name}
            break 2
            ;;
        push)
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${acr_uri}
            archive
            tag
            docker push ${acr_uri}
            break 2
            ;;
        push-stg)
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${stg_acr_uri}
            stgArchive
            stgTag
            docker push ${stg_acr_uri}
            break 2
            ;;
        *)
            printf "${red}██████████ Unexpected options for docker: wrong docker args. ██████████\n\n"
            break 2
            ;;
        esac
    done
fi