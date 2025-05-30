// Immediate fix for hero buttons
(function() {
    // Function to fix the hero buttons
    function fixHeroButtons() {
        // Get the buttons
        const calendlyButton = document.querySelector('.hero .cta-buttons [href*="calendly.com"]');
        const topmateButton = document.querySelector('.hero .cta-buttons [href*="topmate.io"]');
        
        // Fix Calendly button
        if (calendlyButton) {
            calendlyButton.style.display = 'inline-block';
            calendlyButton.style.visibility = 'visible';
            calendlyButton.style.opacity = '1';
            calendlyButton.style.backgroundColor = '#333';
            calendlyButton.style.color = 'white';
            calendlyButton.style.border = 'none';
            calendlyButton.style.fontWeight = '600';
            calendlyButton.style.textShadow = 'none';
            calendlyButton.style.boxShadow = 'none';
            calendlyButton.style.zIndex = '100';
            calendlyButton.style.position = 'relative';
        }
        
        // Fix Topmate button
        if (topmateButton) {
            topmateButton.style.display = 'inline-block';
            topmateButton.style.visibility = 'visible';
            topmateButton.style.opacity = '1';
            topmateButton.style.backgroundColor = '#333';
            topmateButton.style.color = 'white';
            topmateButton.style.border = 'none';
            topmateButton.style.fontWeight = '600';
            topmateButton.style.textShadow = 'none';
            topmateButton.style.boxShadow = 'none';
            topmateButton.style.zIndex = '100';
            topmateButton.style.position = 'relative';
        }
    }
    
    // Run immediately
    fixHeroButtons();
    
    // Also run when DOM is loaded
    document.addEventListener('DOMContentLoaded', fixHeroButtons);
    
    // Run multiple times to ensure it works
    setTimeout(fixHeroButtons, 100);
    setTimeout(fixHeroButtons, 500);
    setTimeout(fixHeroButtons, 1000);
    setTimeout(fixHeroButtons, 2000);
    
    // Also run when window is loaded
    window.addEventListener('load', fixHeroButtons);
})(); 