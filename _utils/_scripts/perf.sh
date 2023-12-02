#!/bin/bash
source $directory/_scripts/functions.sh

if [[ $2 == "s" ]]; then
  URL="https://stg.dgrebb.com"
elif [[ $2 == "p" ]]; then
  URL="https://www.dgrebb.com"
else
  URL="https://local.dgrebb.com"
fi
urls="${URL}/?roboto
${URL}/post/animating-page-and-view-transitions-with-accessibility-in-mind/?roboto
${URL}/posts/index.html?roboto
${URL}/posts/category/all/?roboto
${URL}/privacy/?roboto
${URL}/cv/?roboto"
# exec 3>&1 &>/dev/null
if [ $# -eq 0 ]; then
  printf "\n${red}Argument for perf command [dev] is required.\n"
  exit 1
fi
cdperf
while test "$1" != --; do
  case $1 in
  lh | lighthouse)
    trap exit 0 INT
    while IFS="" read -r url || [ -n "$url" ]; do
      u="$(echo "$url" | tr -d '\r')"
      undurl=$(echo "$u" | sed -E 's|https?://([^/]+)(/[^?#]*)?([?#]?.*)?|\2|;s|/+$||;s|/|_|g')
      echo "Running Lighthouse on $u and writing report to ./${undurl}"
      npm run lhgh $u -- --output-path ./reports/mobile_${undurl}report.html --disable-extensions --view
      npm run lhgh-d $u -- --output-path ./reports/desktop_${undurl}report.html --disable-extensions --view
    done <<<"$urls"
    break
    ;;
  w | wal | wallace)
    while test "$2" != --; do
      case $2 in
      s)
        echo 'Testing CSS on STG'
        npm run wals -s
        break 2
        ;;
      p)
        echo 'Testing CSS on PROD'
        npm run walp -s
        break 2
        ;;
      *)
        echo 'Testing CSS on Local'
        npm run wall -s
        break 2
        ;;
      esac
    done
    ;;
  esac
done
