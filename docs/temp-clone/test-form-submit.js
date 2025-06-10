const http = require('http');

// Test data for form submission
const testData = {
  name: "Test User",
  email: "test@example.com",
  phone: "123-456-7890",
  message: "This is a test message from the automated test script"
};

// Options for the HTTP request
const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/forms',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('Sending test form submission to API...');
console.log('Test data:', testData);

// Make the HTTP request
const req = http.request(options, (res) => {
  let data = '';
  
  // Collect response data
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  // Process the response
  res.on('end', () => {
    console.log(`\nAPI Response Status: ${res.statusCode}`);
    
    try {
      const responseData = JSON.parse(data);
      console.log('Response Data:');
      console.log(JSON.stringify(responseData, null, 2));
      
      if (res.statusCode === 201) {
        console.log('\nForm submission test: SUCCESS');
      } else {
        console.log('\nForm submission test: FAILED');
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

// Handle request errors
req.on('error', (error) => {
  console.error('Error sending request:', error.message);
});

// Send the request with the test data
req.write(JSON.stringify(testData));
req.end(); 