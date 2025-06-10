// Navigation Fix JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger menu and nav-menu elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavSections = document.querySelector('.nav-sections');

    // Reorder desktop navigation menu items
    if (navMenu) {
        // Define the correct order of navigation items
        const correctOrder = [
            { href: '#home', text: 'Home' },
            { href: '#about', text: 'About' },
            { href: '#services', text: 'Services' },
            { href: '#knowledge-hub', text: 'Knowledge Hub' },
            { href: '#client-stories', text: 'Client Stories' },
            { href: 'contact.html', text: 'Contact' }
        ];

        // Clear existing navigation items
        while (navMenu.firstChild) {
            navMenu.removeChild(navMenu.firstChild);
        }

        // Create new navigation items in the correct order
        correctOrder.forEach((item, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            if (index === 0) a.classList.add('active');
            li.appendChild(a);
            navMenu.appendChild(li);
        });
    }

    // Reorder mobile navigation items
    if (mobileNavSections) {
        // Define the correct order for mobile navigation
        const correctMobileOrder = [
            { href: '#top', text: 'Home', dataSection: 'home' },
            { href: '#about', text: 'About', dataSection: 'about' },
            { href: '#services', text: 'Services', dataSection: 'services' },
            { href: '#knowledge-hub', text: 'Knowledge Hub', dataSection: 'knowledge-hub' },
            { href: '#client-stories', text: 'Client Stories', dataSection: 'client-stories' },
            { href: 'contact.html', text: 'Contact', dataSection: null }
        ];

        // Clear existing mobile navigation items
        while (mobileNavSections.firstChild) {
            mobileNavSections.removeChild(mobileNavSections.firstChild);
        }

        // Create new mobile navigation items in the correct order
        correctMobileOrder.forEach((item, index) => {
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            if (index === 0) a.classList.add('active');
            if (item.dataSection) a.classList.add('nav-section');
            if (item.dataSection) a.setAttribute('data-section', item.dataSection);
            mobileNavSections.appendChild(a);
        });
    }

    // Add click event to hamburger menu
    hamburger.addEventListener('click', function() {
        // Toggle active class on hamburger and nav-menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add scroll event to add/remove scrolled class to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}); 