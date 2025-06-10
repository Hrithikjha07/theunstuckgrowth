// Fix for hamburger menu and contact tab integration
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
                
                // Add touch swipe detection to close menu
                let startX;
                navMenu.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                }, { passive: true });
                
                navMenu.addEventListener('touchend', function(e) {
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    // If swiped left (on right-aligned menu) or right (on left-aligned menu)
                    if (Math.abs(diff) > 50) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        body.style.overflow = '';
                    }
                }, { passive: true });
            } else {
                body.style.overflow = '';
            }
        });
        
        // Improve touch targets in mobile menu
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            // Make sure nav links have sufficient touch target size
            link.style.padding = '12px';
            link.style.display = 'block';
            
            // Close mobile menu when clicking on any nav link
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Add event listener for contact link in mobile menu
        const contactLink = document.querySelector('.nav-menu .contact-link');
        if (contactLink) {
            contactLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close the mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Scroll to client stories section
                const clientStoriesSection = document.getElementById('client-stories');
                if (clientStoriesSection) {
                    clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Wait for scrolling to complete before switching tabs
                    setTimeout(function() {
                        // Find the contact tab and click it
                        const contactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
                        if (contactTab) {
                            contactTab.click();
                        }
                    }, 700);
                }
            });
        }
    }
    
    // Fix for any link with class="contact-link"
    document.querySelectorAll('a.contact-link').forEach(link => {
        if (!link.hasAttribute('onclick')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to client stories section
                const clientStoriesSection = document.getElementById('client-stories');
                if (clientStoriesSection) {
                    clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Wait for scrolling to complete before switching tabs
                    setTimeout(function() {
                        // Find the contact tab and click it
                        const contactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
                        if (contactTab) {
                            contactTab.click();
                        }
                    }, 700);
                }
            });
        }
    });
}); 