/**
 * Responsive Layout Fix
 * Ensures proper layout and alignment across different screen sizes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply header and navigation fixes
    applyHeaderFixes();
    
    // Apply section heading alignment fixes
    applySectionHeadingFixes();
    
    // Handle window resize events
    window.addEventListener('resize', handleWindowResize);
    
    // Initial call to set correct layout based on current screen size
    handleWindowResize();
    
    // Fix floating button position on mobile
    fixFloatingButtonPosition();
});

/**
 * Apply fixes to the header and navigation
 */
function applyHeaderFixes() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navMenu = document.querySelector('.nav-menu');
    
    if (header) {
        // Ensure header has proper z-index and position
        header.style.zIndex = '1000';
        
        // Add box shadow to header for better visibility
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    if (logo) {
        // Ensure logo is properly aligned
        logo.style.display = 'flex';
        logo.style.alignItems = 'center';
    }
    
    if (navMenu) {
        // Ensure navigation menu is properly spaced
        navMenu.style.gap = '1.5rem';
    }
}

/**
 * Apply fixes to section headings
 */
function applySectionHeadingFixes() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        // Center align section headers
        header.style.textAlign = 'center';
        header.style.marginBottom = '3rem';
        
        // Style section headings
        const heading = header.querySelector('h2');
        if (heading) {
            heading.style.marginBottom = '0.75rem';
            heading.style.lineHeight = '1.2';
        }
        
        // Style section subheadings
        const subheading = header.querySelector('p');
        if (subheading) {
            subheading.style.maxWidth = '600px';
            subheading.style.margin = '0 auto';
            subheading.style.color = '#666';
        }
    });
}

/**
 * Handle window resize events
 */
function handleWindowResize() {
    const windowWidth = window.innerWidth;
    
    // Apply specific fixes based on screen size
    if (windowWidth >= 1200) {
        // Desktop layout
        applyDesktopLayout();
    } else if (windowWidth >= 768 && windowWidth < 1200) {
        // Tablet layout
        applyTabletLayout();
    } else {
        // Mobile layout
        applyMobileLayout();
    }
    
    // Update header padding
    updateHeaderPadding();
}

/**
 * Apply desktop-specific layout fixes
 */
function applyDesktopLayout() {
    const logo = document.querySelector('.logo h1');
    const navMenu = document.querySelector('.nav-menu');
    
    if (logo) {
        logo.style.fontSize = '1.75rem';
    }
    
    if (navMenu) {
        const navItems = navMenu.querySelectorAll('li a');
        navItems.forEach(item => {
            item.style.fontSize = '1.05rem';
        });
    }
    
    // Adjust container padding
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.padding = '0 30px';
    });
}

/**
 * Apply tablet-specific layout fixes
 */
function applyTabletLayout() {
    const logo = document.querySelector('.logo h1');
    const navMenu = document.querySelector('.nav-menu');
    
    if (logo) {
        logo.style.fontSize = '1.5rem';
    }
    
    if (navMenu) {
        const navItems = navMenu.querySelectorAll('li a');
        navItems.forEach(item => {
            item.style.fontSize = '0.95rem';
        });
    }
    
    // Adjust container padding
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.padding = '0 20px';
    });
}

/**
 * Apply mobile-specific layout fixes
 */
function applyMobileLayout() {
    const logo = document.querySelector('.logo h1');
    
    if (logo) {
        logo.style.fontSize = '1.35rem';
    }
    
    // Adjust container padding
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.padding = '0 15px';
    });
    
    // Ensure mobile navigation is properly displayed
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.style.display = 'block';
    }
}

/**
 * Fix floating button position on mobile
 */
function fixFloatingButtonPosition() {
    const floatingButton = document.querySelector('.floating-book-btn');
    
    if (floatingButton) {
        if (window.innerWidth <= 768) {
            // Mobile positioning
            floatingButton.style.bottom = '80px';
            floatingButton.style.right = '50%';
            floatingButton.style.transform = 'translateX(50%)';
            floatingButton.style.zIndex = '999';
        } else {
            // Desktop positioning
            floatingButton.style.bottom = '30px';
            floatingButton.style.right = '30px';
            floatingButton.style.transform = 'none';
        }
    }
}

/**
 * Update body padding to account for fixed header
 */
function updateHeaderPadding() {
    const header = document.querySelector('header');
    
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
    }
} 