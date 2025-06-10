/**
 * Back to Top Button Functionality
 * A clean implementation for smooth scrolling back to top
 */

// Back to top button functionality
function initBackToTop() {
    // Get the button (works with both class and id selectors)
    const backToTopButton = document.querySelector('.back-to-top') || document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    // Set initial state (hidden)
    backToTopButton.classList.remove('visible');
    
    // When the user scrolls down 300px from the top of the document, show the button
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Use smooth scrolling with fallbacks for cross-browser compatibility
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Fallback for browsers that don't support smooth scrolling
        if (typeof window.scrollTo !== 'function') {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
        
        return false;
    });
    
    // Trigger the scroll event once to set the initial state correctly
    window.dispatchEvent(new Event('scroll'));
}

// Initialize smooth scrolling for all anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip empty anchors
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset mobile menu button icon
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
            
            // Scroll to the target element with offset for fixed header
            const headerHeight = document.querySelector('header')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    initSmoothScroll();
}); 