// Contact UI Fix - Implement the contact UI to match screenshot
(function() {
    // Execute when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Style contact tab to match others
        fixContactTabStyling();
        
        // Create contact info cards if they don't exist
        createContactInfoCards();
        
        // Ensure booking button is visible
        enhanceBookingButton();
        
        // Fix mobile navigation for contact
        fixMobileNavigation();
    });
    
    // Fix Contact Tab Styling
    function fixContactTabStyling() {
        // Find all tabs in client stories
        const tabs = document.querySelectorAll('.client-stories-tabs .tab-btn');
        
        // Apply consistent styling to all tabs
        tabs.forEach(tab => {
            // Style inactive tabs
            tab.style.backgroundColor = '#f0f0f0';
            tab.style.color = '#333';
            tab.style.padding = '8px 15px';
            tab.style.borderRadius = '20px';
            tab.style.margin = '0 5px';
            tab.style.border = 'none';
            tab.style.fontWeight = '500';
            
            // Add event listener to style active tab
            tab.addEventListener('click', function() {
                // Remove active styles from all tabs
                tabs.forEach(t => {
                    t.style.backgroundColor = '#f0f0f0';
                    t.style.color = '#333';
                });
                
                // Apply active styles to clicked tab
                this.style.backgroundColor = '#333';
                this.style.color = '#fff';
            });
        });
        
        // Check for active tab and style it
        const activeTab = document.querySelector('.client-stories-tabs .tab-btn.active');
        if (activeTab) {
            activeTab.style.backgroundColor = '#333';
            activeTab.style.color = '#fff';
        }
    }
    
    // Create Contact Info Cards
    function createContactInfoCards() {
        // Find the contact tab content
        const contactTab = document.getElementById('contact-tab');
        if (contactTab) {
            // Clear existing content if needed
            const existingForm = contactTab.querySelector('.contact-form-container');
            
            // Create a wrapper for the contact info cards
            const contactInfoSection = document.createElement('div');
            contactInfoSection.className = 'contact-info-section';
            
            // Create Location Card
            const locationCard = createInfoCard(
                'fas fa-map-marker-alt',
                'Location',
                'New York, USA with remote advisory worldwide'
            );
            
            // Create Email Card
            const emailCard = createInfoCard(
                'fas fa-envelope',
                'Email',
                'unstuckgrowth@gmail.com'
            );
            
            // Create Phone Card
            const phoneCard = createInfoCard(
                'fas fa-phone',
                'Phone',
                '+1 206 356 1265'
            );
            
            // Append cards to section
            contactInfoSection.appendChild(locationCard);
            contactInfoSection.appendChild(emailCard);
            contactInfoSection.appendChild(phoneCard);
            
            // Create Need Help Section
            const needHelpSection = document.createElement('div');
            needHelpSection.className = 'need-help-section';
            
            const needHelpTitle = document.createElement('h2');
            needHelpTitle.textContent = 'Need help with your project?';
            
            const needHelpText = document.createElement('p');
            needHelpText.textContent = 'Book a 30-minute consultation to discuss your needs and explore how we can support your growth journey.';
            
            needHelpSection.appendChild(needHelpTitle);
            needHelpSection.appendChild(needHelpText);
            
            // Insert content before JotForm if it exists
            if (existingForm) {
                contactTab.insertBefore(contactInfoSection, existingForm);
                contactTab.insertBefore(needHelpSection, existingForm);
            } else {
                contactTab.appendChild(contactInfoSection);
                contactTab.appendChild(needHelpSection);
            }
        }
    }
    
    // Helper function to create contact info card
    function createInfoCard(iconClass, title, value) {
        const card = document.createElement('div');
        card.className = 'contact-info-card';
        
        // Create icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        
        const iconCircle = document.createElement('div');
        iconCircle.className = 'icon-circle';
        
        const icon = document.createElement('i');
        icon.className = iconClass + ' icon';
        
        iconCircle.appendChild(icon);
        iconContainer.appendChild(iconCircle);
        
        // Create title
        const infoTitle = document.createElement('h3');
        infoTitle.className = 'info-title';
        infoTitle.textContent = title;
        
        // Create value
        const infoValue = document.createElement('p');
        infoValue.className = 'info-value';
        infoValue.textContent = value;
        
        // Append elements to card
        card.appendChild(iconContainer);
        card.appendChild(infoTitle);
        card.appendChild(infoValue);
        
        return card;
    }
    
    // Enhance booking button
    function enhanceBookingButton() {
        // Check if there's already a fixed booking button
        if (!document.querySelector('.book-session-btn')) {
            // Create new button
            const bookBtn = document.createElement('a');
            bookBtn.className = 'book-session-btn';
            bookBtn.id = 'bookSessionBtn';
            bookBtn.href = 'https://calendly.com/unstuckgrowth/30min';
            bookBtn.target = '_blank';
            bookBtn.rel = 'noopener';
            
            // Create icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-calendar-check';
            bookBtn.appendChild(icon);
            
            // Add text
            const text = document.createTextNode('Book a Session');
            bookBtn.appendChild(text);
            
            // Add to document
            document.body.appendChild(bookBtn);
        }
    }
    
    // Fix mobile navigation for contacts tab
    function fixMobileNavigation() {
        // Check if we're on mobile
        if (window.innerWidth <= 767) {
            // Create bottom navigation if it doesn't exist
            if (!document.querySelector('.bottom-nav')) {
                const bottomNav = document.createElement('nav');
                bottomNav.className = 'bottom-nav';
                
                // Define navigation items
                const navItems = [
                    { text: 'Services', icon: 'fa-briefcase', href: '#services' },
                    { text: 'Knowledge Hub', icon: 'fa-book', href: '#knowledge-hub' },
                    { text: 'Client Stories', icon: 'fa-comment', href: '#client-stories' },
                    { text: 'Contact', icon: 'fa-envelope', href: '#client-stories?tab=contact', class: 'contact-link' }
                ];
                
                // Create items
                navItems.forEach(item => {
                    const navItem = document.createElement('a');
                    navItem.className = 'bottom-nav-item';
                    if (item.class) {
                        navItem.classList.add(item.class);
                    }
                    navItem.href = item.href;
                    
                    const icon = document.createElement('i');
                    icon.className = `fas ${item.icon}`;
                    navItem.appendChild(icon);
                    
                    const text = document.createElement('span');
                    text.textContent = item.text;
                    navItem.appendChild(text);
                    
                    // Add click handler for Contact tab
                    if (item.text === 'Contact') {
                        navItem.addEventListener('click', function(e) {
                            e.preventDefault();
                            
                            // Navigate to client stories section
                            const clientStoriesSection = document.getElementById('client-stories');
                            if (clientStoriesSection) {
                                clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
                                
                                // Wait for scrolling to complete then click the contact tab
                                setTimeout(() => {
                                    const contactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
                                    if (contactTab) {
                                        contactTab.click();
                                    }
                                }, 500);
                            }
                        });
                    }
                    
                    bottomNav.appendChild(navItem);
                });
                
                document.body.appendChild(bottomNav);
            }
            
            // Add padding to body to account for fixed navigation
            document.body.style.paddingBottom = '60px';
        }
    }
})(); 