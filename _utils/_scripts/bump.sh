#!/bin/bash
source $directory/_scripts/functions.sh

cd $directory/../
config="_utils/_cliff/config.toml"
file="CHANGELOG.md"
str=$(cz bump --dry-run | awk '/tag to create: /')
curr=$(cz version -p)
ver=${str//tag to create: /}
git cliff -c $config --unreleased --tag $ver --prepend ${file}
git ls-files --modified
read -p $'\e[31mCut the release branch now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    git status
    read -p $'\e[31mKeep the CHANGELOG.md updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        git restore CHANGELOG.md
        exit 1
    else
        git add .
        git commit -m "chore(release): prepare for ${ver}"
    fi
    exit 1
else
    branch=$(git branch --show-current)
    [[ $branch != release* ]] && git checkout -b release/$ver
    branch=$(git branch --show-current)
    echo "${branch} created!"
fi
read -p $'\e[31mBump the version now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
else
    cdfront
    npm version $ver -s
    cdback
    npm version $ver -s
    cd $directory/../
    cz bump --files-only
    git status
fi
read -p $'\e[31mStage file bump changes?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    git status
    read -p $'\e[31mUndo these updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    git restore .
    exit 1
else
    git add .
    git commit -m "release ${curr} → ${ver}"
fi
echo
read -p $'\e[31mPush to origin now?\e[0m: ' -n 1 -r
echo # newline
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
else
    git push --set-upstream origin $branch
    printDgBnr "Congratulations! ${branch} is queuing up for deployment!"
fi
