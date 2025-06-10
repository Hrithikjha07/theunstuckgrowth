@echo off
echo Running complete repository synchronization...

echo Step 1: Ensuring all local changes are committed
git add .
git commit -m "Complete synchronization with all changes"

echo Step 2: Fetching latest remote changes
git fetch origin

echo Step 3: Updating local branch with changes
git pull origin main --allow-unrelated-histories --no-edit

echo Step 4: Force pushing all changes to GitHub
git push -f origin main

echo Step 5: Verifying repository status
git status

echo Complete! Repository has been synchronized.
pause 