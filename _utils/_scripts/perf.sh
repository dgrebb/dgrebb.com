#!/bin/bash
source $directory/_scripts/functions.sh

if [ $1 == "s" ]; then
  URL="https://stg.dgrebb.com/"
elif [ $1 == "p" ]; then
  URL="https://www.dgrebb.com/"
else
  URL="http://local.dgrebb.com:8080/"
fi

cdperf && URL=$URL npm run test