#!/bin/bash

printf "\033[0;33mInstalling Node packages...\033[0m\n"
cd front
pnpm i
printf "\033[0;32mBuilding...\033[0m\n"
pnpm build
