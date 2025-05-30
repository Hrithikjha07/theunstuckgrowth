const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  supportingDocs: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  fileUrl: {
    type: String,
    trim: true
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  formType: {
    type: String,
    default: 'client-story',
    enum: ['client-story', 'contact', 'newsletter']
  }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission; 