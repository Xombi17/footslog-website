import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Check if we have the required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using mock implementation.');
}

// Initialize Supabase client
// If we have a service role key, use it for more privileges
export const supabase = createClient(
  supabaseUrl || 'https://your-supabase-url.supabase.co',
  supabaseServiceKey || supabaseAnonKey || 'your-supabase-anon-key'
);

// Switch to use our simple_registrations table with JSONB data
const TABLE_NAME = 'simple_registrations';

// Get all registrations from the database
export async function getAllRegistrations() {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('registered_at', { ascending: false });

    if (error) throw error;

    // Transform data to match the expected format
    return (data || []).map(record => ({
      id: record.id,
      email: record.email,
      fullName: record.full_name,
      paymentStatus: record.payment_status,
      ticketId: record.ticket_id,
      registeredAt: record.registered_at,
      updatedAt: record.updated_at,
      ...record.data // Spread all the additional fields from the JSONB data column
    }));
  } catch (error) {
    console.error('Error getting registrations:', error);
    return [];
  }
}

// Get a registration by ID
export async function getRegistrationById(id: string) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    // Transform data to match the expected format
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      paymentStatus: data.payment_status,
      ticketId: data.ticket_id,
      registeredAt: data.registered_at,
      updatedAt: data.updated_at,
      ...data.data // Spread all the additional fields from the JSONB data column
    };
  } catch (error) {
    console.error(`Error getting registration with ID ${id}:`, error);
    return null;
  }
}

// Create a new registration
export async function createRegistration(registrationData: any) {
  try {
    const id = registrationData.id || uuidv4();
    
    // Extract the fields that we want in separate columns
    const { 
      fullName, 
      email, 
      paymentStatus = 'pending', 
      ticketId = null,
      id: _id, // Exclude from main data
      ...otherFields 
    } = registrationData;
    
    // Store structured data in separate columns, everything else in JSONB
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        id,
        email,
        full_name: fullName,
        data: otherFields, // Store all other fields in the JSONB data column
        payment_status: paymentStatus,
        ticket_id: ticketId,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(`Error creating registration: ${JSON.stringify(error)}`);
    }

    // Return formatted data
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      paymentStatus: data.payment_status,
      ticketId: data.ticket_id,
      registeredAt: data.registered_at,
      updatedAt: data.updated_at,
      ...data.data // Spread all the additional fields from the JSONB data column
    };
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
}

// Update an existing registration
export async function updateRegistration(id: string, updateData: any) {
  try {
    // Get the current registration
    const { data: existingData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!existingData) return null;

    // Extract fields that go into separate columns vs. JSONB data
    const { 
      fullName, 
      email, 
      paymentStatus, 
      ticketId,
      id: _id, // Exclude from updates
      ...otherFields 
    } = updateData;
    
    // Prepare update object
    const updateObj: any = {
      updated_at: new Date().toISOString()
    };
    
    // Add fields to separate columns if provided
    if (fullName !== undefined) updateObj.full_name = fullName;
    if (email !== undefined) updateObj.email = email;
    if (paymentStatus !== undefined) updateObj.payment_status = paymentStatus;
    if (ticketId !== undefined) updateObj.ticket_id = ticketId;
    
    // Handle JSONB data fields if they exist
    if (Object.keys(otherFields).length > 0) {
      // Merge with existing data
      updateObj.data = { ...existingData.data, ...otherFields };
    }

    // Update the registration
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updateObj)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Send payment confirmation email if payment was completed - handled in API route
    
    // Return formatted data
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      paymentStatus: data.payment_status,
      ticketId: data.ticket_id,
      registeredAt: data.registered_at,
      updatedAt: data.updated_at,
      ...data.data // Spread all the additional fields from the JSONB data column
    };
  } catch (error) {
    console.error(`Error updating registration with ID ${id}:`, error);
    return null;
  }
}

// Get base URL based on environment
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.origin;
  }
  // Server-side - default to localhost if not in production
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

// Send email notification
export async function sendEmailNotification(
  to: string,
  subject: string,
  content: { text: string; html: string }
) {
  // For now we're using a simple log since actual email sending might require
  // additional services or Supabase Edge Functions
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
  
  // In a real implementation, you might use Supabase Edge Functions with a mail service
  // or integrate with a service like SendGrid, Mailchimp, etc.
  
  // Example of how you might implement it with an API route
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        text: content.text,
        html: content.html,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 