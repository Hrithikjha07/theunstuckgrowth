/**
 * Debug Testimonials - Script to help debug testimonial functionality
 */

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug Testimonials script loaded');
    
    // Check if testimonials exist
    const testimonials = document.querySelectorAll('.testimonial');
    console.log(`Found ${testimonials.length} testimonials`);
    
    // Check if read more buttons exist
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    console.log(`Found ${readMoreButtons.length} read more buttons`);
    
    // Check if testimonial-short and testimonial-full elements exist
    const shortTexts = document.querySelectorAll('.testimonial-short');
    const fullTexts = document.querySelectorAll('.testimonial-full');
    console.log(`Found ${shortTexts.length} short texts and ${fullTexts.length} full texts`);
    
    // Add direct click handlers to read more buttons
    readMoreButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}`);
        
        // Add a data attribute to help with debugging
        button.setAttribute('data-debug-id', `read-more-${index + 1}`);
        
        // Add direct click handler
        button.addEventListener('click', function(e) {
            console.log(`Button ${index + 1} clicked`);
            
            // Find the parent testimonial
            const testimonial = this.closest('.testimonial');
            console.log(`Testimonial found: ${testimonial !== null}`);
            
            if (testimonial) {
                // Toggle expanded class
                const wasExpanded = testimonial.classList.contains('expanded');
                testimonial.classList.toggle('expanded');
                console.log(`Testimonial expanded: ${!wasExpanded} → ${testimonial.classList.contains('expanded')}`);
                
                // Find short and full texts
                const shortText = testimonial.querySelector('.testimonial-short');
                const fullText = testimonial.querySelector('.testimonial-full');
                
                console.log(`Short text found: ${shortText !== null}`);
                console.log(`Full text found: ${fullText !== null}`);
                
                // Update display directly
                if (testimonial.classList.contains('expanded')) {
                    this.textContent = 'Read Less';
                    
                    if (shortText) shortText.style.display = 'none';
                    if (fullText) {
                        fullText.style.display = 'block';
                        fullText.style.opacity = '1';
                    }
                    
                    console.log('Set to expanded state');
                } else {
                    this.textContent = 'Read More';
                    
                    if (shortText) shortText.style.display = 'block';
                    if (fullText) {
                        fullText.style.opacity = '0';
                        fullText.style.display = 'none';
                    }
                    
                    console.log('Set to collapsed state');
                }
            }
        });
    });
    
    // Add a global helper function to toggle testimonials
    window.toggleTestimonial = function(index) {
        const testimonials = document.querySelectorAll('.testimonial');
        if (index >= 0 && index < testimonials.length) {
            const button = testimonials[index].querySelector('.read-more-btn');
            if (button) {
                button.click();
                return true;
            }
        }
        return false;
    };
    
    console.log('Debug setup complete. Use window.toggleTestimonial(index) to toggle testimonials.');
}); 