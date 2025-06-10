// Mobile Navigation Improvements
(function() {
    // Execute when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Create mobile navigation if it doesn't exist
        createMobileNavigation();
        
        // Make the "Book a Session" button more mobile-friendly
        enhanceBookSessionButton();
        
        // Fix contact tab in client stories
        fixClientStoriesTabs();
        
        // Fix scrolling and elements below fixed navigation
        fixScrollingAndSpacing();
    });
    
    // Create mobile navigation footer
    function createMobileNavigation() {
        if (window.innerWidth <= 767 && !document.querySelector('.footer-navigation')) {
            const footerNav = document.createElement('div');
            footerNav.className = 'footer-navigation';
            
            // Define navigation items
            const navItems = [
                { text: 'Home', icon: 'fa-home', href: '#home' },
                { text: 'Services', icon: 'fa-briefcase', href: '#services' },
                { text: 'About', icon: 'fa-user', href: '#about' },
                { text: 'Stories', icon: 'fa-comment', href: '#client-stories' },
                { text: 'Contact', icon: 'fa-envelope', href: '#client-stories?tab=contact', class: 'contact-link' }
            ];
            
            // Create navigation links
            navItems.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href;
                
                if (item.class) {
                    link.classList.add(item.class);
                }
                
                // Add icon
                const icon = document.createElement('i');
                icon.className = `fas ${item.icon}`;
                link.appendChild(icon);
                
                // Add text
                const text = document.createElement('span');
                text.textContent = item.text;
                link.appendChild(text);
                
                // Add click handler for smoother navigation
                link.addEventListener('click', function(e) {
                    // Special handling for contact tab
                    if (item.text === 'Contact') {
                        e.preventDefault();
                        
                        const clientStoriesSection = document.getElementById('client-stories');
                        if (clientStoriesSection) {
                            clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
                            
                            setTimeout(() => {
                                const contactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
                                if (contactTab) {
                                    contactTab.click();
                                }
                            }, 500);
                        }
                    }
                });
                
                footerNav.appendChild(link);
            });
            
            // Append to body
            document.body.appendChild(footerNav);
            
            console.log('Mobile navigation created');
        }
    }
    
    // Enhance Book Session Button
    function enhanceBookSessionButton() {
        if (window.innerWidth <= 767) {
            // Find any "Book a Session" buttons/links
            const bookButtons = document.querySelectorAll('a[href*="calendly"], a[href*="topmate"], a:contains("Book")');
            
            // Create a new fixed position button if none of these exist
            if (bookButtons.length === 0 || !document.querySelector('.book-session-button')) {
                const bookBtn = document.createElement('a');
                bookBtn.className = 'book-session-button';
                bookBtn.href = 'https://calendly.com/unstuckgrowth/30min';
                bookBtn.target = '_blank';
                bookBtn.rel = 'noopener';
                
                // Add icon 
                const icon = document.createElement('i');
                icon.className = 'fas fa-calendar-check';
                bookBtn.appendChild(icon);
                
                // Add text
                const text = document.createTextNode('Book a Session');
                bookBtn.appendChild(text);
                
                document.body.appendChild(bookBtn);
                
                console.log('Book session button enhanced');
            }
        }
    }
    
    // Fix Client Stories Tabs
    function fixClientStoriesTabs() {
        const clientStoriesTabs = document.querySelector('.client-stories-tabs');
        if (clientStoriesTabs) {
            // Make tabs scrollable on mobile
            if (window.innerWidth <= 767) {
                const tabNav = clientStoriesTabs.querySelector('.tab-nav');
                if (tabNav) {
                    tabNav.style.overflowX = 'auto';
                    tabNav.style.display = 'flex';
                    tabNav.style.flexWrap = 'nowrap';
                    tabNav.style.webkitOverflowScrolling = 'touch';
                    tabNav.style.scrollbarWidth = 'none'; // Firefox
                    
                    // Add inline style to hide scrollbar in webkit browsers
                    const style = document.createElement('style');
                    style.textContent = '.client-stories-tabs .tab-nav::-webkit-scrollbar { display: none; }';
                    document.head.appendChild(style);
                }
                
                // Ensure all tabs have consistent styling
                const tabs = clientStoriesTabs.querySelectorAll('.tab-btn');
                tabs.forEach(tab => {
                    tab.style.whiteSpace = 'nowrap';
                    tab.style.flex = '0 0 auto';
                });
                
                console.log('Client stories tabs fixed for mobile');
            }
        }
    }
    
    // Fix scrolling and spacing issues
    function fixScrollingAndSpacing() {
        if (window.innerWidth <= 767) {
            // Add padding to body to account for fixed navigation
            document.body.style.paddingBottom = '80px';
            
            // Find the contact section and add proper spacing
            const contactSection = document.querySelector('.contact-section, #contact-tab');
            if (contactSection) {
                contactSection.style.marginBottom = '80px';
            }
            
            // Fix back-to-top button position
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                backToTop.style.bottom = '90px';
            }
            
            console.log('Fixed scrolling and spacing issues');
        }
    }
})(); 