#!/bin/bash
source $directory/_scripts/functions.sh

region=$(pass aws/region)

if [ $# -eq 0 ]; then
    printDgErr "Missing args!"
else
    while test "$1" != --; do
        setEnv $2
        prepBuild $2
        img $2
        fimg $2
        case $1 in
        b | build)
            cd $directory/../_docker
            printDgMsg "Building ${2}..."
            docker-compose -f _docker-compose.yml build
            break 2
            ;;
        rb | rebuild)
            cd $directory/../_docker
            printDgMsg "Rebuilding ${2}..."
            docker-compose -f _docker-compose.yml build --no-cache
            break 2
            ;;
        bf | build-front)
            printDgMsg "Building ${front_img}..."
            docker-compose -f _docker-compose.yml build front
            break 2
            ;;
        rbf | rebuild-front)
            cd $directory/../_docker
            printDgMsg "Rebuilding ${2}..."
            docker-compose -f _docker-compose.yml build front --no-cache
            break 2
            ;;
        bb | build-back)
            cd $directory/../_docker
            printDgMsg "Building ${back_img}..."
            docker-compose -f _docker-compose.yml build back
            break 2
            ;;
        r | run)
            cd $directory/../_docker
            printDgMsg "Running local container..."
            docker-compose -f _docker-compose.yml up
            break 2
            ;;
        rba | run-back)
            printDgMsg "Running local ${back_img}..."
            docker run -p 1337:1337 -it ${back_img}
            break 2
            ;;
        rf | run-front)
            printDgMsg "Running local ${front_img}..."
            docker run -p 80:3000 -it ${front_img}
            break 2
            ;;
        p | push)
            printDgMsg "Pushing ${front_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${front_ecr_uri}
            tag ${front_img} ${front_ecr_uri}
            # archive ${front_ecr_uri}
            docker push ${front_ecr_uri}:latest
            # -----------------
            printDgMsg "Pushing ${back_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${back_ecr_uri}
            tag ${back_img} ${back_ecr_uri}
            # archive ${back_ecr_uri}
            docker push ${back_ecr_uri}:latest
            break 2
            ;;
        pb | push-back)
            printDgMsg "Pushing ${back_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${back_ecr_uri}
            tag ${back_img} ${back_ecr_uri}
            # archive ${back_ecr_uri}:latest
            docker push ${back_ecr_uri}:latest
            break 2
            ;;
        pf | push-front)
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
