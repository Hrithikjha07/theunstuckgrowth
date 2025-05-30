// Script to ensure hero buttons are visible
document.addEventListener('DOMContentLoaded', function() {
    // Fix for hero buttons
    const fixHeroButtons = function() {
        // Get all buttons in the hero section
        const heroButtons = document.querySelectorAll('.hero .cta-buttons .btn');
        
        // Apply styles to each button
        heroButtons.forEach(button => {
            button.style.display = 'inline-block';
            button.style.visibility = 'visible';
            button.style.opacity = '1';
            
            // Add specific styles based on button type
            if (button.classList.contains('primary')) {
                button.style.backgroundColor = '#333';
                button.style.color = 'white';
                button.style.fontWeight = '600';
            } else if (button.classList.contains('secondary')) {
                button.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                button.style.color = 'white';
                button.style.border = '2px solid white';
                button.style.fontWeight = '600';
                button.style.textShadow = '0px 0px 3px rgba(0, 0, 0, 0.5)';
            }
        });
        
        // Specifically target the Calendly button
        const calendlyButton = document.querySelector('.hero .cta-buttons .btn[href*="calendly.com"]');
        if (calendlyButton) {
            calendlyButton.style.display = 'inline-block';
            calendlyButton.style.visibility = 'visible';
            calendlyButton.style.opacity = '1';
            calendlyButton.style.cursor = 'pointer';
            calendlyButton.style.backgroundColor = '#333';
            calendlyButton.style.border = 'none';
            calendlyButton.style.fontWeight = '600';
            calendlyButton.style.textShadow = 'none';
        }
        
        // Specifically target the Topmate button
        const topmateButton = document.querySelector('.hero .cta-buttons .btn[href*="topmate.io"]');
        if (topmateButton) {
            topmateButton.style.display = 'inline-block';
            topmateButton.style.visibility = 'visible';
            topmateButton.style.opacity = '1';
            topmateButton.style.backgroundColor = '#333';
            topmateButton.style.border = 'none';
            topmateButton.style.fontWeight = '600';
            topmateButton.style.textShadow = 'none';
        }
    };
    
    // Run the fix immediately
    fixHeroButtons();
    
    // Also run after a slight delay to ensure it works after any other scripts
    setTimeout(fixHeroButtons, 500);
    setTimeout(fixHeroButtons, 1000);
    setTimeout(fixHeroButtons, 2000);
    
    // Add additional run after page is fully loaded
    window.addEventListener('load', fixHeroButtons);
}); 