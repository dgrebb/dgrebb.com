#!/bin/bash
source $directory/_scripts/functions.sh

cd $directory/../
config="_utils/_cliff/config.toml"
git cliff -c $config --unreleased
