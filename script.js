document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize service cards
    initServiceCards();
    
    // Initialize file upload functionality
    initializeFileUpload();
    
    // Set up quick contact actions for mobile
    if (window.innerWidth <= 767) {
        setupQuickContactActions();
    }
    
    // Initialize read more buttons for testimonials
    initReadMoreButtons();
    
    // Initialize smooth scroll page navigation
    initSmoothScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back-to-top button
    initBackToTop();
    
    // Initialize page navigation for mobile
    initPageNavigation();
    
    // Setup "View All Testimonials" button functionality
    const viewAllTestimonialsBtn = document.querySelector('.view-all-testimonials');
    if (viewAllTestimonialsBtn) {
        viewAllTestimonialsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to client-stories section
            const clientStoriesSection = document.getElementById('client-stories');
            if (clientStoriesSection) {
                clientStoriesSection.scrollIntoView({ behavior: 'smooth' });
                
                // Activate the testimonials tab
                setTimeout(() => {
                    const testimonialTab = document.querySelector('.client-stories-tabs .tab-btn[data-tab="testimonials"]');
                    if (testimonialTab) {
                        testimonialTab.click();
                    }
                }, 500); // Wait for scrolling to finish
            }
        });
    }
    
    // Mobile Quick Contact Banner functionality
    const mobileQuickContact = document.querySelector('.mobile-quick-contact');
    if (!mobileQuickContact) return;
    
    // Show/hide the quick contact banner based on scroll direction
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Minimum scroll amount before showing/hiding
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't do anything if we're at the top or bottom of the page
        if (scrollTop <= 0 || (window.innerHeight + scrollTop) >= document.body.offsetHeight) return;
        
        // Check if we've scrolled enough to trigger a state change
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide the quick contact
                mobileQuickContact.style.transform = 'translateY(100%)';
            } else {
                // Scrolling up - show the quick contact
                mobileQuickContact.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }
    });
    
    // Add active state for buttons on touch
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('touchstart', function() {
            this.classList.add('active');
        });
        
        action.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
        
        // Prevent getting stuck in active state if touch is moved away
        action.addEventListener('touchmove', function() {
            this.classList.remove('active');
        });
        
        // Handle click for the message action to scroll to contact form
        if (action.getAttribute('href') === '#contact') {
            action.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    // Smooth scroll to contact section
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on the first form input after scrolling
                    setTimeout(() => {
                        const firstInput = contactSection.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }, 1000);
                }
            });
        }
    });
    
    // Check if we should show the quick contact banner based on viewport size
    function checkMobileView() {
        if (window.innerWidth <= 768) {
            mobileQuickContact.style.display = 'block';
            mobileQuickContact.style.transform = 'translateY(0)';
        } else {
            mobileQuickContact.style.display = 'none';
        }
    }
    
    // Initialize on load and update on resize
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    // Initialize About Section Tabs
    initAboutTabs();
    
    // Initialize Knowledge Hub Tabs
    initTabSystem('.knowledge-tabs .tab-btn', 'case-studies');
    
    // Initialize Client Stories Tabs
    initTabSystem('.client-stories-tabs .tab-btn', 'testimonials');
    
    // Pricing section now uses simple redirect instead of tabs
    // initTabSystem('.pricing .tab-nav .tab-btn', 'startup');
    
    // Initialize Impact Metrics Tabs
    initTabSystem('.impact-tabs .tab-btn', 'metrics');
    
    // Initialize Tab Trigger Links
    initTabTriggers();
    
    // Initialize all advisory navigations
    const advisoryNavs = document.querySelectorAll('.advisory-navigation');
    if (advisoryNavs.length > 0) {
        advisoryNavs.forEach(nav => {
            const parentContainer = nav.closest('.advisory-tabs');
            if (parentContainer) {
                const tabButtons = nav.querySelectorAll('.advisory-nav-btn');
                const tabPanes = parentContainer.querySelectorAll('.tab-pane');
                
                // Set initial state - first button active, first pane visible
                if (tabButtons.length > 0 && tabPanes.length > 0) {
                    initAdvisoryTabs(nav);
                }
            }
        });
    }
    
    // Initialize Impact Metrics
    initImpactMetrics();
    
    // Initialize booking modal
    initBookingModal();
});

// Initialize Advisory Tabs
function initAdvisoryTabs(navigationContainer) {
    const buttons = navigationContainer.querySelectorAll('.advisory-nav-btn');
    const tabsContainer = navigationContainer.closest('.advisory-tabs');
    const tabPanes = tabsContainer.querySelectorAll('.tab-pane');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabId = this.getAttribute('data-tab');
            const tabSelector = '#' + tabId + '-tab';
            
            // Hide all tabs and show the selected one
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                // Add a slight delay before hiding to allow animation to complete
                setTimeout(() => {
                    if (!pane.classList.contains('active')) {
                        pane.style.display = 'none';
                    }
                }, 400);
            });
            
            const activeTab = tabsContainer.querySelector(tabSelector);
            if (activeTab) {
                activeTab.style.display = 'block';
                // Use setTimeout to ensure proper transition
                setTimeout(() => {
                    activeTab.classList.add('active');
                    
                    // Add a ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    ripple.style.position = 'absolute';
                    ripple.style.background = 'rgba(255,255,255,0.7)';
                    ripple.style.borderRadius = '50%';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple-effect 0.6s linear';
                    ripple.style.pointerEvents = 'none';
                    
                    // Calculate the position and size for the ripple
                    const size = Math.max(this.offsetWidth, this.offsetHeight);
                    ripple.style.width = ripple.style.height = `${size}px`;
                    
                    // Position the ripple in the center of the button
                    ripple.style.left = `${(this.offsetWidth / 2) - (size / 2)}px`;
                    ripple.style.top = `${(this.offsetHeight / 2) - (size / 2)}px`;
                    
                    // Add the ripple to the button
                    this.appendChild(ripple);
                    
                    // Remove the ripple after animation completes
                    setTimeout(() => {
                        ripple.remove();
                    }, 700);
                }, 50);
            }
        });
    });
}

// Initialize Tab Trigger Links
function initTabTriggers() {
    const tabTriggers = document.querySelectorAll('[data-tab-trigger]');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.getAttribute('data-tab-trigger');
            const tabsContainerSelector = this.getAttribute('data-target-container') || '.services-tabs';
            const tabsContainer = document.querySelector(tabsContainerSelector);
            
            if (tabsContainer) {
                // Find the corresponding tab button
                const tabButton = tabsContainer.querySelector(`.tab-btn[data-tab="${tabId}"]`);
                
                if (tabButton) {
                    // Trigger a click on the tab button
                    tabButton.click();
                }
            }
        });
    });
}

// Initialize Tab System
function initTabs() {
    const tabsContainers = document.querySelectorAll('.tab-nav, .advisory-navigation');
    
    tabsContainers.forEach(tabsContainer => {
        const tabBtns = tabsContainer.querySelectorAll('.tab-btn, .advisory-nav-btn');
        const isAdvisoryNav = tabsContainer.classList.contains('advisory-navigation');
        const parentContainer = isAdvisoryNav ? tabsContainer.closest('.advisory-tabs') : tabsContainer.closest('.services-tabs, .tabs-container');
        
        if (!parentContainer) return;
        
        const tabPanes = parentContainer.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the tab to show
                const tabId = this.getAttribute('data-tab');
                const tabSelector = '#' + tabId + '-tab';
                
                // Hide all tabs and show the selected one
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    // Add a slight delay before hiding to allow animation to complete
                    setTimeout(() => {
                        if (!pane.classList.contains('active')) {
                            pane.style.display = 'none';
                        }
                    }, 400);
                });
                
                const activeTab = parentContainer.querySelector(tabSelector);
                if (activeTab) {
                    activeTab.style.display = 'block';
                    // Use setTimeout to ensure proper transition
                    setTimeout(() => {
                        activeTab.classList.add('active');
                        
                        // If this is the advisory navigation, add a ripple effect
                        if (isAdvisoryNav) {
                            const ripple = document.createElement('span');
                            ripple.classList.add('ripple');
                            ripple.style.position = 'absolute';
                            ripple.style.background = 'rgba(255,255,255,0.7)';
                            ripple.style.borderRadius = '50%';
                            ripple.style.transform = 'scale(0)';
                            ripple.style.animation = 'ripple-effect 0.6s linear';
                            ripple.style.pointerEvents = 'none';
                            
                            // Calculate the position and size for the ripple
                            const size = Math.max(this.offsetWidth, this.offsetHeight);
                            ripple.style.width = ripple.style.height = `${size}px`;
                            
                            // Position the ripple in the center of the button
                            ripple.style.left = `${(this.offsetWidth / 2) - (size / 2)}px`;
                            ripple.style.top = `${(this.offsetHeight / 2) - (size / 2)}px`;
                            
                            // Add the ripple to the button
                            this.appendChild(ripple);
                            
                            // Remove the ripple after animation completes
                            setTimeout(() => {
                                ripple.remove();
                            }, 700);
                        }
                    }, 50);
                }
            });
        });
    });
}

// Add ripple effect animation to the CSS
document.addEventListener('DOMContentLoaded', function() {
    // Create a style element for the ripple animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes ripple-effect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            80% {
                transform: scale(1.5);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);
});

// Initialize Read More buttons for testimonials
function initReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testimonial = this.closest('.testimonial');
            testimonial.classList.toggle('expanded');
            
            if (testimonial.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset mobile menu button
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
            
            // Get target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Initialize back-to-top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile quick contact actions setup
function setupQuickContactActions() {
    const quickActions = document.querySelectorAll('.quick-actions a');
    
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            // Add active state for better touch feedback
            this.classList.add('active');
            
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
    });
}

// Function for file upload handling
function initializeFileUpload() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('resume');
    
    if (!dropArea || !fileInput) return;
    
    // Prevent default behavior (prevent file from being opened)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    // Unhighlight drop area when item is dragged out or dropped
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    // Trigger file browser when clicked
    dropArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle files from file input
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files[0]);
        }
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropArea.classList.add('highlighted');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlighted');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files[0]);
        }
    }
    
    function handleFiles(file) {
        if (validateFile(file)) {
            displayFilePreview(file);
        } else {
            alert('Please upload a valid PDF, DOC, or DOCX file under 5MB.');
        }
    }
    
    function validateFile(file) {
        // Check file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            return false;
        }
        
        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return false;
        }
        
        return true;
    }
    
    function displayFilePreview(file) {
        const preview = dropArea.querySelector('.file-preview');
        const fileName = preview.querySelector('.file-name');
        const filePrompt = dropArea.querySelector('.file-upload-prompt');
        
        fileName.textContent = file.name;
        preview.style.display = 'flex';
        filePrompt.style.display = 'none';
        
        const removeBtn = preview.querySelector('.remove-file');
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                fileInput.value = '';
                preview.style.display = 'none';
                filePrompt.style.display = 'block';
            });
        }
    }
}

// Function to handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get the form element
    const form = e.target;
    
    // Get the submit button and show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    console.log('Form submission started');
    
    try {
        // Create a new FormData object
        const formData = new FormData(form);
        const formDataObj = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        
        // Add timestamp
        formDataObj.submitted_at = new Date().toISOString();
        
        // Log form data (for debugging)
        console.log('Form data:', formDataObj);
        
        // Send email using EmailJS
        emailjs.send(window.emailjsServiceId, window.emailjsTemplateId, formDataObj)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showSuccessMessage(form);
                form.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                alert('There was an error submitting your form. Please try again or contact us directly.');
            })
            .finally(function() {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
            
    } catch (error) {
        console.error('Error in form submission:', error);
        alert('There was an error submitting your form. Please try again or contact us directly.');
        
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Show success message after form submission
function showSuccessMessage(form) {
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Thank you for reaching out!</h3>
        <p>Your message has been received. We'll get back to you shortly.</p>
    `;
    
    // Store original form content
    const originalForm = form.innerHTML;
    
    // Replace form with success message
    form.innerHTML = '';
    form.appendChild(successMessage);
    
    // Reset form and restore after 5 seconds if it's the newsletter form
    if (form.classList.contains('footer-newsletter')) {
        setTimeout(() => {
            form.innerHTML = originalForm;
            
            // Re-attach event listener
            form.addEventListener('submit', handleFormSubmit);
        }, 5000);
    }
}

// Show verification message (for first-time submissions)
function showVerificationMessage(form) {
    // Create verification message
    const verificationMessage = document.createElement('div');
    verificationMessage.className = 'success-message verification-message';
    verificationMessage.innerHTML = `
        <i class="fas fa-envelope"></i>
        <h3>One More Step!</h3>
        <p>Since this is your first submission, please check your email and confirm the form setup. This only happens once.</p>
        <p class="verification-note">After confirming, your message will be delivered automatically.</p>
    `;
    
    // Store original form content
    const originalForm = form.innerHTML;
    
    // Replace form with verification message
    form.innerHTML = '';
    form.appendChild(verificationMessage);
    
    // Add some styling
    verificationMessage.querySelector('.verification-note').style.fontSize = '0.9em';
    verificationMessage.querySelector('.verification-note').style.marginTop = '10px';
    verificationMessage.querySelector('.fas').style.color = '#ffa500';
    verificationMessage.querySelector('.fas').style.fontSize = '2em';
    
    // Reset form after 15 seconds
    setTimeout(() => {
        form.innerHTML = originalForm;
        
        // Re-attach event listener
        form.addEventListener('submit', handleFormSubmit);
    }, 15000);
}

// Add event listeners for form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.footer-newsletter');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleFormSubmit);
    }
});

// Initialize page navigation system for mobile
function initPageNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navSections = document.querySelectorAll('.nav-section');
    const navProgress = document.querySelector('.nav-progress');
    
    if (sections.length && navSections.length) {
        // Track scroll position to update active section
        window.addEventListener('scroll', function() {
            // Get current scroll position
            const scrollY = window.scrollY;
            
            // Calculate scroll progress for progress bar
            const pageHeight = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollY / pageHeight) * 100;
            
            // Update progress bar width
            if (navProgress) {
                navProgress.style.width = scrollProgress + '%';
            }
            
            // Find the current section
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Update active nav section
            navSections.forEach(nav => {
                nav.classList.remove('active');
                
                const navSection = nav.getAttribute('data-section');
                if (navSection === currentSection || 
                    (navSection === 'home' && currentSection === '')) {
                    nav.classList.add('active');
                    
                    // Scroll the active section into view in the navigation bar
                    nav.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            });
        });
        
        // Add click event listeners to navigation sections
        navSections.forEach(nav => {
            nav.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Quick Contact Banner
(function() {
  const quickContactBanner = document.querySelector('.mobile-quick-contact');
  if (!quickContactBanner) return;
  
  let lastScrollTop = 0;
  let isScrolling;
  
  window.addEventListener('scroll', function() {
    clearTimeout(isScrolling);
    
    isScrolling = setTimeout(function() {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show banner when scrolling up, hide when scrolling down
      if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
        // Scrolling down
        quickContactBanner.classList.add('hidden');
      } else {
        // Scrolling up
        quickContactBanner.classList.remove('hidden');
      }
      
      lastScrollTop = currentScrollTop;
    }, 66);
  });
  
  // Add noopener to external links
  const calendarLink = document.querySelector('.quick-action.calendar');
  if (calendarLink && calendarLink.getAttribute('target') === '_blank') {
    calendarLink.setAttribute('rel', 'noopener');
  }
})();

// Initialize Service Cards Toggle
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (window.innerWidth <= 767) {
        serviceCards.forEach(card => {
            const detailsList = card.querySelector('.service-details-list');
            const serviceLink = card.querySelector('.service-link');
            
            if (detailsList && serviceLink) {
                // Initially hide details on mobile
                detailsList.style.display = 'none';
                
                // Create toggle button
                const toggleBtn = document.createElement('button');
                toggleBtn.classList.add('toggle-details-btn');
                toggleBtn.innerHTML = 'Show Details <i class="fas fa-chevron-down"></i>';
                
                // Insert button before service link
                card.insertBefore(toggleBtn, serviceLink);
                
                // Add click event
                toggleBtn.addEventListener('click', function() {
                    const isHidden = detailsList.style.display === 'none';
                    detailsList.style.display = isHidden ? 'block' : 'none';
                    toggleBtn.innerHTML = isHidden 
                        ? 'Hide Details <i class="fas fa-chevron-up"></i>' 
                        : 'Show Details <i class="fas fa-chevron-down"></i>';
                });
            }
        });
    }
}

// Client Stories Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.client-stories-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.client-stories-tabs .tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId + '-tab');
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
    
    // Testimonial Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testimonial = this.closest('.testimonial');
            testimonial.classList.toggle('expanded');
            
            if (testimonial.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
    
    // Mini Contact Form Submission
    const contactMiniForm = document.querySelector('.contact-mini-form');
    if (contactMiniForm) {
        contactMiniForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            const formData = new FormData(this);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Show success message or reset form
            this.reset();
            alert('Thank you for your message! We will get back to you soon.');
        });
    }
});

// Initialize About Section Tabs
function initAboutTabs() {
    const tabButtons = document.querySelectorAll('.about-tab-btn');
    const tabPanes = document.querySelectorAll('.about-tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId + '-tab');
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Initialize Knowledge Hub Tabs
function initKnowledgeHubTabs() {
    const tabButtons = document.querySelectorAll('.knowledge-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.knowledge-tabs .tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId + '-tab');
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Initialize Impact Metrics
function initImpactMetrics() {
    // Get the metrics data
    const data = window.metricsData;
    
    // Update the UI with the data
    updateMetricsDisplay(data);
    
    // Function to animate counting up
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Update metrics display
    function updateMetricsDisplay(data) {
        // Update metric values with animation
        const metrics = data.metrics;
        
        // Minutes mentored
        updateMetricWithAnimation('minutes', metrics.minutes);
            
        // Bookings
        updateMetricWithAnimation('bookings', metrics.bookings);
            
        // Countries
        updateMetricWithAnimation('countries', metrics.countries);
    }
    
    // Update a single metric with animation
    function updateMetricWithAnimation(metricName, newValue) {
        const element = document.querySelector(`[data-metric="${metricName}"]`);
        if (!element) return;
        
        // Add updating animation
        element.classList.add('updating');
        
        // Current value
        const currentValue = parseInt(element.textContent, 10);
        
        // Animate to new value
        animateValue(element, currentValue, newValue, 1000);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('updating');
        }, 1200);
    }
}

// Admin Panel Toggle
document.addEventListener('keydown', function(event) {
    // Check for Shift+Alt+A key combination
    if (event.shiftKey && event.altKey && event.key === 'A') {
        const adminPanel = document.querySelector('.admin-note');
        if (adminPanel) {
            // Toggle the display property
            if (adminPanel.style.display === 'none' || adminPanel.style.display === '') {
                adminPanel.style.display = 'block';
                console.log('Admin panel shown');
            } else {
                adminPanel.style.display = 'none';
                console.log('Admin panel hidden');
            }
        }
    }
});

// Booking Functionality - Redirect to Topmate
function initBookingModal() {
    // Find any remaining booking buttons that haven't been converted to direct links
    const openButtons = document.querySelectorAll('.open-booking-modal, #openBookingModal');
    
    if (!openButtons.length) return;
    
    // Redirect to Topmate when any booking button is clicked
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://topmate.io/swati12', '_blank', 'noopener');
        });
    });
}