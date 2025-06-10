// Final button fix script - runs after everything else
window.addEventListener('load', function() {
    // Wait for a moment to ensure all other scripts have run
    setTimeout(function() {
        // Get all buttons in the hero section
        const buttons = document.querySelectorAll('.hero .cta-buttons .btn');
        
        // Apply the same style to all buttons
        buttons.forEach(function(button) {
            // Set the style properties directly
            button.style.display = 'inline-block';
            button.style.backgroundColor = '#333';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '0.75rem 1.5rem';
            button.style.borderRadius = '4px';
            button.style.textDecoration = 'none';
            button.style.fontWeight = '600';
            button.style.marginRight = '10px';
            button.style.cursor = 'pointer';
            button.style.visibility = 'visible';
            button.style.opacity = '1';
            button.style.textShadow = 'none';
            button.style.boxShadow = 'none';
            button.style.position = 'relative';
            button.style.zIndex = '100';
        });
        
        // Specifically target the Calendly button
        const calendlyButton = document.querySelector('.hero .cta-buttons [href*="calendly.com"]');
        if (calendlyButton) {
            calendlyButton.style.backgroundColor = '#333';
            calendlyButton.style.color = 'white';
            calendlyButton.style.border = 'none';
            calendlyButton.style.display = 'inline-block';
            calendlyButton.style.visibility = 'visible';
            calendlyButton.style.opacity = '1';
        }
        
        // Specifically target the Topmate button
        const topmateButton = document.querySelector('.hero .cta-buttons [href*="topmate.io"]');
        if (topmateButton) {
            topmateButton.style.backgroundColor = '#333';
            topmateButton.style.color = 'white';
            topmateButton.style.border = 'none';
            topmateButton.style.display = 'inline-block';
            topmateButton.style.visibility = 'visible';
            topmateButton.style.opacity = '1';
        }
        
        console.log('Final button fix applied');
    }, 500);
}); 