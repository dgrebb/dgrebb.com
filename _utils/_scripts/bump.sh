#!/bin/bash
source $directory/_scripts/functions.sh

cd $directory/../
config="_utils/_cliff/config.toml"
file="CHANGELOG.md"
str=$(cz bump --dry-run | awk '/tag to create: /')
ver=${str//tag to create: /}
branch=$(git branch --show-current)
[[ $branch != release* ]] && git checkout -b release/$ver
branch=$(git branch --show-current)
git cliff -c $config --unreleased --tag $ver --prepend ${file}
git ls-files --modified
read -p $'\e[31mWould you like to stage the changelog updates for commit?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    read -p $'\e[31mWould you like to undo the changelog updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    git restore CHANGELOG.md
    exit 1
fi
git add CHANGELOG.md
git status
read -p $'\e[31mDouble check the staged files. Would you like to commit these changes?\e[0m: ' -n 1 -r
echo # newline
git status
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
git commit -m "chore(release): prepare for ${ver}"
read -p $'\e[31mWould you like to bump the version now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
# cdfront
# npm version $ver
# cdback
# npm version $ver
cd $directory/../
git add .
cz bump --files-only
echo "${branch} created!"
echo
read -p $'\e[31mWould you like to push to origin now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
git push --set-upstream origin $branch
printDgBnr "Congratulations! ${branch} is queuing up for deployment!"
