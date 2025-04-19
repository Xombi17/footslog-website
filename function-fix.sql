-- Drop the function if it exists
DROP FUNCTION IF EXISTS upsert_registration;

-- Create or replace function for upserting registrations
CREATE OR REPLACE FUNCTION upsert_registration(
  p_registration JSONB
) RETURNS JSONB AS $$
DECLARE
  v_id UUID;
  v_result JSONB;
BEGIN
  -- Check if registration exists
  SELECT id INTO v_id FROM registrations WHERE email = p_registration->>'email';
  
  IF v_id IS NULL THEN
    -- Insert new registration
    INSERT INTO registrations (
      id, fullName, email, phone, age, gender, fitnessLevel, trekExperience,
      emergencyContact, medicalInfo, height, weight, tShirtSize, dietaryRestrictions,
      equipmentNeeds, howHeard, specialRequests, paymentStatus, registeredAt
    ) VALUES (
      COALESCE(p_registration->>'id', gen_random_uuid()::text)::uuid,
      p_registration->>'fullName',
      p_registration->>'email',
      p_registration->>'phone',
      p_registration->>'age',
      p_registration->>'gender',
      p_registration->>'fitnessLevel',
      p_registration->>'trekExperience',
      p_registration->'emergencyContact',
      p_registration->>'medicalInfo',
      p_registration->>'height',
      p_registration->>'weight',
      p_registration->>'tShirtSize',
      p_registration->>'dietaryRestrictions',
      p_registration->>'equipmentNeeds',
      p_registration->>'howHeard',
      p_registration->>'specialRequests',
      COALESCE(p_registration->>'paymentStatus', 'pending'),
      COALESCE((p_registration->>'registeredAt')::timestamptz, now())
    )
    RETURNING to_jsonb(registrations.*) INTO v_result;
  ELSE
    -- Update existing registration
    UPDATE registrations
    SET 
      fullName = COALESCE(p_registration->>'fullName', fullName),
      phone = COALESCE(p_registration->>'phone', phone),
      age = COALESCE(p_registration->>'age', age),
      gender = COALESCE(p_registration->>'gender', gender),
      fitnessLevel = COALESCE(p_registration->>'fitnessLevel', fitnessLevel),
      trekExperience = COALESCE(p_registration->>'trekExperience', trekExperience),
      emergencyContact = COALESCE(p_registration->'emergencyContact', emergencyContact),
      medicalInfo = COALESCE(p_registration->>'medicalInfo', medicalInfo),
      height = COALESCE(p_registration->>'height', height),
      weight = COALESCE(p_registration->>'weight', weight),
      tShirtSize = COALESCE(p_registration->>'tShirtSize', tShirtSize),
      dietaryRestrictions = COALESCE(p_registration->>'dietaryRestrictions', dietaryRestrictions),
      equipmentNeeds = COALESCE(p_registration->>'equipmentNeeds', equipmentNeeds),
      howHeard = COALESCE(p_registration->>'howHeard', howHeard),
      specialRequests = COALESCE(p_registration->>'specialRequests', specialRequests),
      paymentStatus = COALESCE(p_registration->>'paymentStatus', paymentStatus),
      ticketId = COALESCE(p_registration->>'ticketId', ticketId),
      updatedAt = now()
    WHERE id = v_id
    RETURNING to_jsonb(registrations.*) INTO v_result;
  END IF;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 