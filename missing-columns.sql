-- Add missing columns to the registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS dietaryRestrictions TEXT,
ADD COLUMN IF NOT EXISTS equipmentNeeds TEXT,
ADD COLUMN IF NOT EXISTS howHeard TEXT,
ADD COLUMN IF NOT EXISTS specialRequests TEXT,
ADD COLUMN IF NOT EXISTS height TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS tShirtSize TEXT,
ADD COLUMN IF NOT EXISTS medicalInfo TEXT;

-- Make sure other required columns are present too
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS fitnessLevel TEXT,
ADD COLUMN IF NOT EXISTS trekExperience TEXT,
ADD COLUMN IF NOT EXISTS emergencyContact JSONB,
ADD COLUMN IF NOT EXISTS gender TEXT; 