# The Unstuck Growth Website

A professional website for career advisory and growth services.

## Features
- Responsive design
- Calendly integration for appointments
- Formspree for contact forms
- Topmate integration
- Modern UI/UX

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Hrithikjha07/theunstuckgrowth.git
cd theunstuckgrowth
```

2. Run a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve
```

3. Open in browser:
```
http://localhost:8000
```

## Automatic Updates to GitHub

### Option 1: Using Batch Script (Windows)
1. Double-click `auto-push.bat` in the project folder
2. It will automatically:
   - Add all changes
   - Commit with timestamp
   - Push to GitHub

### Option 2: Manual Commands
```bash
git add .
git commit -m "Your commit message"
git push
```

## Deployment

The site is deployed using GitHub Pages. To update the deployment:

1. Go to your repository settings
2. Navigate to "Pages" under "Code and automation"
3. Under "Source", select:
   - Branch: main
   - Folder: / (root)
4. Click "Save"

Your site will be available at: https://hrithikjha07.github.io/theunstuckgrowth/

## Integration Setup

### Calendly
- Calendly widget is integrated in the HTML
- Event type: 30-minute consultation
- URL: https://calendly.com/unstuckgrowth/30min

### Formspree
- Contact forms are configured to use Formspree
- Form ID: xrgwkykq

### Topmate
- Topmate integration is configured
- Username: swati12

## Contributing
1. Make your changes
2. Use auto-push.bat or manual git commands to update
3. Changes will be automatically deployed to GitHub Pages

## License
MIT License 