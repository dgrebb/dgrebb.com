#!/bin/bash
source $directory/_scripts/functions.sh

region=$(pass aws/region)

if [ $# -eq 0 ]; then
    printDgErr "Missing args!"
else
    while test "$1" != --; do
        cd $directory/../strapi
        case $1 in
        b | build)
            env $2
            printDgMsg "Building ${image_name}..."
            docker buildx build --platform linux/amd64 \
                -t ${image_name} ../strapi/.
            break 2
            ;;
        rb | rebuild)
            env $2
            printDgMsg "Reuilding ${image_name}..."
            docker buildx build --platform linux/amd64 \
                --no-cache \
                -t ${image_name} ../strapi/.
            break 2
            ;;
        r | run)
            img
            printDgMsg "Running local ${image_name}..."
            docker run -p 1337:1337 -it ${image_name}
            break 2
            ;;
        p | push)
            img $2
            printDgMsg "Pushing ${image_name}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${acr_uri}
            archive
            tag
            docker push ${acr_uri}
            break 2
            ;;
        *)
            printDgErr "Unexpected options for docker: wrong docker args."
            break 2
            ;;
        esac
    done
    shredEnv
fi
