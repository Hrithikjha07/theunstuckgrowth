/**
 * Smartphone-specific fixes for UI/UX improvements
 * Handles various mobile-specific issues that can only be fixed with JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix for iOS viewport height issues (100vh problem)
    fixIOSViewportHeight();
    
    // Fix for better scrolling experience on mobile
    improveMobileScrolling();
    
    // Fix touch targets for better accessibility
    improveAccessibility();
    
    // Detect and optimize for different phone models
    optimizeForDeviceModel();
    
    // Fix any text overflow issues
    fixTextOverflow();
    
    // Handle orientation changes
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Initial orientation handling
    handleOrientationChange();
});

/**
 * Fixes the iOS 100vh viewport height issue
 * iOS treats 100vh as including the address bar, causing layout issues
 */
function fixIOSViewportHeight() {
    // Set CSS variable for the actual viewport height
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initially and update on resize
    setVH();
    window.addEventListener('resize', setVH);
}

/**
 * Improves scrolling experience on mobile devices
 */
function improveMobileScrolling() {
    // Add smooth scrolling only for non-iOS devices (iOS has its own smooth scrolling)
    if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Fix for common scroll issues on mobile
    document.addEventListener('touchmove', function(e) {
        // Allow default scrolling in most cases
        if (!e.target.closest('.modal, .dropdown')) {
            return true;
        }
    }, { passive: true });
}

/**
 * Improves accessibility for touch targets
 */
function improveAccessibility() {
    // Find all small touch targets and make them more accessible
    const smallTouchTargets = document.querySelectorAll('button, .btn, a, input[type="checkbox"], input[type="radio"]');
    
    smallTouchTargets.forEach(element => {
        // Check if the element is too small for touch
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.classList.contains('btn')) {
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';
                element.style.display = 'inline-flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        }
    });
}

/**
 * Handles orientation changes for better layout
 */
function handleOrientationChange() {
    const isLandscape = window.innerWidth > window.innerHeight;
    
    if (isLandscape && window.innerHeight < 500) {
        // We're in landscape on a small device, optimize UI
        document.body.classList.add('landscape-mobile');
        
        // Adjust hero section height to fit in landscape view
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.minHeight = 'auto';
            heroSection.style.height = 'auto';
        }
    } else {
        // We're in portrait or on a larger device
        document.body.classList.remove('landscape-mobile');
        
        // Reset hero section height
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.minHeight = '';
            heroSection.style.height = '';
        }
    }
}

/**
 * Optimizes the layout for specific device models
 */
function optimizeForDeviceModel() {
    const userAgent = navigator.userAgent;
    const iPhoneSE = /iPhone/.test(userAgent) && window.innerWidth <= 375;
    const iPhone8 = /iPhone/.test(userAgent) && window.innerWidth <= 414;
    const iPhoneX = /iPhone/.test(userAgent) && window.innerWidth >= 375 && window.innerHeight >= 812;
    
    if (iPhoneSE) {
        document.body.classList.add('iphone-se');
        
        // Specific fixes for iPhone SE
        document.querySelectorAll('.hero-title').forEach(el => {
            el.style.fontSize = '1.5rem';
        });
    }
    
    if (iPhoneX) {
        document.body.classList.add('notched-phone');
        
        // Add padding for the notch and home indicator
        document.body.style.paddingBottom = 'max(70px, env(safe-area-inset-bottom) + 70px)';
    }
}

/**
 * Fixes text overflow issues on small screens
 */
function fixTextOverflow() {
    if (window.innerWidth <= 480) {
        // Find elements that might have overflow issues
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .btn, .nav-item');
        
        headings.forEach(el => {
            // Check if the text might overflow
            if (el.scrollWidth > el.clientWidth) {
                // Reduce font size slightly
                const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                el.style.fontSize = `${currentSize * 0.9}px`;
                el.style.overflowWrap = 'break-word';
            }
        });
    }
} 