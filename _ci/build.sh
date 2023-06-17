#!/bin/bash

echo "Installing Node packages..."
cd front
npm ci
echo "Building the Frontend..."
npm run build