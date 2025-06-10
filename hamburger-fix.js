// Fix for hamburger menu and contact tab integration
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on any nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
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