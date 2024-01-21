bluebg="\e[44m"
green="\e[32m"
red="\e[31m"
yellow="\e[33m"
BOLDRED="\e[1;32m"
BOLDGREEN="\e[1;31m"
BOLDYELLOW="\e[1;33m"

NC="\033[0m" # No Color

hello() {
    $DGPATH/_scripts/hello.sh
}

env() {
    cd $DGPATH/../back
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
        back_ecr_uri=$(pass dg/cms/p/ecr-uri)
    elif [ $1 = s ]; then
        back_img=$(pass dg/cms/s/domain)
        back_ecr_uri=$(pass dg/cms/s/ecr-uri)
    else
        back_img=$(pass dg/cms/local-domain)
    fi
}

fimg() {
    cd $DGPATH/../front
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
    /bin/bash $DGPATH/_scripts/setBackEnv.sh $1
}

setFrontEnv() {
    /bin/bash $DGPATH/_scripts/setFrontEnv.sh $1
}

setDockerEnv() {
    /bin/bash $DGPATH/_scripts/setDockerEnv.sh $1
}

shred() {
    if [ -f $DGPATH/../back/.env ]; then
        printDgMsg "Shredding Strapi .env..."
        gshred $DGPATH/../back/.env && rm $DGPATH/../back/.env
    fi
    if [ -f $DGPATH/../front/.env ]; then
        printDgMsg "Shredding Svelte .env..."
        gshred $DGPATH/../front/.env && rm $DGPATH/../front/.env
    fi
    if [ -f $DGPATH/../_docker/.env ]; then
        printDgMsg "Shredding Docker .env..."
        gshred $DGPATH/../_docker/.env && rm $DGPATH/../_docker/.env
    fi
}

setTfEnv() {
    printDgMsg "Setting Terraform vars..."
    source $DGPATH/_scripts/setTFEnv.sh
}

retag() {
    MANIFEST=$(aws ecr batch-get-image --region $(pass dg/aws/region) --repository-name ${1} --image-ids imageTag=latest --output json | jq --raw-output --join-output '.images[0].imageManifest')
    aws ecr put-image --region $(pass dg/aws/region) --repository-name $1 --image-tag last --image-manifest "${MANIFEST}" >/dev/null
    aws ecr batch-delete-image --region $(pass dg/aws/region) --repository-name $1 --image-ids --image-tag latest >/dev/null
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

backstopRunTests() {
    curl -X POST http://localhost:3000/test -H "Content-Type: multipart/form-data"
}

cdbackstop() {
    cd $DGPATH/../_ci/backstop
}

cdback() {
    cd $DGPATH/../back
}

cdfront() {
    cd $DGPATH/../front
}

cdperf() {
    cd $DGPATH/../_ci/perf
}

printDg() {
    printf "\n${1}\n"
}

printDgErr() {
    printDg "${red}${1}${NC}"
}

printDgMsg() {
    printDg "${yellow}${1}${NC}"
}

printDgBnr() {
    printDg "${bluebg}${BOLDGREEN}${1}${NC}"
}

warning() {
    $DGPATH/_scripts/warning.sh
}
