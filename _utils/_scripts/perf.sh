#!/bin/bash
source $directory/_scripts/functions.sh

if [[ $1 == "s" ]]; then
  URL="https://stg.dgrebb.com"
elif [[ $1 == "p" ]]; then
  URL="https://www.dgrebb.com"
else
  URL="https://local.dgrebb.com"
fi

urls="${URL}/index.html?roboto
${URL}/posts/index.html?roboto
${URL}/post/hello-world/index.html?roboto
${URL}/posts/category/all/index.html?roboto
${URL}/privacy/index.html?roboto"

trap exit 0 INT
cdperf
while IFS="" read -r url || [ -n "$url" ]; do
  u="$(echo "$url" | tr -d '\r')"
  undurl=$(echo "$u" | sed -E 's|https?://([^/]+)(/[^?#]*)?([?#]?.*)?|\2|;s|/+$||;s|/|_|g')
  echo "Running Lighthouse on $u and writing report to ./${undurl}"
  npm run lhgh $u -- --output-path ./reports/mobile_${undurl}report.html --disable-extensions --view
  npm run lhgh-d $u -- --output-path ./reports/desktop_${undurl}report.html --disable-extensions --view
done <<<"$urls"
