// Force redirect for contact.html to the proper tab
(function() {
    console.log("Force contact redirect script loaded");
    
    // Check if we're on the contact page (simple way to check)
    const isContactPage = window.location.pathname.toLowerCase().includes('contact.html');
    
    if (isContactPage) {
        console.log("Detected contact.html page, forcing redirect");
        window.location.href = "index.html#client-stories?tab=contact";
    }
    
    // Override any links to contact.html
    document.addEventListener('DOMContentLoaded', function() {
        // Find all links to contact.html
        const contactLinks = document.querySelectorAll('a[href="contact.html"], a[href="./contact.html"], a[href="/contact.html"]');
        
        contactLinks.forEach(link => {
            console.log("Found contact.html link, updating:", link);
            
            // Update href
            link.href = "index.html#client-stories?tab=contact";
            
            // Add click handler for good measure
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = "index.html#client-stories?tab=contact";
            });
        });
        
        // Also override any form submissions to contact.html
        const forms = document.querySelectorAll('form[action="contact.html"]');
        forms.forEach(form => {
            form.action = "index.html#client-stories?tab=contact";
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                window.location.href = "index.html#client-stories?tab=contact";
            });
        });
    });
})(); 