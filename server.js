require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { google } = require('googleapis');
const fs = require('fs');
// const whatsappService = require('./whatsapp-service');
// Use CallMeBot instead for more reliable WhatsApp messages
const callmebot = require('./callmebot-service');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const crypto = require('crypto');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for users (in a production environment, use a proper database)
const users = [];
let nextUserId = 1;

// In-memory storage for password reset tokens
const resetTokens = new Map();

// In-memory storage for users (in a production environment, use a proper database)
const formSubmissions = [];
let nextFormId = 1;

// In-memory storage for file metadata
const fileAttachments = [];

// Middleware for security
// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Rate limiting
if (process.env.ENABLE_RATE_LIMIT === 'true') {
  const limiter = rateLimit({
    max: parseInt(process.env.MAX_REQUESTS_PER_IP || 100),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000), // 15 minutes
    message: 'Too many requests from this IP, please try again later'
  });
  app.use('/api/', limiter);
}

// Body parser, reading data from body
app.use(express.json({ 
  limit: '10kb',
  strict: true,
  // Add custom error handler for JSON parsing errors
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      console.error('JSON parsing error:', e.message);
      res.status(400).json({ 
        error: 'Invalid JSON in request body', 
        details: e.message 
      });
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Additional middleware to log request bodies for debugging
app.use((req, res, next) => {
  if (req.method === 'POST' && req.path.startsWith('/api/')) {
    console.log(`Request to ${req.path} with body:`, req.body);
  }
  next();
});

// Data sanitization against XSS
app.use(xss());

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'unstuck-growth-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Enforce HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Google Sheets Setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Load credentials and set up Google Sheets API
let sheetsAPI = null;
let usersSheetId = process.env.USERS_SHEET_ID || '1-your-users-sheet-id';
let formsSheetId = process.env.FORMS_SHEET_ID || '1-your-forms-sheet-id';

// Flag to track if we're using Google Sheets or fallback mode
let usingGoogleSheets = false;

async function setupGoogleSheets() {
  try {
    // Check if credentials file exists
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.log('Google Sheets credentials file not found. Using fallback storage mode.');
      return false;
    }
    
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: SCOPES,
    });
    
    const client = await auth.getClient();
    sheetsAPI = google.sheets({ version: 'v4', auth: client });
    console.log('Google Sheets API initialized');
    return true;
  } catch (error) {
    console.error('Error setting up Google Sheets:', error);
    return false;
  }
}

// Save user to Google Sheets or fallback to console logging
async function saveUserToSheet(user) {
  if (!usingGoogleSheets) {
    console.log('Fallback mode: User registration captured:', user.email);
    return;
  }
  
  if (!sheetsAPI) {
    console.error('Google Sheets API not initialized');
    return;
  }
  
  try {
    // Basic user data fields that all persona types have
    const userData = [
      user.id.toString(),
      user.fullName,
      user.email,
      user.phone,
      user.persona || 'default',
      user.experience || '',
      user.referral || '',
      user.newsletter ? 'Yes' : 'No',
      new Date().toISOString()
    ];
    
    // Add specific fields based on persona
    if (user.persona === 'young-entrepreneur') {
      userData.push(
        user.businessStage || '',
        user.industry || '',
        user.goals || '',
        user.challenges || ''
      );
    } else if (user.persona === 'startup-founder') {
      userData.push(
        user.companyStage || '',
        user.teamSize || '',
        user.fundingNeeds || ''
      );
    } else if (user.persona === 'product-manager') {
      userData.push(
        user.pmLevel || '',
        user.pmIndustry || '',
        user.pmGoals || ''
      );
    } else if (user.persona === 'career-changer') {
      userData.push(
        user.currentField || '',
        user.targetField || '',
        user.transitionTimeline || ''
      );
    } else if (user.persona === 'mba-applicant') {
      userData.push(
        user.targetSchools || '',
        user.applicationTimeline || '',
        user.applicationStage || ''
      );
    }
    
    // Append to users sheet
    await sheetsAPI.spreadsheets.values.append({
      spreadsheetId: usersSheetId,
      range: 'Users!A:Z', // Use wider range to accommodate all potential fields
      valueInputOption: 'RAW',
      resource: {
        values: [userData]
      }
    });
    
    console.log(`User ${user.fullName} (${user.persona}) saved to Google Sheets`);
  } catch (error) {
    console.error('Error saving user to Google Sheets:', error);
    // Don't throw, just log - we don't want to prevent user creation
  }
}

// Save form submission to Google Sheets or fallback to console logging
async function saveFormToSheet(form) {
  if (!usingGoogleSheets) {
    console.log('Fallback mode: Form submission captured:', form.email);
    return;
  }
  
  if (!sheetsAPI) {
    console.error('Google Sheets API not initialized');
    return;
  }
  
  try {
    // Form data
    const formData = [
      form.id.toString(),
      form.fullName,
      form.email,
      form.phone,
      form.persona || '',
      form.goals || '',
      form.timeframe || '',
      form.contentFormat ? form.contentFormat.join(", ") : '',
      form.additionalInfo || '',
      form.hasAttachments ? 'Yes' : 'No',
      form.referral || '',
      form.newsletter ? 'Yes' : 'No',
      new Date().toISOString()
    ];
    
    // Add specific fields based on persona
    if (form.persona === 'young-entrepreneur') {
      formData.push(
        form.age || '',
        form.businessStage || '',
        form.industry || '',
        form.challenges || ''
      );
    }
    // Add other persona-specific fields here
    
    // Append to forms sheet
    await sheetsAPI.spreadsheets.values.append({
      spreadsheetId: formsSheetId,
      range: 'Forms!A:Z', // Wide range to accommodate all fields
      valueInputOption: 'RAW',
      resource: {
        values: [formData]
      }
    });
    
    console.log(`Form from ${form.fullName} saved to Google Sheets`);
  } catch (error) {
    console.error('Error saving form to Google Sheets:', error);
  }
}

// Get user by email
function getUserByEmail(email) {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unstuck-growth-jwt-secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Email notification setup
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  },
  tls: {
    rejectUnauthorized: false // For development environments
  }
});

// Test email connection
emailTransporter.verify((error, success) => {
  if (error) {
    console.error('Email notification setup error:', error.message);
    console.log('Email notifications will be disabled');
  } else {
    console.log('Email server is ready to send notifications');
  }
});

// Replace Twilio setup with our WhatsApp service
// Comment out or remove Twilio code
// const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
//   ? require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
//   : null;
// const twilioEnabled = !!twilioClient;
// if (!twilioEnabled) {
//   console.log('Twilio not configured or invalid credentials - WhatsApp notifications will be disabled');
// }

// Initialize our WhatsApp service
let whatsappReady = false;

// Notification function
const sendNotifications = async (type, data) => {
  // Admin email to receive notifications
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@theunstuckgrowth.com';
  
  // Email notification
  let emailSent = false;
  try {
    // Check if email is configured
    if (emailTransporter) {
      let subject = '';
      let text = '';
      
      if (type === 'intake-form') {
        subject = 'New Advanced Intake Form Submission';
        text = `
          New intake form submission:
          Name: ${data.fullName}
          Email: ${data.email}
          Phone: ${data.phone}
          Persona: ${data.persona || 'Not specified'}
          Goals: ${data.goals || 'Not specified'}
          Timeframe: ${data.timeframe || 'Not specified'}
          Content Format: ${data.contentFormat ? data.contentFormat.join(", ") : 'Not specified'}
          Additional Info: ${data.additionalInfo || 'Not provided'}
          Referral Source: ${data.referral || 'Not specified'}
          Newsletter: ${data.newsletter ? 'Yes' : 'No'}
        `;
        
        // Add persona-specific information
        if (data.persona === 'young-entrepreneur') {
          text += `
          Age Range: ${data.age || 'Not specified'}
          Business Stage: ${data.businessStage || 'Not specified'}
          Industry: ${data.industry || 'Not specified'}
          Challenges: ${data.challenges || 'Not specified'}
          `;
        }
        // Add other persona-specific information here
      }
      // Keep other notification types if needed
      
      if (subject && text) {
        const emailResult = await emailTransporter.sendMail({
          from: process.env.EMAIL_USER || 'your-email@gmail.com',
          to: adminEmail,
          subject,
          text
        });
        
        console.log('Email notification sent:', emailResult.messageId);
        emailSent = true;
      }
    }
  } catch (error) {
    console.error('Email notification error:', error);
    console.log('Failed to send email notification');
  }
  
  // WhatsApp notification via CallMeBot
  let whatsappSent = false;
  try {
    // Check if CallMeBot service is configured
    if (callmebot.isConfigured()) {
      let message = '';
      
      if (type === 'intake-form') {
        message = `📋 New Intake Form: ${data.fullName} (${data.email}) - ${data.persona || 'General'} - Goal: ${data.goals.substring(0, 50)}${data.goals.length > 50 ? '...' : ''}`;
      }
      // Keep other notification types if needed
      
      if (message) {
        const whatsappResult = await callmebot.sendWhatsApp(process.env.ADMIN_PHONE, message);
        console.log('WhatsApp notification sent:', whatsappResult);
        whatsappSent = true;
      }
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error);
  }
  
  return { emailSent, whatsappSent };
};

// Validate Email
function isValidEmail(email) {
  return validator.isEmail(email);
}

// Validate Password Strength
function isStrongPassword(password) {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
}

// Validate Phone Number
function isValidPhone(phone) {
  return validator.isMobilePhone(phone, 'any', { strictMode: false });
}

// Generate Password Reset Token
function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Routes
// Register new user
app.post('/api/register', async (req, res) => {
  try {
    console.log('Registration request received:', JSON.stringify(req.body, null, 2));
    
    const { 
      fullName, 
      email, 
      phone, 
      password, 
      persona = 'default',
      // Common fields
      experience,
      referral,
      newsletter,
      // Young Entrepreneur fields
      businessStage,
      industry,
      goals,
      challenges,
      // Startup Founder fields
      companyStage,
      teamSize,
      fundingNeeds,
      // Product Manager fields
      pmLevel,
      pmIndustry,
      pmGoals,
      // Career Changer fields
      currentField,
      targetField,
      transitionTimeline,
      // MBA Applicant fields
      targetSchools,
      applicationTimeline,
      applicationStage
    } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      console.log('Registration validation failed - missing required fields');
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      console.log('Registration validation failed - invalid email format');
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    
    // Validate phone format
    if (!isValidPhone(phone)) {
      console.log('Registration validation failed - invalid phone format');
      return res.status(400).json({ error: 'Please provide a valid phone number' });
    }
    
    // Validate password strength
    if (!isStrongPassword(password)) {
      console.log('Registration validation failed - weak password');
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long and include lowercase, uppercase, number, and special character' 
      });
    }
    
    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      console.log('Registration failed - user already exists:', email);
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Hash password with higher salt rounds for better security
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with a simple ID
    const newUser = {
      id: nextUserId++,
      fullName,
      email,
      phone,
      password: hashedPassword,
      persona,
      experience,
      referral,
      newsletter: newsletter === true || newsletter === 'on',
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    // Add profile-specific data based on persona
    if (persona === 'young-entrepreneur') {
      newUser.businessStage = businessStage;
      newUser.industry = industry;
      newUser.goals = goals;
      newUser.challenges = challenges;
    } else if (persona === 'startup-founder') {
      newUser.companyStage = companyStage;
      newUser.teamSize = teamSize;
      newUser.fundingNeeds = fundingNeeds;
    } else if (persona === 'product-manager') {
      newUser.pmLevel = pmLevel;
      newUser.pmIndustry = pmIndustry;
      newUser.pmGoals = pmGoals;
    } else if (persona === 'career-changer') {
      newUser.currentField = currentField;
      newUser.targetField = targetField;
      newUser.transitionTimeline = transitionTimeline;
    } else if (persona === 'mba-applicant') {
      newUser.targetSchools = targetSchools;
      newUser.applicationTimeline = applicationTimeline;
      newUser.applicationStage = applicationStage;
    }
    
    console.log('New user created:', { 
      id: newUser.id, 
      email: newUser.email, 
      persona: newUser.persona,
      fields: Object.keys(newUser).filter(k => !['password', 'id'].includes(k))
    });
    
    // Add to in-memory users array
    users.push(newUser);
    console.log(`Total users in memory: ${users.length}`);
    
    // Save to Google Sheets
    try {
      await saveUserToSheet(newUser);
    } catch (sheetError) {
      console.error('Error saving user to Google Sheets:', sheetError);
      // Continue with user creation even if Google Sheets fails
    }
    
    // Send notifications
    let notificationResults = { emailSent: false, whatsappSent: false };
    try {
      notificationResults = await sendNotifications('signup', newUser);
    } catch (notificationError) {
      console.error('Error sending notifications:', notificationError);
      // Continue with user creation even if notifications fail
    }
    
    // Create token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, persona: newUser.persona },
      process.env.JWT_SECRET || 'unstuck-growth-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );
    
    console.log('Registration successful, returning response');
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        persona: newUser.persona
      },
      notificationResults
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration: ' + error.message });
  }
});

// Serve the universal signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request received:', { email });
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    
    console.log('User logged in successfully:', { id: user.id, email: user.email, persona: user.persona || 'default' });
    
    // Create token with persona information
    const token = jwt.sign(
      { id: user.id, email: user.email, persona: user.persona || 'default' },
      process.env.JWT_SECRET || 'unstuck-growth-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        persona: user.persona || 'default'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    googleSheets: sheetsAPI ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV
  });
});

// WhatsApp status endpoint - now returns CallMeBot service info
app.get('/api/whatsapp-status', (req, res) => {
  res.status(200).json({
    provider: 'CallMeBot API',
    setupInstructions: callmebot.getSetupInstructions()
  });
});

// Test WhatsApp notification - update to use CallMeBot
app.post('/api/test-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and message are required' 
      });
    }
    
    const result = await callmebot.sendWhatsApp(phone, message);
    
    if (result.success) {
      res.status(200).json({ 
        success: true, 
        message: 'WhatsApp message sent successfully via CallMeBot' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error || 'Failed to send WhatsApp message' 
      });
    }
  } catch (error) {
    console.error('Test WhatsApp error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error sending WhatsApp message' 
    });
  }
});

// WhatsApp test page
app.get('/whatsapp-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'whatsapp-test.html'));
});

// Create a simple reset-password.html page
app.get('/reset-password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'reset-password.html'));
});

// Serve error page
app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, 'error.html'));
});

// Catch-all route to serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
  
  // For API requests, return JSON error
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'Something went wrong on the server',
      status: 500
    });
  }
  
  // For non-API requests, redirect to error page
  const errorDetails = encodeURIComponent(err.message || 'Unexpected server error');
  res.redirect(`/error?code=500&message=Internal Server Error&details=${errorDetails}`);
});

// Routes
// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/intake-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'intake-form.html'));
});

// API Endpoints
// Handle intake form submissions
app.post('/api/intake-form', async (req, res) => {
  try {
    // Extract data from request
    const {
      fullName,
      email,
      phone,
      persona,
      goals,
      timeframe,
      contentFormat,
      additionalInfo,
      referral,
      newsletter,
      terms,
      // Additional fields for different personas
      age,
      businessStage,
      industry,
      challenges,
      // Add other fields as needed
    } = req.body;
    
    // Basic validation
    if (!fullName || !email || !phone || !goals) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Create form submission object
    const formSubmission = {
      id: nextFormId++,
      fullName,
      email,
      phone,
      persona,
      goals,
      timeframe,
      contentFormat: Array.isArray(contentFormat) ? contentFormat : contentFormat ? [contentFormat] : [],
      additionalInfo,
      referral,
      newsletter: !!newsletter,
      hasAttachments: false, // Will be updated if files are attached
      dateCreated: new Date().toISOString()
    };
    
    // Add persona-specific fields
    if (persona === 'young-entrepreneur') {
      formSubmission.age = age;
      formSubmission.businessStage = businessStage;
      formSubmission.industry = industry;
      formSubmission.challenges = challenges;
    }
    // Add other persona-specific field handling here
    
    // Save form submission to in-memory storage
    formSubmissions.push(formSubmission);
    
    // Save to Google Sheets if available
    await saveFormToSheet(formSubmission);
    
    // Send notifications
    await sendNotifications('intake-form', formSubmission);
    
    // Determine which Topmate service to recommend based on persona
    let recommendedService = '314785'; // Default to intro call
    
    if (persona === 'young-entrepreneur' || persona === 'startup-founder') {
      recommendedService = '314788'; // Startup mentorship package
    } else if (persona === 'career-changer') {
      recommendedService = '559781'; // Resume review
    }
    
    // Return success with Topmate recommendation
    return res.status(201).json({
      success: true,
      message: 'Your form has been submitted successfully. We will review your information and be in touch soon.',
      formId: formSubmission.id,
      topmate: {
        profileUrl: 'https://topmate.io/swati12',
        recommendedService: 'https://topmate.io/swati12',
        serviceId: recommendedService
      }
    });
  } catch (error) {
    console.error('Error processing intake form:', error);
    return res.status(500).json({ error: 'An error occurred while processing your submission' });
  }
});

// Topmate.io integration middleware and routes
app.get('/api/topmate-services', (req, res) => {
  try {
    // Fetch services from your swati12 Topmate account - this is a mock response
    // In production, consider using Topmate API if available or cache this data
    const topmateServices = [
      {
        id: '314785',
        name: 'Intro Call - Startup Advisory',
        description: 'A quick 20-minute call to learn about your startup and see if we\'re a good fit.',
        duration: '20 min',
        price: '$0',
        popular: true,
        url: 'https://topmate.io/swati12',
        category: 'startup'
      },
      {
        id: '559781',
        name: 'Resume/CV Review',
        description: 'Expert review and feedback on your resume or CV to make it stand out.',
        duration: '30 min',
        price: '$35',
        popular: false,
        url: 'https://topmate.io/swati12',
        category: 'career'
      },
      {
        id: '559780',
        name: '1:1 Consultation',
        description: 'In-depth career or startup guidance call with actionable advice.',
        duration: '30 min',
        price: '$12',
        popular: false,
        url: 'https://topmate.io/swati12',
        category: 'both'
      },
      {
        id: '314788',
        name: 'Startup Mentorship Package',
        description: 'Comprehensive startup mentorship with ongoing support.',
        duration: 'Package',
        price: '$7+',
        popular: true,
        url: 'https://topmate.io/swati12',
        category: 'startup'
      }
    ];
    
    res.status(200).json(topmateServices);
  } catch (error) {
    console.error('Error fetching Topmate services:', error);
    res.status(500).json({ error: 'Failed to fetch Topmate services' });
  }
});

// Topmate.io redirect and tracking - to track conversions
app.get('/api/topmate-redirect/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { source, referrer } = req.query;
    
    // Log the booking click for analytics
    console.log(`Topmate booking click - Service: ${serviceId}, Source: ${source}, Referrer: ${referrer}`);
    
    // Here you could also save this data to Google Sheets for tracking
    if (usingGoogleSheets && sheetsAPI) {
      try {
        const redirectData = [
          new Date().toISOString(),
          serviceId,
          source || 'direct',
          referrer || 'none',
          req.headers['user-agent'] || 'unknown'
        ];
        
        await sheetsAPI.spreadsheets.values.append({
          spreadsheetId: formsSheetId, // Use your existing form sheet
          range: 'Topmate!A:E', // Create a new sheet tab called "Topmate"
          valueInputOption: 'RAW',
          resource: {
            values: [redirectData]
          }
        });
      } catch (sheetError) {
        console.error('Error logging Topmate redirect to sheets:', sheetError);
      }
    }
    
    // Redirect to Topmate main profile instead of specific service ID
    res.redirect('https://topmate.io/swati12');
  } catch (error) {
    console.error('Error processing Topmate redirect:', error);
    res.redirect('https://topmate.io/swati12'); // Fallback to profile page
  }
});

// Server startup
async function startServer() {
  // Set up Google Sheets integration
  usingGoogleSheets = await setupGoogleSheets();
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer(); 