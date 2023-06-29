bluebg="\e[44m"
green="32"
red="31"
yellow="33"
BOLDRED="\e[1;${red}m"
BOLDGREEN="\e[1;${green}m"
BOLDYELLOW="\e[1;${yellow}m"

NC="\033[0m" # No Color

hello() {
    $directory/_scripts/hello.sh
}

env() {
    cd $directory/../back
    if [ $# -eq 0 ] || [ $1 = p ]; then
        setBackEnv p
        img p
    elif [ $1 = s ]; then
        setBackEnv s
        img s
    else
        setBackEnv $1
        img
    fi
}

img() {
    if [ $# -eq 0 ] || [ $1 = p ]; then
        back_img=$(pass dg/cms/domain)
        back_ecr_uri=$(pass dg/cms/ecr-uri)
    elif [ $1 = s ]; then
        back_img=$(pass dg/cms/s/domain)
        back_ecr_uri=$(pass dg/cms/s/ecr-uri)
    else
        back_img=$(pass dg/cms/local-domain)
    fi
}

fimg() {
    cd $directory/../front
    if [ $# -eq 0 ] || [ $1 = p ]; then
        front_img=$(pass dg/www/domain)
        front_ecr_uri=$(pass dg/www/ecr-uri)
    elif [ $1 = s ]; then
        front_img=$(pass dg/www/s/domain)
        front_ecr_uri=$(pass dg/www/s/ecr-uri)
    else
        front_img=$(pass dg/www/l/domain)
    fi
}

setBackEnv() {
    printDgMsg "Setting Strapi .env..."
    /bin/bash $directory/_scripts/setBackEnv.sh $1
}

setFrontEnv() {
    /bin/bash $directory/_scripts/setFrontEnv.sh $1
}

setDockerEnv() {
    /bin/bash $directory/_scripts/setDockerEnv.sh $1
}

shred() {
    if [ -f $directory/../back/.env ]; then
        printDgMsg "Shredding Strapi .env..."
        gshred $directory/../back/.env && rm $directory/../back/.env
    fi
    if [ -f $directory/../front/.env ]; then
        printDgMsg "Shredding Svelte .env..."
        gshred $directory/../front/.env && rm $directory/../front/.env
    fi
    if [ -f $directory/../_docker/.env ]; then
        printDgMsg "Shredding Docker .env..."
        gshred $directory/../_docker/.env && rm $directory/../_docker/.env
    fi
}

setTfEnv() {
    printDgMsg "Setting Terraform vars..."
    source $directory/../_tf/_scripts/set-tf-vars.sh
}

retag() {
    MANIFEST=$(aws ecr batch-get-image --region $(pass dg/aws/region) --repository-name ${1} --image-ids imageTag=latest --output json | jq --raw-output --join-output '.images[0].imageManifest')
    aws ecr put-image --region $(pass dg/aws/region) --repository-name $1 --image-tag last --image-manifest "${MANIFEST}" > /dev/null
    aws ecr batch-delete-image --region $(pass dg/aws/region) --repository-name $1 --image-ids --image-tag latest > /dev/null
}

archive() {
    retag $1
    docker rmi --force $1
}

tag() {
    docker tag $1:latest $2:latest
}

run() {
    docker run -p 1337:1337 -it ${back_img}
}

cdback() {
    cd ${directory}/../back
}

cdfront() {
    cd ${directory}/../front
}

printDg() {
    printf "\n${1}\n"
}

printDgErr() {
    printDg "${BOLDRED}${1}${NC}"
}

printDgMsg() {
    printDg "${BOLDYELLOW}${1}${NC}"
}

printDgBnr() {
    printDg "${bluebg}${BOLDYELLOW}${1}${NC}"
}