-- Create a completely new table with a different name
CREATE TABLE trek_registrations (
  id UUID PRIMARY KEY,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT,
  fitnessLevel TEXT,
  trekExperience TEXT,
  emergencyContact JSONB, -- { name, phone, relation }
  medicalInfo TEXT,
  height TEXT,
  weight TEXT,
  tShirtSize TEXT,
  dietaryRestrictions TEXT,
  equipmentNeeds TEXT,
  howHeard TEXT, 
  specialRequests TEXT,
  paymentStatus TEXT DEFAULT 'pending' CHECK (paymentStatus IN ('pending', 'completed', 'failed')),
  ticketId TEXT,
  registeredAt TIMESTAMPTZ DEFAULT now(),
  updatedAt TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS trek_registrations_email_idx ON trek_registrations (email);
CREATE INDEX IF NOT EXISTS trek_registrations_payment_status_idx ON trek_registrations (paymentStatus);

-- Enable RLS
ALTER TABLE trek_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public users can't read trek_registrations" ON trek_registrations
  FOR SELECT USING (false);

CREATE POLICY "Public users can insert their trek_registration" ON trek_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Backend services can read all trek_registrations" ON trek_registrations
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Backend services can update trek_registrations" ON trek_registrations
  FOR UPDATE USING (auth.role() = 'service_role');

-- Create email_logs table if it doesn't exist
DROP TABLE IF EXISTS email_logs;
CREATE TABLE email_logs (
  id BIGSERIAL PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'delivered', 'opened')),
  related_registration_id UUID REFERENCES trek_registrations(id)
);

-- Enable RLS on email logs
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for email logs
CREATE POLICY "Backend services can manage email logs" ON email_logs
  USING (auth.role() = 'service_role'); 