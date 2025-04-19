-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Public users can't read registrations" ON registrations;
DROP POLICY IF EXISTS "Public users can insert their registration" ON registrations;
DROP POLICY IF EXISTS "Backend services can read all registrations" ON registrations;
DROP POLICY IF EXISTS "Backend services can update registrations" ON registrations;

-- Then recreate them
CREATE POLICY "Public users can't read registrations" ON registrations
  FOR SELECT USING (false);

CREATE POLICY "Public users can insert their registration" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Backend services can read all registrations" ON registrations
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Backend services can update registrations" ON registrations
  FOR UPDATE USING (auth.role() = 'service_role');

-- Create the email_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS email_logs (
  id BIGSERIAL PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'delivered', 'opened')),
  related_registration_id UUID REFERENCES registrations(id)
);

-- Enable RLS on email logs if not already enabled
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policy for email logs if it exists
DROP POLICY IF EXISTS "Backend services can manage email logs" ON email_logs;

-- Create the policy
CREATE POLICY "Backend services can manage email logs" ON email_logs
  USING (auth.role() = 'service_role'); 