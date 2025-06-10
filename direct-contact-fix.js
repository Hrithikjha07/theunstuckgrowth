// Direct fix for contact navigation issues
(function() {
    // Execute immediately
    console.log("Applying direct contact tab fix");
    
    // Override the existing function
    window.openContactTab = function(e) {
        if (e) {
            e.preventDefault();
        }
        
        console.log("Contact tab function triggered");
        
        // First scroll to the client stories section
        const clientStoriesSection = document.getElementById('client-stories');
        if (clientStoriesSection) {
            console.log("Found client stories section, scrolling...");
            clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
            
            // Force the tab click immediately and again after a delay to ensure it works
            tryClickContactTab();
            
            // Try multiple times with increasing delays to ensure it works
            setTimeout(tryClickContactTab, 300);
            setTimeout(tryClickContactTab, 700);
            setTimeout(tryClickContactTab, 1200);
        } else {
            console.error("Client stories section not found");
        }
    };
    
    function tryClickContactTab() {
        // Find the contact tab button
        const contactTabBtn = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
        if (contactTabBtn) {
            console.log("Found contact tab, clicking...");
            contactTabBtn.click();
            
            // Also manually show the tab content in case click doesn't work
            showContactTabContent();
        } else {
            console.error("Contact tab button not found");
        }
    }
    
    function showContactTabContent() {
        // Hide all tab panes
        const allTabPanes = document.querySelectorAll('.client-stories-tabs .tab-content .tab-pane');
        allTabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Show contact tab pane
        const contactTabPane = document.getElementById('contact-tab');
        if (contactTabPane) {
            contactTabPane.classList.add('active');
            contactTabPane.style.display = 'block';
            console.log("Contact tab activated manually");
        }
    }
    
    // Override all contact links with direct navigation
    document.addEventListener('DOMContentLoaded', function() {
        // Fix all contact links when page loads
        fixAllContactLinks();
        
        // Fix navigation tab buttons
        fixClientStoryTabButtons();
    });
    
    // Run immediately as well in case DOM is already loaded
    fixAllContactLinks();
    
    function fixAllContactLinks() {
        // Target all contact links
        const contactLinks = document.querySelectorAll('a.contact-link, a[href="contact.html"], a[href="#contact-tab"]');
        
        contactLinks.forEach(link => {
            // Remove existing click listeners
            const newLink = link.cloneNode(true);
            if (link.parentNode) {
                link.parentNode.replaceChild(newLink, link);
            }
            
            // Add our direct navigation function
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                openContactTab(e);
            });
            
            // Update href to be consistent
            newLink.href = "#client-stories";
            newLink.classList.add('contact-link');
            
            console.log("Fixed contact link:", newLink);
        });
    }
    
    function fixClientStoryTabButtons() {
        // Make sure tab buttons work correctly
        const tabButtons = document.querySelectorAll('.client-stories-tabs .tab-btn');
        
        tabButtons.forEach(button => {
            // Clone to remove existing listeners
            const newButton = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newButton, button);
            }
            
            // Add direct tab switching
            newButton.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    if (btn !== newButton) { // Don't remove from this button
                        btn.classList.remove('active');
                    }
                });
                
                // Add active class to this button
                newButton.classList.add('active');
                
                // Get tab ID
                const tabId = newButton.getAttribute('data-tab');
                
                // Hide all tab panes
                const allTabPanes = document.querySelectorAll('.client-stories-tabs .tab-content .tab-pane');
                allTabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                });
                
                // Show selected tab pane
                const selectedPane = document.getElementById(tabId + '-tab');
                if (selectedPane) {
                    selectedPane.classList.add('active');
                    selectedPane.style.display = 'block';
                }
                
                console.log("Tab switched to:", tabId);
            });
        });
    }
})(); 