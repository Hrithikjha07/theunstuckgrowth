// Contact layout enhancement
(function() {
    console.log('Applying contact layout fix');
    
    // Function to enhance the contact tab content
    function enhanceContactTab() {
        // Only run when DOM is fully loaded
        if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
            document.addEventListener('DOMContentLoaded', enhanceContactTab);
            return;
        }
        
        // Get the contact tab content
        const contactTab = document.getElementById('contact-tab');
        
        // If we can't find the contact tab, abort
        if (!contactTab) {
            console.warn('Contact tab not found, cannot enhance layout');
            return;
        }
        
        console.log('Enhancing contact tab layout');
        
        // Create the contact info sections above the form
        const location = {
            title: 'Location',
            content: 'New York, USA with remote advisory worldwide',
            icon: 'fa-map-marker-alt'
        };
        
        const email = {
            title: 'Email',
            content: 'unstuckgrowth@gmail.com',
            icon: 'fa-envelope'
        };
        
        const phone = {
            title: 'Phone',
            content: '+1 206 356 1265',
            icon: 'fa-phone'
        };
        
        // Create container for contact info sections
        const contactInfoContainer = document.createElement('div');
        contactInfoContainer.className = 'contact-info-container';
        contactInfoContainer.style.marginBottom = '30px';
        
        // Add contact info sections
        const sections = [location, email, phone];
        sections.forEach((section, index) => {
            const sectionElement = createContactInfoSection(section, index);
            contactInfoContainer.appendChild(sectionElement);
        });
        
        // Add the need help section
        const needHelpSection = document.createElement('div');
        needHelpSection.className = 'need-help-section';
        needHelpSection.innerHTML = `
            <h2>Need personalized advice?</h2>
            <p>Book a 30-minute consultation to discuss your specific needs.</p>
            <a href="https://calendly.com/unstuckgrowth/30min" class="btn book-session-btn" target="_blank" rel="noopener">
                <i class="fas fa-calendar-check"></i> Book a Session
            </a>
        `;
        
        // Insert the contact info container before the form
        const contactFormContainer = contactTab.querySelector('.contact-form-container');
        if (contactFormContainer) {
            const contactTabContent = contactFormContainer.parentNode;
            contactTabContent.insertBefore(contactInfoContainer, contactFormContainer);
            contactTabContent.appendChild(needHelpSection);
        }
        
        console.log('Contact tab layout enhanced');
    }
    
    // Function to create a contact info section
    function createContactInfoSection(section, index) {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'contact-info-section';
        sectionElement.id = section.title.toLowerCase() + '-section';
        
        // Add section content
        sectionElement.innerHTML = `
            <div class="contact-icon-container">
                <i class="fas ${section.icon} contact-icon"></i>
            </div>
            <div class="contact-info-content">
                <h3>${section.title}</h3>
                <p>${section.content}</p>
            </div>
        `;
        
        // Add spacing between sections
        if (index > 0) {
            sectionElement.style.marginTop = '20px';
        }
        
        return sectionElement;
    }
    
    // Enhance the contact form styling
    function enhanceContactForm() {
        // Look for JotForm iframes
        const jotformIframes = document.querySelectorAll('iframe[id^="JotFormIFrame"]');
        jotformIframes.forEach(iframe => {
            // Make sure the iframe is properly styled
            iframe.style.borderRadius = '12px';
            iframe.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            iframe.style.border = 'none';
            
            // Try to add an icon to the form title
            try {
                iframe.addEventListener('load', () => {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const formTitle = iframeDoc.querySelector('.form-header-group');
                    
                    if (formTitle) {
                        const iconContainer = document.createElement('div');
                        iconContainer.className = 'jotform-icon-container';
                        iconContainer.innerHTML = `<div class="jotform-icon"><i class="fas fa-paper-plane"></i></div>`;
                        formTitle.parentNode.insertBefore(iconContainer, formTitle);
                    }
                });
            } catch (error) {
                console.warn('Failed to enhance JotForm:', error);
            }
        });
    }
    
    // Run functions to enhance contact layout
    enhanceContactTab();
    enhanceContactForm();
    
    // Make sure the layout is properly enhanced when tabs are clicked
    document.addEventListener('click', function(event) {
        if (event.target && (event.target.matches('.tab-btn[data-tab="contact"]') || 
            (event.target.parentNode && event.target.parentNode.matches('.tab-btn[data-tab="contact"]')))) {
            
            // Give a small delay to allow the tab to show
            setTimeout(enhanceContactTab, 100);
        }
    });

    // Also enhance when contact tab is accessed directly
    if (window.location.hash && window.location.hash.includes('tab=contact')) {
        setTimeout(enhanceContactTab, 500);
    }
})(); 