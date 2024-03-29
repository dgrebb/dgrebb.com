#!/bin/bash
source $DGPATH/_scripts/functions.sh

region=$(pass dg/aws/region)

if [ $# -eq 0 ]; then
    printDgErr "Missing args!"
else
    while test "$1" != --; do
        if [ "$1" != "ba" ]; then
            setBackEnv $2
            setDockerEnv $2
            img $2
        fi
        case $1 in
        b | build | bb | build-back)
            cd $DGPATH/../_docker
            printDgMsg "Building ${2}..."
            docker-compose -f _docker-compose.yml build
            break 2
            ;;
        ba | build-act)
            cd $DGPATH/../_docker
            printDgMsg "Building act testing image..."
            docker buildx build . -t github-actions-test -f act.Dockerfile --platform linux/amd64
            break 2
            ;;
        rb | rebuild)
            cd $DGPATH/../_docker
            printDgMsg "Rebuilding ${2}..."
            docker-compose --verbose -f _docker-compose.yml build --no-cache --progress=plain
            break 2
            ;;
        r | run)
            cd $DGPATH/../_docker
            printDgMsg "Running local container..."
            docker-compose -f _docker-compose.yml up
            break 2
            ;;
        p | push | pb | push-back)
            printDgMsg "Pushing ${back_img}..."
            aws ecr get-login-password --region ${region} |
                docker login --username AWS --password-stdin ${back_ecr_uri}
            tag ${back_img} ${back_ecr_uri}
            # archive ${back_ecr_uri}:latest
            docker push ${back_ecr_uri}:latest
            break 2
            ;;
        clean)
            docker system prune -a --volumes
            break 2
            ;;
        *)
            printDgErr "Unexpected options for docker: wrong docker args."
            break 2
            ;;
        esac
        # shred
    done
fi
