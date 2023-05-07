directory=$(dirname $(realpath /usr/local/bin/dg))
red='\033[0;31m'
NC='\033[0m' # No Color

hello() {
    $directory/scripts/hello.sh
}

setEnv() {
    printf "\nSetting .env...\n"
    /bin/bash $directory/scripts/set-env.sh p
}

setLocalEnv() {
    printf "\nSetting local .env...\n"
    /bin/bash $directory/scripts/set-env.sh l
}

shredEnv() {
    printf "\nShredding .env...\n"
    gshred $directory/../strapi/.env && rm $directory/../strapi/.env
}

setTfEnv() {
    printf "\nSetting terraform vars...\n"
    source $directory/../tf/scripts/set-tf-vars.sh
}