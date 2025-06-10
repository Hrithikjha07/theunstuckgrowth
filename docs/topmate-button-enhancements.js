/**
 * Topmate Button Enhancements
 * Adds interactive effects to "Join to Unlock" buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all "Join to Unlock" buttons that link to Topmate
    const unlockButtons = Array.from(document.querySelectorAll('a.btn.primary[href*="topmate.io"]'))
        .filter(button => button.textContent.trim() === 'Join to Unlock');
    
    if (unlockButtons.length === 0) {
        console.log('No "Join to Unlock" buttons found that link to Topmate');
        return;
    }
    
    console.log(`Found ${unlockButtons.length} "Join to Unlock" buttons linking to Topmate`);
    
    // Add extra attributes and event listeners to these buttons
    unlockButtons.forEach((button, index) => {
        // Add data attribute for tracking
        button.setAttribute('data-unlock-button', `unlock-button-${index + 1}`);
        
        // Add aria attributes for accessibility
        button.setAttribute('aria-label', 'Join to unlock premium content on Topmate');
        
        // Add tracking for analytics
        button.addEventListener('click', function(e) {
            // Don't block the navigation
            if (typeof gtag !== 'undefined') {
                gtag('event', 'unlock_button_click', {
                    'event_category': 'engagement',
                    'event_label': button.getAttribute('data-unlock-button'),
                    'value': 1
                });
            }
            
            // Add a visual feedback when clicked
            button.classList.add('clicked');
            
            // Store in localStorage that user has clicked this button
            try {
                const clickedButtons = JSON.parse(localStorage.getItem('clicked_unlock_buttons') || '[]');
                if (!clickedButtons.includes(button.getAttribute('data-unlock-button'))) {
                    clickedButtons.push(button.getAttribute('data-unlock-button'));
                    localStorage.setItem('clicked_unlock_buttons', JSON.stringify(clickedButtons));
                }
            } catch (e) {
                console.error('Error storing button click in localStorage', e);
            }
        });
        
        // Add hover animation
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Check if any buttons were previously clicked
    try {
        const clickedButtons = JSON.parse(localStorage.getItem('clicked_unlock_buttons') || '[]');
        clickedButtons.forEach(buttonId => {
            const button = document.querySelector(`[data-unlock-button="${buttonId}"]`);
            if (button) {
                button.classList.add('previously-clicked');
            }
        });
    } catch (e) {
        console.error('Error retrieving clicked buttons from localStorage', e);
    }
}); 