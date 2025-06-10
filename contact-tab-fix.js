// Direct Fix for Contact Tab Display
(function() {
    // Run immediately on script load
    console.log("Contact Tab Display Fix - loaded");
    
    // Execute this fix immediately
    fixContactTab();
    
    // Also run when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        fixContactTab();
        // Add listener for any dynamic content changes
        setupMutationObserver();
    });

    function fixContactTab() {
        console.log("Applying contact tab styling fix...");
        
        // Find all tabs in the client stories section
        const tabs = document.querySelectorAll('.client-stories-tabs .tab-btn');
        const contactTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="contact"]');
        
        if (!contactTab || !tabs.length) {
            console.log("Contact tab or tab container not found yet");
            return;
        }

        // 1. First ensure all tabs have consistent base styling
        tabs.forEach(tab => {
            tab.style.border = "none";
            tab.style.borderRadius = "20px";
            tab.style.margin = "0 5px 10px 0";
            tab.style.padding = "8px 15px";
            tab.style.fontSize = "14px";
            tab.style.fontWeight = "500";
            tab.style.background = "#f0f0f0";
            tab.style.color = "#333";
            tab.style.transition = "background-color 0.3s, color 0.3s";
            tab.style.cursor = "pointer";
            tab.style.outline = "none";
            
            // Remove any special styling that might have been applied
            tab.className = tab.className.replace(/\bspecial-style\b/g, "");
        });
        
        // 2. Apply active styling to currently active tab
        const activeTab = document.querySelector('.client-stories-tabs .tab-btn.active');
        if (activeTab) {
            activeTab.style.background = "#333";
            activeTab.style.color = "#fff";
        }
        
        // 3. Add click events to ensure proper styling on tab change
        tabs.forEach(tab => {
            // Clone to remove existing event listeners
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            newTab.addEventListener('click', function() {
                // Reset all tabs styling
                tabs.forEach(t => {
                    t.style.background = "#f0f0f0";
                    t.style.color = "#333";
                    t.classList.remove('active');
                });
                
                // Apply active styling to clicked tab
                this.style.background = "#333";
                this.style.color = "#fff";
                this.classList.add('active');
                
                // Handle tab content visibility
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}-tab`);
                
                if (tabContent) {
                    // Hide all tab content
                    const allTabContent = document.querySelectorAll('.tab-pane');
                    allTabContent.forEach(pane => {
                        pane.classList.remove('active');
                        pane.style.display = 'none';
                    });
                    
                    // Show selected tab content
                    tabContent.classList.add('active');
                    tabContent.style.display = 'block';
                }
            });
        });
        
        console.log("Contact tab styling fixed");
        
        // 4. Apply a specific style to force the contact tab to match others
        if (contactTab) {
            console.log("Applied specific styling to contact tab");
            contactTab.style.display = "inline-block";
            
            // Force it to match other tabs
            const firstTab = tabs[0];
            if (firstTab && firstTab !== contactTab) {
                contactTab.style.fontFamily = getComputedStyle(firstTab).fontFamily;
                contactTab.style.fontSize = getComputedStyle(firstTab).fontSize;
                contactTab.style.fontWeight = getComputedStyle(firstTab).fontWeight;
                contactTab.style.padding = getComputedStyle(firstTab).padding;
                contactTab.style.borderRadius = getComputedStyle(firstTab).borderRadius;
                contactTab.style.margin = getComputedStyle(firstTab).margin;
                contactTab.style.lineHeight = getComputedStyle(firstTab).lineHeight;
            }
        }
    }

    function setupMutationObserver() {
        // Create an observer to watch for DOM changes that might affect the tabs
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    fixContactTab();
                }
            });
        });

        // Start observing the document for DOM changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
})(); 