directory=$(dirname $(realpath /usr/local/bin/dg))
red='\033[0;31m'
yellow='33'
BOLDYELLOW="\e[1;${yellow}m"
NC='\033[0m' # No Color

hello() {
    $directory/scripts/hello.sh
}

setEnv() {
    printf "\n${BOLDYELLOW}Setting .env...${NC}\n"
    /bin/bash $directory/scripts/set-env.sh p
}

setLocalEnv() {
    printf "\n${BOLDYELLOW}Setting local .env...${NC}\n"
    /bin/bash $directory/scripts/set-env.sh l
}

shredEnv() {
    printf "\n${BOLDYELLOW}Shredding .env...${NC}\n"
    gshred $directory/../strapi/.env && rm $directory/../strapi/.env
}

setTfEnv() {
    printf "\n${BOLDYELLOW}Setting Terraform vars...${NC}\n"
    source $directory/../tf/scripts/set-tf-vars.sh
}