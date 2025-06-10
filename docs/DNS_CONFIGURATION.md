# DNS Configuration for theunstuckgrowth.com

Follow these exact steps to configure your domain DNS records to work with GitHub Pages.

## Required DNS Records

### A Records
Add the following A records to point your apex domain (theunstuckgrowth.com) to GitHub's servers:

| Type | Host/Name | Value           | TTL    |
|------|-----------|-----------------|--------|
| A    | @         | 185.199.108.153 | 3600   |
| A    | @         | 185.199.109.153 | 3600   |
| A    | @         | 185.199.110.153 | 3600   |
| A    | @         | 185.199.111.153 | 3600   |

### CNAME Record
Add this CNAME record to ensure the www subdomain works:

| Type  | Host/Name | Value                       | TTL    |
|-------|-----------|----------------------------|--------|
| CNAME | www       | hrithikjha07.github.io    | 3600   |

## Step-by-Step Instructions

1. **Log in to your domain registrar**
   - Go to your domain provider's website (GoDaddy, Namecheap, etc.)
   - Log in to your account
   - Find the DNS management section for theunstuckgrowth.com

2. **Add the A Records**
   - Look for "Add new record" or similar option
   - Select record type: A
   - For Host/Name: enter @ (or leave blank, depending on your provider)
   - For Value/Points to: enter 185.199.108.153
   - For TTL: choose 3600 (or 1 hour)
   - Save the record
   - Repeat for all four IP addresses listed above

3. **Add the CNAME Record**
   - Select record type: CNAME
   - For Host/Name: enter www
   - For Value/Points to: enter hrithikjha07.github.io
   - For TTL: choose 3600 (or 1 hour)
   - Save the record

4. **Verify Your DNS Configuration**
   - DNS changes can take 24-48 hours to fully propagate
   - You can check propagation using online tools like:
     - https://dnschecker.org/
     - https://www.whatsmydns.net/
   - Or use command line:
     ```
     dig theunstuckgrowth.com +noall +answer
     ```

5. **Return to GitHub Pages Settings**
   - After DNS propagation, go back to:
     https://github.com/Hrithikjha07/theunstuckgrowth/settings/pages
   - Click "Check again" button to verify DNS configuration

## Troubleshooting

If you still see DNS errors after 48 hours:

1. **Verify records are correct** - Double-check all values exactly match
2. **Check for conflicting records** - Remove any conflicting CNAME, A, or ALIAS records
3. **Contact your domain registrar** - Some providers have specific requirements
4. **Use GitHub's troubleshooting guide**: 
   https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages

## Alternate Deployment Option

If you continue to face issues with the custom domain, you can still access the site at:
https://hrithikjha07.github.io/theunstuckgrowth/ 