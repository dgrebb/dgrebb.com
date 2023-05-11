directory=$(dirname $(realpath /usr/local/bin/dg))
red='\033[0;31m'
yellow='33'
BOLDYELLOW="\e[1;${yellow}m"
NC='\033[0m' # No Color

hello() {
    $directory/_scripts/hello.sh
}

setEnv() {
    printf "\n${BOLDYELLOW}Setting .env...${NC}\n"
    /bin/bash $directory/_scripts/set-env.sh p
}

setStgEnv() {
    printf "\n${BOLDYELLOW}Setting local .env...${NC}\n"
    /bin/bash $directory/_scripts/set-env.sh s
}

setLocalEnv() {
    printf "\n${BOLDYELLOW}Setting local .env...${NC}\n"
    /bin/bash $directory/_scripts/set-env.sh l
}

shredEnv() {
    printf "\n${BOLDYELLOW}Shredding .env...${NC}\n"
    gshred $directory/../strapi/.env && rm $directory/../strapi/.env
}

setTfEnv() {
    printf "\n${BOLDYELLOW}Setting Terraform vars...${NC}\n"
    source $directory/../tf/_scripts/set-tf-vars.sh
}

retag() {
    docker tag ${acr_uri}:latest ${acr_uri}:last
}

stgRetag() {
    docker tag ${stg_acr_uri}:latest ${stg_acr_uri}:last
}

archive() {
    retag
    docker rmi ${acr_uri}:latest
}

stgArchive() {
    stgRetag
    docker rmi ${stg_acr_uri}:latest
}

tag() {
    docker tag ${image_name}:latest ${acr_uri}:latest
}

stgTag() {
    docker tag ${image_name}:latest ${stg_acr_uri}:latest
}

run() {
    docker run -p 1337:1337 -it ${image_name}
}
