#!/bin/bash
source $DGPATH/_scripts/functions.sh

cd $DGPATH/../
config="_utils/_cliff/config.toml"
git cliff -c $config --unreleased
