/**
 * Instant Button Display
 * Ensures buttons are visible immediately without waiting for full page load
 */

// Execute immediately without waiting for DOMContentLoaded
(function() {
    // Immediate style injection for instant button visibility
    const style = document.createElement('style');
    style.textContent = `
        a.btn.primary[href*="topmate.io"] {
            opacity: 1 !important;
            visibility: visible !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #000000 !important;
            color: white !important;
            border: none !important;
            border-radius: 6px !important;
            padding: 12px 24px !important;
            font-weight: 600 !important;
            position: relative !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
        }
        
        /* Ensure buttons are shown immediately */
        .btn.primary {
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
    
    // Scan for buttons as soon as DOM elements become available
    const scanForButtons = () => {
        const buttons = document.querySelectorAll('a.btn.primary[href*="topmate.io"]');
        if (buttons.length > 0) {
            console.log(`Found ${buttons.length} Topmate buttons - ensuring visibility`);
            buttons.forEach(button => {
                button.style.display = 'inline-flex';
                button.style.visibility = 'visible';
                button.style.opacity = '1';
                
                // We're no longer adding emoji here as it's handled by CSS
                if (button.textContent.trim() === 'Join to Unlock') {
                    if (!button.getAttribute('data-processed')) {
                        button.setAttribute('data-processed', 'true');
                    }
                }
            });
        }
    };
    
    // Try immediately
    scanForButtons();
    
    // Also try after small delay (for dynamic content)
    setTimeout(scanForButtons, 100);
    setTimeout(scanForButtons, 500);
    
    // Also try at regular intervals to catch any dynamically added buttons
    const interval = setInterval(() => {
        scanForButtons();
        // Stop checking after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
    }, 1000);
})(); 