# The Unstuck Growth Website

This repository contains the website for The Unstuck Growth, a strategic advisory platform.

## Features
- Responsive design
- Calendly integration for appointments
- Formspree for contact forms
- Topmate integration
- Modern UI/UX

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Hrithikjha07/theunstuckgrowth.git
cd theunstuckgrowth
```

2. Run a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve
```

3. Open in browser:
```
http://localhost:8000
```

## Automatic Updates to GitHub

### Option 1: Using Batch Script (Windows)
1. Double-click `auto-push.bat` in the project folder
2. It will automatically:
   - Add all changes
   - Commit with timestamp
   - Push to GitHub

### Option 2: Manual Commands
```bash
git add .
git commit -m "Your commit message"
git push
```

## Deployment

The site is deployed using GitHub Pages. To update the deployment:

1. Go to your repository settings
2. Navigate to "Pages" under "Code and automation"
3. Under "Source", select:
   - Branch: main
   - Folder: / (root)
4. Click "Save"

Your site will be available at: https://hrithikjha07.github.io/theunstuckgrowth/

## Integration Setup

### Calendly
- Calendly widget is integrated in the HTML
- Event type: 30-minute consultation
- URL: https://calendly.com/unstuckgrowth/30min

### Formspree
- Contact forms are configured to use Formspree
- Form ID: xrgwkykq

### Topmate
- Topmate integration is configured
- Username: swati12

## Contributing
1. Make your changes
2. Use auto-push.bat or manual git commands to update
3. Changes will be automatically deployed to GitHub Pages

## Backend Setup for Form Submissions

The website now includes a backend system to capture and store form submissions from the client stories contact section. This allows you to review and manage all submissions through an admin dashboard.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/unstuckgrowth
   NODE_ENV=development
   ```
   
   Note: If you're using MongoDB Atlas, replace the MONGODB_URI with your connection string.

### Running the Application

1. Start the server:
   ```
   npm start
   ```
   
   This will start the Express server which serves both the frontend and handles API requests.

2. Access the website:
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

### Form Submission Flow

1. Users fill out the client story form on the website.
2. The form data is sent to the backend API at `/api/forms`.
3. The submission is stored in MongoDB.
4. Administrators can view all submissions in the admin dashboard.

### Admin Dashboard

The admin dashboard allows you to:
- View all form submissions
- Filter submissions by type (client-story, contact, newsletter)
- View details of individual submissions
- Delete submissions

### API Endpoints

- `GET /api/forms` - Get all form submissions
- `GET /api/forms/type/:formType` - Get submissions by form type
- `GET /api/forms/:id` - Get a single submission by ID
- `POST /api/forms` - Create a new submission
- `DELETE /api/forms/:id` - Delete a submission

### MongoDB Schema

The form submissions are stored with the following schema:

```javascript
{
  name: String,          // Required
  email: String,         // Required
  phone: String,
  subject: String,       // Required
  supportingDocs: String, // Base64 encoded file
  message: String,       // Required
  fileUrl: String,
  newsletter: Boolean,   // Default: false
  createdAt: Date,       // Default: current date
  formType: String       // Default: 'client-story'
}
```

### Production Deployment

For production deployment:

1. Update the `.env` file with production settings:
   ```
   PORT=3000
   MONGODB_URI=<your-production-mongodb-uri>
   NODE_ENV=production
   ```

2. Consider adding authentication to the admin dashboard for security.

3. Deploy to your hosting provider of choice (Heroku, Vercel, DigitalOcean, etc.).

## Form Submission System

The website uses JotForm for handling contact form submissions. This provides:

- Secure form processing without needing a backend server
- Email notifications when forms are submitted
- File upload capabilities
- Spam protection
- Mobile-responsive forms
- Submission management through the JotForm dashboard

### Accessing Form Submissions

1. Log in to the JotForm account
2. Navigate to "My Forms"
3. Select the contact form
4. View all submissions in the "Submissions" tab

### Customizing the Form

If you need to modify the form:
1. Log in to the JotForm account
2. Edit the form design, fields, or settings
3. Changes will automatically apply to the embedded form on the website

## License

[Your License] 