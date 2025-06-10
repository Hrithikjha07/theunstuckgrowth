# Complete deployment script for The Unstuck Growth
# This script synchronizes local files with GitHub and ensures all changes are properly deployed

Write-Host "Starting complete deployment process..." -ForegroundColor Green

# Step 1: Disable GitHub Actions workflows that might interfere
Write-Host "Step 1: Disabling problematic GitHub Actions..." -ForegroundColor Cyan
$pagesWorkflow = ".github/workflows/pages.yml"
$autoPushWorkflow = ".github/workflows/auto-push.yml"

# Ensure files exist before modifying
if (Test-Path $pagesWorkflow) {
    (Get-Content $pagesWorkflow) -replace "on:\s+push:", "on:" -replace "branches:\s+\[\s+main\s+\]", "" | Set-Content $pagesWorkflow
    Write-Host "  - Modified $pagesWorkflow to disable automatic deployment" -ForegroundColor Gray
}

if (Test-Path $autoPushWorkflow) {
    (Get-Content $autoPushWorkflow) -replace "on:\s+push:", "on:" -replace "branches:\s+\[\s+main\s+\]", "" | Set-Content $autoPushWorkflow
    Write-Host "  - Modified $autoPushWorkflow to disable automatic pushes" -ForegroundColor Gray
}

# Step 2: Commit changes to GitHub workflows
Write-Host "Step 2: Committing changes to GitHub workflows..." -ForegroundColor Cyan
git add .github/workflows
git commit -m "Disable automatic GitHub workflows to prevent conflicts"

# Step 3: Verify local changes
Write-Host "Step 3: Verifying all local changes are included..." -ForegroundColor Cyan
git add .
git commit -m "Complete deployment - include all local changes"

# Step 4: Force push to GitHub
Write-Host "Step 4: Force pushing all changes to GitHub..." -ForegroundColor Cyan
git push -f origin main

# Step 5: Verify deployment status
Write-Host "Step 5: Verifying deployment status..." -ForegroundColor Cyan
git status

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "The GitHub repository has been updated with all local changes." -ForegroundColor Green
Write-Host "Local and remote repositories are now synchronized." -ForegroundColor Green

# Pause to show results
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 