// Tab parameter handler script
(function() {
    // Function to handle URL parameters
    function handleTabParameters() {
        try {
            // Get the URL hash (everything after the #)
            const hash = window.location.hash;
            
            // If we have a hash that contains ?tab=
            if (hash && hash.indexOf('?tab=') > -1) {
                // Parse the section and tab
                const section = hash.split('?')[0].replace('#', '');
                const params = new URLSearchParams(hash.split('?')[1]);
                const tabToActivate = params.get('tab');
                
                console.log(`Tab parameter detected: section=${section}, tab=${tabToActivate}`);
                
                // First scroll to the section
                const sectionElement = document.getElementById(section);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Wait for scrolling to complete
                    setTimeout(function() {
                        // Now activate the tab
                        if (tabToActivate) {
                            // Find the tab button
                            const tabButton = document.querySelector(`.${section}-tabs .tab-btn[data-tab="${tabToActivate}"]`);
                            if (tabButton) {
                                console.log(`Clicking tab: ${tabToActivate}`);
                                tabButton.click();
                            } else {
                                console.warn(`Tab button for ${tabToActivate} not found`);
                                
                                // Special handling for contact tab
                                if (tabToActivate === 'contact') {
                                    const clientStoriesContactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
                                    if (clientStoriesContactTab) {
                                        console.log('Found contact tab in client stories, clicking...');
                                        clientStoriesContactTab.click();
                                    }
                                }
                            }
                        }
                    }, 500);
                }
            }
        } catch (error) {
            console.error('Error handling tab parameters:', error);
        }
    }

    // Execute when DOM is loaded
    document.addEventListener('DOMContentLoaded', handleTabParameters);
    
    // Also execute immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        handleTabParameters();
    }
    
    // Handle hash changes (if user navigates using browser back/forward)
    window.addEventListener('hashchange', handleTabParameters);
})(); 