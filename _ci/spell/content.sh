#!/bin/bash

# Checks final build spelling

SITEMAP="${1:-https://www.dgrebb.com/sitemap.xml}"
urls=$(curl -s $SITEMAP | grep "<loc>" | awk -F"<loc>" '{print $2} ' | awk -F"</loc>" '{print $1}')
for url in $urls; do
  echo "$url"
  content=$(wget $url -q -O - | pnpm run text -p machine --selectors[] {} :selector=img :format=skip)
  echo $content | pnpm run spell stdin://$url
done
