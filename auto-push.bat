@echo off
echo Starting auto-push process...
git add .
git commit -m "Auto-update: %date% %time%"
git push
echo Changes pushed successfully!
pause 