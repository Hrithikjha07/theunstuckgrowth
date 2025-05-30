/**
 * Testimonial Fix - Fixes the Read More functionality for testimonials
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix testimonial read more functionality
    fixTestimonialReadMore();
});

/**
 * Fix the Read More functionality for testimonials
 */
function fixTestimonialReadMore() {
    // Override the existing functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        // Remove any existing event listeners (using cloneNode)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add our new event listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the parent testimonial element
            const testimonial = this.closest('.testimonial');
            
            if (testimonial) {
                // Toggle the expanded class
                testimonial.classList.toggle('expanded');
                
                // Find the short and full testimonial paragraphs
                const shortText = testimonial.querySelector('.testimonial-short');
                const fullText = testimonial.querySelector('.testimonial-full');
                
                // Update button text and display the appropriate content
                if (testimonial.classList.contains('expanded')) {
                    // Expanded state
                    this.textContent = 'Read Less';
                    
                    // Hide short text
                    if (shortText) {
                        shortText.style.display = 'none';
                    }
                    
                    // Show full text
                    if (fullText) {
                        fullText.style.display = 'block';
                        setTimeout(() => {
                            fullText.style.opacity = '1';
                        }, 10);
                    }
                } else {
                    // Collapsed state
                    this.textContent = 'Read More';
                    
                    // Hide full text
                    if (fullText) {
                        fullText.style.opacity = '0';
                        setTimeout(() => {
                            fullText.style.display = 'none';
                        }, 300);
                    }
                    
                    // Show short text
                    if (shortText) {
                        shortText.style.display = 'block';
                    }
                }
            }
        });
    });
    
    console.log('Testimonial Read More functionality fixed');
} 