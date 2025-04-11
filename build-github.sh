#!/bin/bash

# Script to build the GitHub Pages version of the site
echo "Building for GitHub Pages..."
npx vite build --config vite.github.config.ts

echo "Build complete! Files are in dist/client directory."