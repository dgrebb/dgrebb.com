red="31"
yellow="33"
bluebg="\e[44m"
BOLDRED="\e[1;${red}m"
BOLDYELLOW="\e[1;${yellow}m"
NC="\033[0m" # No Color

hello() {
    $directory/_scripts/hello.sh
}

env() {
    cd $directory/../strapi
    if [ $# -eq 0 ] || [ $1 = p ]; then
        setEnv p
        img p
    elif [ $1 = s ]; then
        setEnv s
        img s
    else
        setEnv $1
        img
    fi
}

img() {
    if [ $# -eq 0 ] || [ $1 = p ]; then
        image_name=$(pass dg/cms/domain)
        acr_uri=$(pass dg/cms/acr-uri)
    elif [ $1 = s ]; then
        image_name=$(pass dg/cms/stg-domain)
        acr_uri=$(pass dg/cms/stg-acr-uri)
    else
        image_name=$(pass dg/cms/local-domain)
    fi
}

fimg() {
    cd $directory/../front
    if [ $# -eq 0 ] || [ $1 = p ]; then
        image_name=$(pass dg/www/domain)
        acr_uri=$(pass dg/www/acr-uri)
    elif [ $1 = s ]; then
        image_name=$(pass dg/www/stg/domain)
        acr_uri=$(pass dg/www/stg/acr-uri)
    else
        image_name=$(pass dg/www/local/domain)
    fi
}

setEnv() {
    printDgMsg "Setting Strapi .env..."
    /bin/bash $directory/_scripts/set-env.sh $1
}

shredEnv() {
    if [ -f $directory/../strapi/.env ]; then
        printDgMsg "Shredding Strapi .env..."
        gshred $directory/../strapi/.env && rm $directory/../strapi/.env
    fi
    if [ -f $directory/../front/.env ]; then
        printDgMsg "Shredding Next .env..."
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

prepBuild() {
    /bin/bash $directory/_scripts/prep-build.sh $1
}

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

cdcms() {
    cd ${directory}/../strapi
}

cdfront() {
    cd ${directory}/../front
}

printDg() {
    printf "\n${1}\n\n"
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