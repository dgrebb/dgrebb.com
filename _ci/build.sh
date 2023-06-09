#!/bin/bash

echo "Building..."
cd front
npm ci
npm run build
exit 0