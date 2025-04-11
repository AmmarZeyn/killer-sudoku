#!/bin/bash

# Helper script for GitHub deployment
echo "GitHub Deployment Helper"
echo "========================"
echo

if [ ! -d .git ]; then
  echo "Error: This directory is not a Git repository."
  echo "Initialize Git first with: git init"
  exit 1
fi

# Check GitHub remote
if ! git remote -v | grep -q "github.com"; then
  echo "No GitHub remote found. Would you like to add one? (y/n)"
  read answer
  if [ "$answer" == "y" ]; then
    echo "Enter your GitHub username:"
    read username
    echo "Enter your repository name:"
    read repo
    git remote add origin "https://github.com/$username/$repo.git"
    echo "Remote added: https://github.com/$username/$repo.git"
  else
    echo "Skipping remote setup."
  fi
fi

# Build for GitHub Pages
echo "Building the project for GitHub Pages..."
./build-github.sh

# Check current branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "Warning: You are not on the main branch. GitHub Pages deploys from the main branch."
  echo "Would you like to switch to main? (y/n)"
  read answer
  if [ "$answer" == "y" ]; then
    git checkout main 2>/dev/null || git checkout -b main
    echo "Switched to main branch."
  fi
fi

# Add changes
echo "Adding changes to Git..."
git add .

# Commit changes
echo "Enter a commit message (or press Enter for default message):"
read commit_message
if [ -z "$commit_message" ]; then
  commit_message="Update for GitHub Pages deployment"
fi
git commit -m "$commit_message"

# Push to GitHub
echo "Would you like to push to GitHub now? (y/n)"
read answer
if [ "$answer" == "y" ]; then
  git push -u origin main
  echo "Changes pushed to GitHub."
  echo "Visit your repository settings to enable GitHub Pages if you haven't already."
  echo "Your site will be available at: https://yourusername.github.io/repository-name/"
else
  echo "Changes committed but not pushed. Run 'git push -u origin main' when ready."
fi

echo "Done!"