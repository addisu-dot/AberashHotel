# Email Notification System Setup Guide

## Overview
The booking system now sends email notifications to `aberashhotel@gmail.com` when guests submit booking requests. Here's how to set it up:

## Step 1: Create a Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Navigate to **App passwords** (appears only if 2FA is enabled)
4. Select "Mail" and "Windows Computer" (or your platform)
5. Google will generate a **16-character app password**
6. Copy this password (you'll use it in Step 2)

## Step 2: Set Up Environment Variables

1. Create a `.env.local` file in the project root (copy from `.env.local.example`)
2. Add the following variables:

```env
EMAIL_USER=aberashhotel@gmail.com
EMAIL_PASS=your-16-char-app-password
```

Replace `your-16-char-app-password` with the password from Step 1.

## Step 3: Verify Installation

Make sure these dependencies are already installed:
```bash
npm install nodemailer
```

They should already be in `package.json`, but if needed:
```bash
npm install
```

## Step 4: Test the System

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the home page and click "Book Your Stay"
3. Fill out the booking form with valid details
4. Click "Confirm Booking Reservation"
5. Check `aberashhotel@gmail.com` for the booking confirmation email

## How It Works

### API Endpoint: `/api/booking`

**Request (POST):**
```json
{
  "checkIn": "2024-06-15",
  "checkOut": "2024-06-18",
  "adults": 2,
  "children": 1,
  "roomType": "deluxe-suite",
  "fullName": "John Doe",
  "phone": "+1234567890"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Booking request sent successfully",
  "messageId": "email-message-id"
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

### Email Features

✅ **Beautiful HTML Template** - Professionally formatted email with gradient header
✅ **Guest Information** - Name and contact number
✅ **Stay Details** - Check-in/out dates, number of nights, room type
✅ **Guest Count** - Adults and children breakdown
✅ **Next Steps** - Call-to-action message

### Frontend Features

✅ **Loading State** - "Sending Request..." with spinner while processing
✅ **Error Handling** - Displays error messages if the API fails
✅ **Success Screen** - Shows "Success! We will contact you shortly" after 4 seconds
✅ **Form Validation** - All fields validated before submission
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Troubleshooting

### "Failed to process booking request"
- Check that `.env.local` has correct `EMAIL_USER` and `EMAIL_PASS`
- Verify the app password is 16 characters
- Ensure 2-Step Verification is enabled on the Gmail account

### Email not received
- Check spam/promotions folder
- Verify `aberashhotel@gmail.com` is the correct destination
- Review server logs in the terminal for detailed error messages

### SMTP Error: Invalid credentials
- The app password may have expired
- Generate a new app password from Google Account settings
- Update `.env.local` with the new password

## Security Notes

⚠️ **Never commit `.env.local` to version control**
- `.gitignore` should already exclude it
- Use `.env.local.example` as a template for other developers

⚠️ **Gmail App Passwords**
- Generate a unique app password for this project
- Don't share it with others
- Delete it from Google Account if compromised

## File Structure

```
aberash-hotel/
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts           # Email API endpoint
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── BookingModal.tsx           # Updated with API integration
│   ├── SuccessScreen.tsx
│   └── ...other components
├── .env.local                     # ⚠️ DO NOT COMMIT
├── .env.local.example             # Template for setup
├── package.json
└── ...other files
```

## Next Steps

1. Follow the setup steps above
2. Test the booking system
3. Customize the email template in `app/api/booking/route.ts` if needed
4. Deploy with proper environment variables set in your hosting platform
