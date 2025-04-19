# Footslog Trek Registration System

This project includes a complete trek registration system with Supabase database integration and email notifications.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new account or sign in
2. Create a new project
3. Note your project URL and anon key

### 2. Configure Environment Variables

Copy the `.env.local` file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then edit the `.env.local` file to add your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-goes-here
ADMIN_API_KEY=your-secure-admin-key
EMAIL_FROM=footslog@yourdomain.com
```

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-setup.sql` from this project
3. Run the SQL to create all necessary tables and functions

### 4. Configure Email Notifications

For email notifications, you have several options:

1. **Supabase Edge Functions** - Create an edge function that connects to your preferred email service
2. **Email Service Integration** - Set up a direct integration with services like SendGrid, Mailchimp, etc.
3. **SMTP Configuration** - Use SMTP to send emails directly

For production, we recommend option 1 or 2.

### 5. Install Dependencies

```bash
bun install
```

### 6. Run the Development Server

```bash
bun dev
```

## System Features

### Registration Management

- User registration form with comprehensive trekker details
- Secure database storage in Supabase
- Payment handling with auto-generated tickets
- Email notifications at registration and payment completion

### Admin Dashboard

Access the admin dashboard at `/admin/registrations` to:

- View all registrations
- Filter by payment status
- Search for specific registrants
- Update payment status
- Generate tickets

## Security Notes

1. The current admin authentication uses a simple API key. For production, consider implementing more robust authentication.
2. Set up proper Row Level Security in Supabase for production environments.
3. Keep your API keys and environment variables secure.

## Database Schema

The main tables in the database are:

1. `registrations` - Stores all trek participant data
2. `email_logs` - Tracks email notifications sent to participants

## Customization

You can customize the following aspects:

- Email templates in the `sendEmailNotification` function
- Form fields in the registration form component
- Ticket design in the ticket component
- Payment flow and pricing

## Extending the System

To add more features, consider:

- Adding payment gateway integration (e.g., Stripe, Razorpay)
- Implementing QR code scanning for check-in
- Setting up automated reminders before the trek
- Adding post-trek feedback forms 