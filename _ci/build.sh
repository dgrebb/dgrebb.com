#!/bin/bash

echo "Building..."
cd front
npm ci
npm run build
gh run cancel npm-build