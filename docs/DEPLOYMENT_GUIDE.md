# Complete Deployment Guide for The Unstuck Growth

This guide provides multiple deployment options to ensure your website is published successfully.

## Option 1: GitHub Pages (Recommended)

### Step 1: Enable GitHub Pages
1. Go to your repository: https://github.com/Hrithikjha07/theunstuckgrowth
2. Click the "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Source", select "Deploy from a branch"
5. For "Branch", select "main" and folder "/ (root)" 
6. Click "Save"

### Step 2: Manual Workflow Trigger
1. Go to the "Actions" tab in your repository
2. Click on the "Deploy from docs folder" workflow
3. Click "Run workflow"
4. Select branch "main"
5. Click "Run workflow"

### Step 3: Check Deployment Status
1. Return to the "Pages" section in Settings
2. You should see a message saying "Your site is published at..."
3. The site will be available at both:
   - https://hrithikjha07.github.io/theunstuckgrowth/
   - https://theunstuckgrowth.com (after DNS configuration)

## Option 2: Custom Web Host Deployment

If GitHub Pages doesn't work for you, follow these steps:

### Step 1: Export the Site
1. Clone the repository to your local machine
2. The complete website files are in the root directory and the "docs" directory

### Step 2: Upload to Web Host
1. Log in to your web hosting control panel (cPanel, Plesk, etc.)
2. Use the File Manager or FTP to upload all files from the "docs" directory to:
   - For root domain: public_html/ or www/ directory
   - For subdirectory: public_html/subdirectory/

### Step 3: Configure Domain
1. Point your domain to your web host using their nameservers
2. No additional configuration needed as the site is static HTML/CSS/JS

## Option 3: Netlify Deployment (Fast & Easy)

### Step 1: Sign up for Netlify
1. Go to https://www.netlify.com/
2. Sign up for a free account

### Step 2: Deploy from GitHub
1. Click "Add new site" > "Import an existing project"
2. Select "GitHub" as your Git provider
3. Authorize Netlify to access your GitHub account
4. Select the "theunstuckgrowth" repository
5. Configure settings:
   - Build command: (leave empty)
   - Publish directory: docs
6. Click "Deploy site"

### Step 3: Configure Custom Domain
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter "theunstuckgrowth.com" and follow the instructions
4. Netlify will guide you through the DNS configuration process

## DNS Configuration

Regardless of which deployment method you choose, if you want to use a custom domain, follow the detailed instructions in [DNS_CONFIGURATION.md](DNS_CONFIGURATION.md).

## Troubleshooting

If you encounter issues:

1. **Check the site directly**: Try accessing https://hrithikjha07.github.io/theunstuckgrowth/
2. **Verify actions ran**: Check the "Actions" tab for any workflow errors
3. **DNS propagation**: Remember that DNS changes can take 24-48 hours to fully propagate
4. **Use the fallback page**: If all else fails, the docs/index.fallback.html file provides a simple landing page

## Need Help?

If you need further assistance, please contact:
- Open an issue on GitHub
- Email: unstuckgrowth@gmail.com 