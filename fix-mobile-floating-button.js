/**
 * Fix Mobile Floating Button
 * Ensures the floating "Book a Session" button doesn't overlap with the navigation tabs on mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Function to fix the floating button position
    function fixFloatingButton() {
        const floatingBtn = document.querySelector('.floating-book-btn');
        
        if (floatingBtn) {
            console.log('Found floating button, applying mobile fixes');
            
            // Check if we're on mobile
            if (window.innerWidth <= 768) {
                // Move the button up to avoid overlapping with navigation tabs
                floatingBtn.style.bottom = '80px';
                floatingBtn.style.right = '50%';
                floatingBtn.style.transform = 'translateX(50%)';
                floatingBtn.style.zIndex = '999';
                
                // Style the button itself
                const bookNowBtn = floatingBtn.querySelector('.book-now-btn');
                if (bookNowBtn) {
                    bookNowBtn.style.padding = '10px 20px';
                    bookNowBtn.style.borderRadius = '30px';
                    bookNowBtn.style.fontSize = '14px';
                    bookNowBtn.style.display = 'flex';
                    bookNowBtn.style.alignItems = 'center';
                    bookNowBtn.style.justifyContent = 'center';
                    bookNowBtn.style.gap = '8px';
                }
            } else {
                // Reset styles for desktop
                floatingBtn.style.bottom = '';
                floatingBtn.style.right = '';
                floatingBtn.style.transform = '';
            }
        }
    }
    
    // Apply the fix immediately
    fixFloatingButton();
    
    // Also apply the fix when the window is resized
    window.addEventListener('resize', fixFloatingButton);
    
    // Apply the fix after a short delay to ensure it works after other scripts
    setTimeout(fixFloatingButton, 1000);
}); 