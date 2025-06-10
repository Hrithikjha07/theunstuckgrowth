const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'API test endpoint is working',
    timestamp: new Date().toISOString()
  });
});

// Form submission endpoint
app.post('/api/forms', (req, res) => {
  try {
    const formData = req.body;
    console.log('Form submission received:', formData);
    
    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Form submitted successfully',
      data: {
        id: Date.now().toString(),
        ...formData
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process form submission'
    });
  }
});

// Root path - serve the test form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-form.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Test API server running on http://localhost:${PORT}`);
  console.log(`Test endpoints:`);
  console.log(`- GET http://localhost:${PORT}/api/test`);
  console.log(`- POST http://localhost:${PORT}/api/forms`);
  console.log(`- Test form: http://localhost:${PORT}/`);
}); 