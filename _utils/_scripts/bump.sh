#!/bin/bash
source $directory/_scripts/functions.sh

cd $directory/../
config="_utils/_cliff/config.toml"
file="CHANGELOG.md"
str=$(cz bump --dry-run | awk '/tag to create: /')
ver=${str//tag to create: /}
git cliff -c $config --unreleased --tag $ver --prepend ${file}
git ls-files --modified
read -p $'\e[31mDo you want to stage the changelog updates for commit?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    read -p $'\e[31mDo you want to undo the changelog updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    git restore CHANGELOG.md
    exit 1
fi
git add .
git status
read -p $'\e[31mDouble check the staged files. Do you want to commit these changes?\e[0m: ' -n 1 -r
echo # newline
git status
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
git commit -m "chore(release): prepare for ${ver}"
read -p $'\e[31mDo you want to bump the version now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi
cz bump
