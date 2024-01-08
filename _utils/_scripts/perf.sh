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
${URL}/cv/?roboto
${URL}/post/animating-page-and-view-transitions-with-accessibility-in-mind/?roboto
${URL}/posts/index.html?roboto
${URL}/posts/category/all/?roboto
${URL}/cv/?roboto
${URL}/privacy/?roboto"
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
      printDgMsg "Running Lighthouse on $u and writing report to ./${undurl}"
      pnpm lhgh $u --output-path ./reports/mobile_${undurl}report.html --disable-extensions --view
      pnpm lhgh-d $u --output-path ./reports/desktop_${undurl}report.html --disable-extensions --view
    done <<<"$urls"
    printDgMsg "✓ All done!"
    break
    ;;
  w | wal | wallace)
    while test "$2" != --; do
      case $2 in
      s)
        printDgMsg "Testing CSS on STG"
        pnpm wals --reporter=silent
        break 2
        ;;
      p)
        printDgMsg "Testing CSS on PROD"
        pnpm walp --reporter=silent
        break 2
        ;;
      *)
        printDgMsg "Testing CSS on Local"
        pnpm wall --reporter=silent
        break 2
        ;;
      esac
    done
    printDgMsg "✓ All done!"
    break
    ;;
  u | update)
    printDgMsg "Updating dependencies..."
    echo
    cdperf && npx ncu -u --dep dev
    echo # newline
    printDgMsg "✓ All dependencies up to date!"
    echo # newline
    read -p $'\e[33mFlush node_modules and reinstall now?\e[0m: ' -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo # newline
      rm -rf package-lock.json pnpm-lock.yaml node_modules && pnpm i
    else
      exit 0
    fi
    printDgMsg "✓ All done!"
    break
    ;;
  esac
done
