red='31'
BOLDRED="\e[1;${red}m"
yellow='33'
BOLDYELLOW="\e[1;${yellow}m"
NC='\033[0m' # No Color

hello() {
    $directory/_scripts/hello.sh
}

env() {
    if [ $# -eq 0 ] || [ $1 = p ]; then
        setEnv p
        img p
    elif [ $1 = s ]; then
        setEnv s
        echo "wtf"
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

setEnv() {
    printDgMsg "Setting .env..."
    /bin/bash $directory/_scripts/set-env.sh $1
}

shredEnv() {
    if [ -f $directory/../strapi/.env ]; then
        printDgMsg "Shredding .env..."
        gshred $directory/../strapi/.env && rm $directory/../strapi/.env
    fi
}

setTfEnv() {
    printDgMsg "Setting Terraform vars..."
    source $directory/../tf/_scripts/set-tf-vars.sh
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