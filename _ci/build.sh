#!/bin/bash

printf "\033[0;33mInstalling Node packages...\033[0m\n"
cd front
npm ci
printf "\033[0;32mBuilding...\033[0m\n"
echo "Building the Frontend..."
npm run build