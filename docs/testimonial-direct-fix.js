/**
 * Direct Testimonial Fix - Ensures testimonial read more functionality works correctly
 * This script runs at the end of the body to override any conflicting scripts
 */

(function() {
    // Function to fix testimonial read more functionality
    function fixTestimonials() {
        console.log('Direct testimonial fix applied');
        
        // Get all read more buttons
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        console.log(`Found ${readMoreButtons.length} read more buttons`);
        
        // Remove existing event listeners by cloning and replacing each button
        readMoreButtons.forEach((button, index) => {
            // Clone the button to remove existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add our new event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`Button ${index + 1} clicked`);
                
                // Find the parent testimonial
                const testimonial = this.closest('.testimonial');
                
                if (testimonial) {
                    // Toggle expanded class
                    testimonial.classList.toggle('expanded');
                    
                    // Find short and full texts
                    const shortText = testimonial.querySelector('.testimonial-short');
                    const fullText = testimonial.querySelector('.testimonial-full');
                    
                    // Update display based on expanded state
                    if (testimonial.classList.contains('expanded')) {
                        // Change button text
                        this.textContent = 'Read Less';
                        
                        // Hide short text
                        if (shortText) {
                            shortText.style.display = 'none';
                        }
                        
                        // Show full text
                        if (fullText) {
                            fullText.style.display = 'block';
                            fullText.style.opacity = '1';
                        }
                        
                        console.log('Expanded testimonial');
                    } else {
                        // Change button text
                        this.textContent = 'Read More';
                        
                        // Show short text
                        if (shortText) {
                            shortText.style.display = 'block';
                        }
                        
                        // Hide full text
                        if (fullText) {
                            fullText.style.opacity = '0';
                            fullText.style.display = 'none';
                        }
                        
                        console.log('Collapsed testimonial');
                    }
                }
            });
        });
    }
    
    // Apply fix when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixTestimonials);
    } else {
        // DOM is already loaded, run the fix immediately
        fixTestimonials();
    }
    
    // Also apply fix after a short delay to ensure it overrides any other scripts
    setTimeout(fixTestimonials, 1000);
})(); 