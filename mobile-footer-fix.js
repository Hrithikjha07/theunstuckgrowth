// Mobile footer navigation fix
(function() {
    // Execute immediately to fix the footer navigation
    console.log('Applying mobile footer navigation fix');

    // Function to create a fixed footer navigation on mobile
    function createMobileFooterNav() {
        // Only add the footer navigation on mobile devices
        if (window.innerWidth > 767) {
            return;
        }

        console.log('Creating mobile footer navigation');

        // Check if the footer navigation already exists
        if (document.querySelector('.mobile-footer-nav')) {
            return;
        }

        // Create the footer navigation element
        const footerNav = document.createElement('div');
        footerNav.className = 'mobile-footer-nav footer-nav footer-tabs';
        footerNav.style.display = 'flex';
        footerNav.style.justifyContent = 'space-around';
        footerNav.style.alignItems = 'center';
        footerNav.style.width = '100%';
        footerNav.style.padding = '10px 5px';
        footerNav.style.backgroundColor = '#fff';
        footerNav.style.borderTop = '1px solid #eaeaea';
        footerNav.style.position = 'fixed';
        footerNav.style.bottom = '0';
        footerNav.style.left = '0';
        footerNav.style.zIndex = '999';
        footerNav.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)';

        // Create the navigation items
        const navItems = [
            { text: 'Services', href: '#services', icon: 'fa-cogs' },
            { text: 'Knowledge Hub', href: '#knowledge-hub', icon: 'fa-book' },
            { text: 'Client Stories', href: '#client-stories', icon: 'fa-users' },
            { text: 'Contact', href: '#client-stories?tab=contact', icon: 'fa-envelope', class: 'contact-link' }
        ];

        // Add the navigation items to the footer
        navItems.forEach(item => {
            const navItem = document.createElement('a');
            navItem.href = item.href;
            navItem.className = 'nav-item ' + (item.class || '');
            navItem.style.flex = '1';
            navItem.style.textAlign = 'center';
            navItem.style.fontSize = '14px';
            navItem.style.color = '#333';
            navItem.style.textDecoration = 'none';
            navItem.style.padding = '8px 0';
            navItem.style.display = 'flex';
            navItem.style.flexDirection = 'column';
            navItem.style.alignItems = 'center';
            navItem.style.justifyContent = 'center';

            // Create the icon
            const icon = document.createElement('i');
            icon.className = 'fas ' + item.icon;
            icon.style.fontSize = '20px';
            icon.style.marginBottom = '5px';
            
            // Create the text
            const text = document.createElement('span');
            text.textContent = item.text;
            
            // Add the icon and text to the navigation item
            navItem.appendChild(icon);
            navItem.appendChild(text);
            
            // Add special handling for contact link
            if (item.class && item.class.includes('contact-link')) {
                navItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (typeof openContactTab === 'function') {
                        openContactTab(e);
                    } else {
                        window.location.href = '#client-stories?tab=contact';
                    }
                });
            }
            
            // Add the navigation item to the footer
            footerNav.appendChild(navItem);
        });

        // Add the footer navigation to the page
        document.body.appendChild(footerNav);

        // Add padding to the body to account for the fixed footer
        document.body.style.paddingBottom = '70px';
        
        console.log('Mobile footer navigation created');
    }

    // Create the mobile footer navigation
    createMobileFooterNav();

    // Re-create the footer navigation on window resize
    window.addEventListener('resize', function() {
        const existingNav = document.querySelector('.mobile-footer-nav');
        if (window.innerWidth <= 767) {
            if (!existingNav) {
                createMobileFooterNav();
            }
        } else {
            if (existingNav) {
                existingNav.remove();
                document.body.style.paddingBottom = '0';
            }
        }
    });
    
    // Function to handle the book session button
    function fixBookSessionButton() {
        // Find existing buttons
        const existingButtons = document.querySelectorAll('.book-session-btn, .floating-book-btn');
        
        // If on mobile and no book session button exists, create one
        if (window.innerWidth <= 767 && existingButtons.length === 0) {
            const bookButton = document.createElement('a');
            bookButton.href = 'https://calendly.com/unstuckgrowth/30min';
            bookButton.className = 'book-session-btn';
            bookButton.target = '_blank';
            bookButton.rel = 'noopener';
            bookButton.style.position = 'fixed';
            bookButton.style.bottom = '80px';
            bookButton.style.left = '50%';
            bookButton.style.transform = 'translateX(-50%)';
            bookButton.style.zIndex = '998';
            bookButton.style.padding = '10px 20px';
            bookButton.style.borderRadius = '30px';
            bookButton.style.backgroundColor = '#333';
            bookButton.style.color = 'white';
            bookButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            bookButton.style.textAlign = 'center';
            bookButton.style.textDecoration = 'none';
            bookButton.style.fontWeight = 'bold';
            bookButton.style.border = 'none';
            bookButton.style.display = 'flex';
            bookButton.style.alignItems = 'center';
            bookButton.style.justifyContent = 'center';
            bookButton.style.gap = '8px';
            bookButton.style.fontSize = '14px';
            
            // Add the icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-calendar-check';
            
            // Add the text
            const text = document.createElement('span');
            text.textContent = 'Book a Session';
            
            // Add the icon and text to the button
            bookButton.appendChild(icon);
            bookButton.appendChild(text);
            
            // Add the button to the page
            document.body.appendChild(bookButton);
        }
    }
    
    // Fix the book session button
    fixBookSessionButton();
    
    // Re-fix the book session button on window resize
    window.addEventListener('resize', fixBookSessionButton);
})(); 