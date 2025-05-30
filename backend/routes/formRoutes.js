const express = require('express');
const router = express.Router();

// GET all form submissions (for testing)
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Form API is working'
  });
});

// POST new form submission
router.post('/', (req, res) => {
  try {
    const formData = req.body;
    
    // Log the form submission (in a real app, we'd save to database)
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

module.exports = router; 