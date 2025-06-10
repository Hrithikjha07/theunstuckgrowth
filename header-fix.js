/**
 * Header Fix Script
 * Enhances header functionality across different screen sizes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get header elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Add scroll event for header styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on scroll position
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Initial call to set active link
    highlightNavOnScroll();
    
    // Update active link on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Fix header height on window resize
    function updateHeaderPadding() {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
    }
    
    // Initial call to set padding
    updateHeaderPadding();
    
    // Update padding on window resize
    window.addEventListener('resize', updateHeaderPadding);
    
    // Fix for iOS mobile navigation issues
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.documentElement.classList.add('ios-device');
        
        // Fix for iOS position:fixed issues
        const fixedElements = document.querySelectorAll('.page-navigation, .floating-book-btn, header');
        
        fixedElements.forEach(el => {
            el.addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
        });
    }
}); 