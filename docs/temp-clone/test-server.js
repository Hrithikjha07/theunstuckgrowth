const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const formRoutes = require('./backend/routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('./'));

// API routes
app.use('/api/forms', formRoutes);

// Default route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
}); 