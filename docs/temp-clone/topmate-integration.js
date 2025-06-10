/**
 * Topmate.io Integration for The Unstuck Growth
 * 
 * This script handles integrating Topmate.io booking services into the website.
 * It handles replacing Calendly links, displaying service cards, and tracking analytics.
 */

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Topmate integration...');
  
  // Initialize Topmate services
  initializeTopmateServices();
  
  // Replace Calendly links with Topmate links
  replaceCalendlyLinks();
  
  // Add Topmate widget to contact section
  addTopmateWidget();
  
  // Add booking button
  addFloatingBookButton();
  
  // Enhance form submission success
  enhanceFormSuccess();
});

// Fetch and initialize Topmate services
async function initializeTopmateServices() {
  try {
    // Fetch services from our server endpoint
    const response = await fetch('/api/topmate-services');
    if (!response.ok) {
      throw new Error('Failed to fetch Topmate services');
    }
    
    const services = await response.json();
    
    // Store services in global variable for use in other functions
    window.topmateServices = services;
    
    // If we have a #booking-services section, populate it
    const bookingSection = document.getElementById('booking-services');
    if (bookingSection) {
      populateServiceCards(bookingSection, services);
    }
    
    return services;
  } catch (error) {
    console.error('Error initializing Topmate services:', error);
    return [];
  }
}

// Replace all Calendly links with Topmate links
function replaceCalendlyLinks() {
  // Find all links to Calendly that are not the main booking button
  const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]:not([href="https://calendly.com/unstuckgrowth/30min"])');
  
  calendlyLinks.forEach(link => {
    // Get parent element text to determine context
    const parent = link.closest('div') || link.parentElement;
    const context = parent ? parent.textContent.toLowerCase() : '';
    
    // Determine which service to link to based on context
    let serviceId = '314785'; // Default to intro call
    
    if (context.includes('startup') || context.includes('founder')) {
      serviceId = '314788'; // Startup mentorship
    } else if (context.includes('resume') || context.includes('cv')) {
      serviceId = '559781'; // Resume review
    } else if (context.includes('consult')) {
      serviceId = '559780'; // 1:1 Consultation
    }
    
    // Update the link attributes with tracking parameters
    const section = getParentSectionId(link);
    link.href = `/api/topmate-redirect/${serviceId}?source=${section}&referrer=calendly_replacement`;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.setAttribute('data-topmate-service', serviceId);
    
    // Add a small visual indicator that this is now a Topmate link
    const smallBadge = document.createElement('small');
    smallBadge.className = 'topmate-badge';
    smallBadge.innerHTML = ' <i class="fas fa-external-link-alt"></i>';
    smallBadge.style.opacity = '0.7';
    smallBadge.style.fontSize = '0.8em';
    smallBadge.style.marginLeft = '4px';
    link.appendChild(smallBadge);
  });
}

// Get the parent section ID for tracking
function getParentSectionId(element) {
  let current = element;
  while (current && current !== document.body) {
    if (current.id) {
      return current.id;
    }
    if (current.className && typeof current.className === 'string') {
      const classes = current.className.split(' ');
      const sectionClass = classes.find(cls => cls.includes('section') || cls.includes('-container'));
      if (sectionClass) {
        return sectionClass;
      }
    }
    current = current.parentElement;
  }
  return 'unknown';
}

// Add Topmate widget to contact section
function addTopmateWidget() {
  // Function disabled - widget removed from contact page
  return;
}

// Add floating book button for mobile
function addFloatingBookButton() {
  // Create the button
  const button = document.createElement('div');
  button.className = 'floating-book-btn';
  button.innerHTML = `
    <a href="https://topmate.io/swati12" target="_blank" rel="noopener">
      <i class="fas fa-calendar-alt"></i>
      <span>Book a Session</span>
    </a>
  `;
  
  // Style the button
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '100';
  button.style.display = 'none'; // Hide by default, will show on mobile
  
  // Style the link
  const link = button.querySelector('a');
  link.style.display = 'flex';
  link.style.alignItems = 'center';
  link.style.backgroundColor = 'var(--primary-color, #3498db)';
  link.style.color = 'white';
  link.style.padding = '0.75rem 1.25rem';
  link.style.borderRadius = '50px';
  link.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  link.style.textDecoration = 'none';
  link.style.transition = 'transform 0.2s ease';
  
  // Style the icon
  const icon = link.querySelector('i');
  icon.style.marginRight = '8px';
  
  // Add hover effect
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
  
  // Add to body
  document.body.appendChild(button);
  
  // Show only on mobile
  function updateButtonVisibility() {
    if (window.innerWidth <= 768) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }
  
  // Initial check and listen for resize
  updateButtonVisibility();
  window.addEventListener('resize', updateButtonVisibility);
  
  // Hide when footer is visible
  const footer = document.querySelector('footer');
  if (footer) {
    window.addEventListener('scroll', function() {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        button.style.display = 'none';
      } else if (window.innerWidth <= 768) {
        button.style.display = 'block';
      }
    });
  }
}

// Populate service cards in the booking section
function populateServiceCards(container, services) {
  if (!services || !services.length) return;
  
  // Create the services grid
  const servicesGrid = document.createElement('div');
  servicesGrid.className = 'services-grid';
  servicesGrid.style.display = 'grid';
  servicesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  servicesGrid.style.gap = '2rem';
  servicesGrid.style.marginTop = '3rem';
  
  // Add service cards
  services.forEach(service => {
    // Create card container
    const card = document.createElement('div');
    card.className = 'service-card';
    card.style.backgroundColor = '#fff';
    card.style.borderRadius = '12px';
    card.style.padding = '2rem';
    card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
    
    // Add best value tag if it's the mentorship package
    if (service.id === '314788') {
      const tag = document.createElement('div');
      tag.className = 'service-tag';
      tag.textContent = 'Best Value';
      tag.style.position = 'absolute';
      tag.style.top = '0';
      tag.style.right = '0';
      tag.style.backgroundColor = 'var(--primary-color, #3498db)';
      tag.style.color = 'white';
      tag.style.padding = '0.5rem 1rem';
      tag.style.fontSize = '0.8rem';
      tag.style.fontWeight = '600';
      tag.style.borderBottomLeftRadius = '8px';
      card.appendChild(tag);
      
      // Add a border to highlight this card
      card.style.border = '2px solid var(--primary-color, #3498db)';
    }
    
    // Icon based on service type
    let iconClass = 'fa-comments';
    if (service.tags.includes('startup')) iconClass = 'fa-rocket';
    if (service.tags.includes('resume')) iconClass = 'fa-file-alt';
    if (service.tags.includes('package')) iconClass = 'fa-briefcase';
    
    // Create card content
    card.innerHTML += `
      <div class="service-icon" style="width:60px;height:60px;border-radius:50%;background-color:var(--primary-light, #e8f4fc);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;">
        <i class="fas ${iconClass}" style="font-size:1.5rem;color:var(--primary-color, #3498db);"></i>
      </div>
      <h3 style="font-size:1.25rem;margin-bottom:0.75rem;font-weight:600;">${service.name}</h3>
      <p style="color:var(--text-medium, #555);margin-bottom:1.5rem;flex-grow:1;">${service.description}</p>
      <div style="display:flex;align-items:baseline;margin-bottom:1rem;">
        <span style="font-size:1.5rem;font-weight:700;color:var(--text-dark, #333);margin-right:0.5rem;">${service.price}</span>
        <span style="font-size:0.9rem;color:var(--text-medium, #555);">${service.duration}</span>
      </div>
      <a href="/api/topmate-redirect/${service.id}?source=booking-services&referrer=service_card" 
         class="service-link" 
         target="_blank" 
         rel="noopener"
         style="display:inline-flex;align-items:center;color:var(--primary-color, #3498db);font-weight:600;text-decoration:none;padding:0.5rem 0;"
         data-topmate-service="${service.id}">
        Book Now <i class="fas fa-arrow-right" style="margin-left:0.5rem;transition:transform 0.2s ease;"></i>
      </a>
    `;
    
    // Add hover effect to arrow
    const arrow = card.querySelector('.fa-arrow-right');
    card.querySelector('.service-link').addEventListener('mouseenter', function() {
      arrow.style.transform = 'translateX(3px)';
    });
    
    card.querySelector('.service-link').addEventListener('mouseleave', function() {
      arrow.style.transform = 'translateX(0)';
    });
    
    servicesGrid.appendChild(card);
  });
  
  // Add "View All Services" button
  const viewAllContainer = document.createElement('div');
  viewAllContainer.className = 'view-all-services';
  viewAllContainer.style.textAlign = 'center';
  viewAllContainer.style.marginTop = '3rem';
  
  const viewAllButton = document.createElement('a');
  viewAllButton.href = 'https://topmate.io/swati12';
  viewAllButton.className = 'btn secondary';
  viewAllButton.target = '_blank';
  viewAllButton.rel = 'noopener';
  viewAllButton.innerHTML = 'View All Services <i class="fas fa-external-link-alt"></i>';
  viewAllButton.style.display = 'inline-block';
  viewAllButton.style.padding = '0.75rem 1.5rem';
  viewAllButton.style.textDecoration = 'none';
  viewAllButton.style.borderRadius = '4px';
  viewAllButton.style.transition = 'all 0.3s ease';
  
  viewAllContainer.appendChild(viewAllButton);
  
  // Find the container to append these elements
  const sectionContainer = container.querySelector('.container');
  if (sectionContainer) {
    sectionContainer.appendChild(servicesGrid);
    sectionContainer.appendChild(viewAllContainer);
  } else {
    container.appendChild(servicesGrid);
    container.appendChild(viewAllContainer);
  }
}

// Enhance form submission success message
function enhanceFormSuccess() {
  // This function will be called after form success by overriding the showSuccessMessage 
  // function or attaching to form submit events
  const originalShowSuccessMessage = window.showSuccessMessage;
  
  if (typeof originalShowSuccessMessage === 'function') {
    // Override existing function
    window.showSuccessMessage = function(form) {
      // Create success message with Topmate booking option
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="font-size:2.5rem;color:var(--primary-color, #3498db);margin-bottom:1rem;"></i>
        <h3 style="font-size:1.5rem;margin-bottom:0.5rem;font-weight:600;">Thank you for reaching out!</h3>
        <p style="margin-bottom:1.5rem;">Your message has been received. We'll get back to you shortly.</p>
        <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #eee;">
          <a href="https://topmate.io/swati12" 
             class="btn primary" 
             target="_blank" 
             rel="noopener"
             style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;background-color:var(--primary-color, #3498db);color:white;text-decoration:none;border-radius:4px;font-weight:500;">
            Schedule Now <i class="fas fa-calendar-alt"></i>
          </a>
        </div>
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
    };
  }
  
  // Also attach to form submit events in case the original function isn't available
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      // This will only run if the form submission isn't handled elsewhere
      if (!e.defaultPrevented) {
        // After a delay to let regular form handling happen first
        setTimeout(() => {
          // Check if the form has been replaced with a success message
          if (!this.querySelector('.success-message') && !this.parentNode.querySelector('.success-message')) {
            // If no success message found, add our enhanced one
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            // Add the same HTML as above
            // ...
          }
        }, 500);
      }
    });
  });
}

// Add CSS styles to the page
function addTopmateStyles() {
  const styles = document.createElement('style');
  styles.innerHTML = `
    .topmate-badge {
      font-size: 0.8em;
      opacity: 0.7;
      margin-left: 5px;
    }
    
    .floating-book-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 100;
      display: none;
    }
    
    .floating-book-btn a {
      display: flex;
      align-items: center;
      background-color: var(--primary-color, #3498db);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-decoration: none;
      transition: transform 0.2s ease;
    }
    
    .floating-book-btn a:hover {
      transform: translateY(-3px);
    }
    
    .floating-book-btn i {
      margin-right: 8px;
    }
    
    @media screen and (max-width: 768px) {
      .floating-book-btn {
        display: block;
      }
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .service-card {
      background-color: #fff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .service-link:hover i {
      transform: translateX(3px);
    }
  `;
  
  document.head.appendChild(styles);
}

// Call style function
addTopmateStyles();

// Mock Topmate API integration
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for Topmate services
    const topmateServices = [
        {
            id: 'startup-advisory',
            title: 'Startup Advisory Session',
            description: 'Get strategic advice for your startup journey',
            duration: '60 minutes',
            price: '$120'
        },
        {
            id: 'product-review',
            title: 'Product Review & Feedback',
            description: 'Expert review of your product with actionable feedback',
            duration: '45 minutes',
            price: '$90'
        },
        {
            id: 'career-guidance',
            title: 'Career Guidance Session',
            description: 'Navigate your career path with expert guidance',
            duration: '60 minutes',
            price: '$100'
        }
    ];

    // Function to load Topmate services
    function loadTopmateServices() {
        const servicesContainer = document.getElementById('topmate-services');
        
        if (servicesContainer) {
            topmateServices.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="service-meta">
                        <span><i class="far fa-clock"></i> ${service.duration}</span>
                        <span><i class="far fa-money-bill-alt"></i> ${service.price}</span>
                    </div>
                    <a href="#contact" class="btn btn-primary">Book Now</a>
                `;
                servicesContainer.appendChild(serviceCard);
            });
        }
    }

    // Call function to load services
    loadTopmateServices();
}); 