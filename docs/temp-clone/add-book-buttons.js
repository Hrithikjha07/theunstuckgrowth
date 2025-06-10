// Script to add "Book a Session" buttons to all service items
document.addEventListener('DOMContentLoaded', function() {
    // Get all service items that don't already have a path-cta button
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        // Check if this service item already has a path-cta
        if (!item.querySelector('.path-cta')) {
            // Create the button container
            const ctaDiv = document.createElement('div');
            ctaDiv.className = 'path-cta';
            
            // Create the button
            const bookButton = document.createElement('a');
            bookButton.href = 'https://topmate.io/swati12';
            bookButton.className = 'btn primary';
            bookButton.target = '_blank';
            bookButton.rel = 'noopener';
            bookButton.textContent = 'Book a Session';
            
            // Add the button to the container
            ctaDiv.appendChild(bookButton);
            
            // Add the container to the service item
            item.appendChild(ctaDiv);
        }
    });
    
    console.log('Added Book a Session buttons to all service items');
}); 