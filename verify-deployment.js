/**
 * Deployment Verification Script
 * 
 * This script checks if your website is accessible at various URLs
 * and provides information about any potential issues.
 */

console.log('🔍 Starting deployment verification...');

// URLs to check
const urls = [
  'https://hrithikjha07.github.io/theunstuckgrowth/',
  'https://theunstuckgrowth.com',
  'https://www.theunstuckgrowth.com'
];

// Function to check if a URL is accessible
async function checkUrl(url) {
  console.log(`\nChecking ${url}...`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(url, { 
      method: 'GET',
      mode: 'no-cors',
      headers: { 'User-Agent': 'Deployment-Verification-Script' }
    });
    const endTime = Date.now();
    
    console.log(`✅ Status: ${response.status} ${response.statusText}`);
    console.log(`⏱️ Response time: ${endTime - startTime}ms`);
    
    // Check for redirects
    if (response.redirected) {
      console.log(`🔄 Redirected to: ${response.url}`);
    }
    
    return {
      url,
      accessible: true,
      status: response.status,
      redirected: response.redirected,
      redirectUrl: response.redirected ? response.url : null
    };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return {
      url,
      accessible: false,
      error: error.message
    };
  }
}

// Main function
async function main() {
  console.log('=========================');
  console.log('DEPLOYMENT VERIFICATION');
  console.log('=========================');
  
  const results = [];
  
  for (const url of urls) {
    const result = await checkUrl(url);
    results.push(result);
  }
  
  // Summary
  console.log('\n=========================');
  console.log('VERIFICATION SUMMARY');
  console.log('=========================');
  
  const accessible = results.filter(r => r.accessible);
  console.log(`✅ Accessible URLs: ${accessible.length}/${urls.length}`);
  
  if (accessible.length === 0) {
    console.log('\n❌ CRITICAL: Your website is not accessible at any of the checked URLs.');
    console.log('\nPossible issues:');
    console.log('1. GitHub Pages is not properly configured');
    console.log('2. DNS records are not properly set up');
    console.log('3. Deployment is still in progress');
    
    console.log('\nRecommended actions:');
    console.log('1. Check GitHub Actions tab for deployment status');
    console.log('2. Verify GitHub Pages settings in repository settings');
    console.log('3. Check DNS configuration with your domain provider');
    console.log('4. Wait a few more minutes for deployment to complete');
    console.log('5. Try the Netlify deployment option as described in DEPLOYMENT_GUIDE.md');
  } else {
    console.log('\n✅ SUCCESS: Your website is accessible!');
  }
  
  console.log('\nFor detailed deployment instructions, see:');
  console.log('- DEPLOYMENT_GUIDE.md');
  console.log('- DNS_CONFIGURATION.md');
}

// Run the script
main().catch(error => {
  console.error('Script error:', error);
}); 