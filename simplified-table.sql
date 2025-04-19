-- Drop existing tables
DROP TABLE IF EXISTS email_logs;
DROP TABLE IF EXISTS trek_registrations;
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS simple_registrations;

-- Create a simplified table with minimal columns and a JSONB field for all extra data
CREATE TABLE simple_registrations (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  data JSONB NOT NULL, -- Store all other fields here
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  ticket_id TEXT,
  registered_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX simple_registrations_email_idx ON simple_registrations (email);
CREATE INDEX simple_registrations_payment_status_idx ON simple_registrations (payment_status);

-- Enable RLS but with more permissive policies for testing
ALTER TABLE simple_registrations ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now - for testing purposes
CREATE POLICY "allow_all" ON simple_registrations
  FOR ALL USING (true);

-- Create email_logs table with minimal structure
CREATE TABLE email_logs (
  id BIGSERIAL PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on email logs
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Allow all operations for email logs too
CREATE POLICY "allow_all_emails" ON email_logs
  FOR ALL USING (true); 