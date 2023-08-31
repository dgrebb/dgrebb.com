#!/bin/bash
#####################################################################################################
# Cache Warmer
#
# Useage: cache-warmer.sh ...args
#
# This script grabs the sitemap of the site you wish to warm, then grep the urls to wget each one
# to cache it on the server. I'm sure there are better ways to do this, but this was a simple enough
# method for my needs. I didn't want to have to type in the urls each time I warmed their cache, so
# I just made simple functions with short names to feed those urls into the cache warming function.
# I also created an 'all' function to run all of short name functions, with pause breaks, when 'all'
# or no argument is provided.
#####################################################################################################

# This is the user agent of my local machine. The sites I use this script on disallow blank and wget
# useragent strings (among others)
USERAGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36"

prd() {
    echo "Warming cache for example.com..."
    warmUp "www.dgrebb.com"
    echo "www.dgrebb.com cache warmed"
}

stg() {
    echo "Warming cache for stg.dgrebb.com..."
    warmUp "stg.dgrebb.com"
    echo "stg.dgrebb.com cache warmed"
}

all() {
    echo "Warming cache for all sites...."
    stg
    prd
}

warmUp() {
    # If there are particular subdirectories in your sitemap that you do not wish to parse
    # (i.e. because they cannot be cached), you can use the following regex:
    # grep -oP "https?://$1\/((?!subdirectory))[^<]*"
    wget --user-agent="$USERAGENT" -q "https://$1/sitemap.xml" --output-document - | egrep -o "https?://[^<]+" | wget -i -
}

if [ $# -eq 0 ]; then
    all
elif [ $# -eq 1 ]; then
    ${1}
else
    for var in "$@"; do
        ${var}
        pause
    done
fi
