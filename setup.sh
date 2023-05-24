#!/bin/bash
directoryx="$(dirname -- $(readlink -fn -- "$0"; echo x))"
directory="${directoryx%x}"
sudo ln -fs ${directory}/_utils/dg /usr/local/bin

#TODO: Install Changelog util
    # install cargo
    # `cargo install git-cliff`