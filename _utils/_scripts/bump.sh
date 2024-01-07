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
echo # newline
read -p $'\e[31mCut the release branch now?\e[0m: ' -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo # newline
    echo 'OK. Changes have been removed from the log.'
    git status
    exit 0
else
    echo # newline
    branch=$(git branch --show-current)
    [[ $branch != release* ]] && git checkout -b release/$ver
    branch=$(git branch --show-current)
    echo "${branch} created!"
    echo # newline
    git status
    echo # newline
    read -p $'\e[31mCommit the CHANGELOG.md updates?\e[0m: ' -n 1 -r
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo # newline
        git restore CHANGELOG.md
        exit 0
    else
        echo # newline
        git add .
        git commit -m "chore(release): prepare for ${ver}"
    fi
fi
echo # newline
read -p $'\e[31mBump the version now?\e[0m: ' -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
else
    echo # newline
    cdfront
    pnpm version $ver -s
    cdback
    pnpm version $ver -s
    cd $directory/../
    cz bump --files-only
    git status
fi
echo # newline
read -p $'\e[31mStage file bump changes?\e[0m: ' -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo # newline
    git status
    read -p $'\e[31mUndo these updates?\e[0m: ' -n 1 -r
    echo # newline
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    else
        git restore .
        exit 0
    fi
else
    echo # newline
    git add .
    git commit -m "release ${curr} → ${ver}"
fi
echo # newline
read -p $'\e[31mPush to origin now?\e[0m: ' -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
else
    echo # newline
    git push --set-upstream origin $branch
    printDgBnr "Congratulations! ${branch} is queuing up for deployment!"
fi
