# Footslog Trek Website

A modern website for Footslog trek registrations and management.

## Features

- Responsive design with jungle theme
- Registration form with payment integration
- QR code ticket generation
- Admin dashboard for managing registrations
- Email notifications
- Supabase backend integration

## Tech Stack

- Next.js
- TypeScript
- Supabase
- Tailwind CSS
- React Hook Form
- Zod for validation
- React QR Code

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   EMAIL_FROM=your-sender-email
   EMAIL_API_KEY=your-email-service-api-key
   ADMIN_API_KEY=footslog-admin-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `EMAIL_FROM`: Sender email address
- `EMAIL_API_KEY`: Email service API key
- `ADMIN_API_KEY`: Admin access key

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 