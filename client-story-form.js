import formbricks from './formbricks-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const clientStoryForm = document.getElementById('clientStoryContactForm');
    const fileInput = document.getElementById('file-upload');
    
    if (clientStoryForm) {
        clientStoryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(clientStoryForm);
            const formDataObj = {};
            
            // Convert FormData to JSON object
            formData.forEach((value, key) => {
                // Handle checkbox values
                if (key === 'newsletter') {
                    formDataObj[key] = value === 'on';
                } else {
                    formDataObj[key] = value;
                }
            });
            
            // Map form fields to match our backend model
            const submissionData = {
                name: formDataObj.name || formDataObj.fullName,
                email: formDataObj.email,
                phone: formDataObj.phone || '',
                subject: formDataObj.subject || 'Client Story Submission',
                message: formDataObj.message,
                newsletter: formDataObj.newsletter === true,
                formType: 'client-story'
            };
            
            try {
                // Show loading state
                const submitBtn = clientStoryForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                // Handle file upload
                const file = fileInput?.files[0];
                if (file) {
                    if (file.size > 5 * 1024 * 1024) { // 5MB limit
                        throw new Error('File size exceeds 5MB limit');
                    }
                    // Convert file to base64 for storage
                    const base64File = await convertFileToBase64(file);
                    submissionData.supportingDocs = base64File;
                    submissionData.fileName = file.name;
                }
                
                // Add timestamp
                submissionData.submitted_at = new Date().toISOString();
                
                // Submit to backend API
                const response = await fetch('/api/forms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Show success message
                    showSuccessMessage(clientStoryForm);
                    clientStoryForm.reset();
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showErrorMessage(clientStoryForm, error.message);
            } finally {
                // Reset button state
                const submitBtn = clientStoryForm.querySelector('button[type="submit"]');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Helper function to convert file to base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function showSuccessMessage(form) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Thank You!</h3>
        <p>Your message has been submitted successfully. We'll get back to you shortly.</p>
    `;
    
    // Insert success message after form
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(form, errorMsg) {
    // Remove any existing error messages
    const existingError = form.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.innerHTML = `
        <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <p>${errorMsg || 'Something went wrong. Please try again.'}</p>
    `;
    
    // Insert error message before form submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.parentNode.insertBefore(errorMessage, submitBtn);
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

/**
 * JotForm Integration - Client Stories
 * 
 * This script loads the JotForm iframe and handles any content security policy issues
 * that might occur when deploying to different platforms like GitHub Pages or Netlify.
 */

document.addEventListener('DOMContentLoaded', function() {
  const formContainer = document.getElementById('client-story-form-container');
  
  if (!formContainer) {
    console.error('Form container not found');
    return;
  }
  
  // Check if we're running on Netlify by looking for Netlify-specific headers
  const isNetlify = window.location.hostname.includes('netlify.app') || 
                   document.querySelector('meta[name="netlify"]') !== null;
  
  // Standard JotForm iframe embed
  const standardEmbed = `
    <iframe
      id="client-story-form"
      title="Client Story Form"
      src="https://form.jotform.com/232735220350346"
      frameborder="0"
      style="width: 100%; min-height: 900px; border: none;"
      scrolling="no"
    ></iframe>
  `;
  
  // Alternative JotForm embed with script approach (for Netlify)
  const scriptEmbed = `
    <script type="text/javascript" src="https://form.jotform.com/jsform/232735220350346"></script>
  `;
  
  // Use the appropriate embed code based on the platform
  formContainer.innerHTML = isNetlify ? scriptEmbed : standardEmbed;
  
  // Listen for messages from the JotForm iframe
  window.addEventListener('message', function(event) {
    if (event.origin === 'https://form.jotform.com') {
      // Handle JotForm height changes
      if (event.data.action === 'setHeight') {
        const form = document.getElementById('client-story-form');
        if (form) {
          form.style.height = event.data.height + 'px';
        }
      }
    }
  });
  
  // Add alternative loading message in case iframe fails to load
  setTimeout(function() {
    const iframe = document.getElementById('client-story-form');
    if (iframe && !iframe.contentWindow) {
      formContainer.innerHTML = `
        <div style="text-align: center; padding: 50px; border: 1px solid #eee; border-radius: 8px;">
          <h3>Form Loading Issue Detected</h3>
          <p>If you don't see the form, please try one of these options:</p>
          <p><a href="https://form.jotform.com/232735220350346" target="_blank" class="btn primary">Open Form in New Window</a></p>
          <p style="margin-top: 20px;">Or contact us directly at: <a href="mailto:unstuckgrowth@gmail.com">unstuckgrowth@gmail.com</a></p>
        </div>
      `;
    }
  }, 5000);
}); 