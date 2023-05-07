#!/bin/bash
directoryx="$(dirname -- $(readlink -fn -- "$0"; echo x))"
directory="${directoryx%x}"
sudo ln -fs ${directory}/utils/dg /usr/local/bin