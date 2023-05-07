#!/bin/bash
directory=$(dirname $(realpath /usr/local/bin/dg))

acr_uri=$(pass aws/acr-uri)
region=$(pass aws/region)
image_name=cms.dgrebb.com

source $directory/scripts/functions.sh

hello
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
        *)
            printf "${red}██████████ Unexpected options for docker: wrong docker args. ██████████\n\n"
            break 2
            ;;
        esac
    done
fi

retag() {
    docker tag ${acr_uri}:latest ${acr_uri}:last
}

archive() {
    retag
    docker rmi ${acr_uri}:latest
}

tag() {
    docker tag ${image_name}:latest ${acr_uri}:latest
}

run() {
    docker run -p 1337:1337 -it ${image_name}
}
