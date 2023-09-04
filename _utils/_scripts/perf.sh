#!/bin/bash
source $directory/_scripts/functions.sh

if [ $1 == "s" ]; then
  URL="https://stg.dgrebb.com"
elif [ $1 == "p" ]; then
  URL="https://www.dgrebb.com"
else
  URL="http://local.dgrebb.com:8080"
fi

urls="$URL
$URL/posts
$URL/privacy"

cdperf
while IFS="" read -r url || [ -n "$url" ]; do
  printf '%s\n' "$url"
  URL=$url PSI_APIKEY=$(pass dg/keys/page-speed-insights) npm run lh
  URL=$url PSI_APIKEY=$(pass dg/keys/page-speed-insights) npm run lh-d
done <<<"$urls"
