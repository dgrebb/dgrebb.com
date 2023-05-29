#!/bin/bash
source $directory/_scripts/functions.sh

region=$(pass aws/region)

if [ $# -eq 0 ]; then
    printDgErr "Missing args!"
else
    while test "$1" != --; do
        case $1 in
        b | build)
            printDgMsg "Building ${2}..."
            prepBuild $2
            cd $directory/../_docker
            docker-compose build
            break 2
            ;;
        rb | rebuild)
            printDgMsg "Rebuilding ${2}..."
            prepBuild $2
            cd $directory/../_docker
            docker-compose build --no-cache
            break 2
            ;;
        bf | build-front)
            prepBuild $2
            fimg $2
            printDgMsg "Building ${front_img}..."
            docker buildx build --platform linux/amd64 -t ${front_img} \
            break 2
            ;;
        rbf | rebuild-front)
            prepBuild $2
            cd $directory/../_docker
            printDgMsg "Rebuilding ${2}..."
            docker-compose build front --no-cache
            break 2
            ;;
        bs | build-strapi)
            printDgMsg "Building ${image_name}..."
            env $2
            docker buildx build --platform linux/amd64 \
                -t ${image_name} ../strapi/.
            break 2
            ;;
        r | run)
            printDgMsg "Running local container..."
            prepBuild $2
            cd $directory/../_docker
            docker-compose up
            break 2
            ;;
        rf | run-front)
            fimg $2
            printDgMsg "Running local ${front_img}..."
            docker run -p 80:3000 -it ${front_img}
            break 2
            ;;
        p | push)
            img $2
            fimg $2
            printDgMsg "Pushing ${front_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${front_ecr_uri}
            tag ${front_img} ${front_ecr_uri}
            # archive ${front_ecr_uri}
            docker push ${front_ecr_uri}:latest
            # -----------------
            printDgMsg "Pushing ${strapi_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${strapi_ecr_uri}
            tag ${strapi_img} ${strapi_ecr_uri}
            # archive ${strapi_ecr_uri}
            docker push ${strapi_ecr_uri}:latest
            break 2
            ;;
        pc | push-cms)
            img $2
            printDgMsg "Pushing ${strapi_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${strapi_ecr_uri}
            tag ${strapi_img} ${strapi_ecr_uri}
            # archive ${strapi_ecr_uri}:latest
            docker push ${strapi_ecr_uri}:latest
            break 2
            ;;
        pf | push-front)
            fimg $2
            printDgMsg "Pushing ${front_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${front_ecr_uri}
            tag ${front_img} ${front_ecr_uri}
            # archive ${front_ecr_uri}:latest
            docker push ${front_ecr_uri}:latest
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
