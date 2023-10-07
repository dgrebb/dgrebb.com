#!/bin/bash
source $directory/_scripts/functions.sh

cd $directory/../
config="_utils/_cliff/config.toml"
file="CHANGELOG.md"
str=$(cz bump --dry-run | awk '/tag to create: /')
ver=${str//tag to create: /}
git cliff -c $config --unreleased --tag $ver --prepend ${file}
git ls-files --modified
read -p $'\e[31mWould you like to cut the release branch now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    git status
    read -p $'\e[31mWould you like to keep the CHANGELOG.md updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        git restore CHANGELOG.md
        exit 1
    fi
    exit 1
fi
branch=$(git branch --show-current)
[[ $branch != release* ]] && git checkout -b release/$ver
branch=$(git branch --show-current)
echo "${branch} created!"
read -p $'\e[31mWould you like to bump the version now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
cd $directory/../
cz bump --files-only
git status
read -p $'\e[31mWould you like to stage release changes?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    git status
    read -p $'\e[31mWould you like to undo these updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    git restore .
    exit 1
fi
git add .
git commit -m "chore(release): prepare for ${ver}"
echo
read -p $'\e[31mWould you like to push to origin now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
git push --set-upstream origin $branch
printDgBnr "Congratulations! ${branch} is queuing up for deployment!"
