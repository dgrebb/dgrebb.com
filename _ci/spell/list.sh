#!/bin/bash
bluebg="\e[44m"
green="32"
red="31"
yellow="33"
BR="\e[${red}m"
BG="\e[1;${green}m"
BY="\e[1;${yellow}m"
NC="\033[0m" # No Color

# Checks final build spelling

SITEMAP="${1:-https://stg.dgrebb.com/sitemap.xml}"
urls=$(curl -s $SITEMAP | grep "<loc>" | awk -F"<loc>" '{print $2} ' | awk -F"</loc>" '{print $1}')
for url in $urls; do
  echo
  echo "=================================================="
  echo
  echo "📖 Reading $url..."
  content=$(wget $url -q -O - | pnpm run text -p human --selectors[] {} :selector=img :format=skip) >/dev/null
  spelling=$(echo $content | pnpm run -s spell.web.list stdin://$url --quiet)
  grammar=$(echo "$content" | pnpm run grammar)
  echo
  # sp=$(printf "${BG}✓ All spelling correct!${NC}")
  # if [[ $spelling ]]; then sp=$(printf "${BY}%s\n\n${NC}${BR}%s${NC}" "Spelling errors found!" "$spelling"); fi
  # echo -e "$sp"
  # gr=$(printf "${BG}✓ All grammar correct!${NC}")
  # if [[ $grammar ]]; then sp=$(printf "${BY}%s\n\n${NC}${BR}%s${NC}" "Grammar issues found!" "$grammar"); fi
  # echo -e "$gr"
  echo $grammar
done
