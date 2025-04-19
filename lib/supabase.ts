import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

// Check if we have the required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Using mock implementation.');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend client for email
let resend: Resend | null = null;
if (process.env.EMAIL_API_KEY) {
  resend = new Resend(process.env.EMAIL_API_KEY);
} else {
  console.warn('Missing EMAIL_API_KEY. Email functionality will be disabled.');
}

// Types
interface EmailContent {
  text: string;
  html: string;
}

interface RegistrationData {
  full_name: string;
  email: string;
  data: Record<string, any>;
  payment_status?: string;
  ticket_id?: string;
}

// Get all registrations
export async function getAllRegistrations() {
  const { data, error } = await supabase
    .from('simple_registrations')
    .select('*')
    .order('registered_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get a registration by ID
export async function getRegistrationById(id: string) {
  const { data, error } = await supabase
    .from('simple_registrations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Create a new registration
export async function createRegistration(data: any) {
  const { email, full_name, ...otherData } = data;
  
  // Check for existing registration
  const { data: existing } = await supabase
    .from('simple_registrations')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    throw new Error('Email already registered');
  }

  const { data: registration, error } = await supabase
    .from('simple_registrations')
    .insert({
      email,
      full_name,
      data: otherData,
      payment_status: 'pending',
      registered_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return registration;
}

// Update a registration
export async function updateRegistration(id: string, data: any) {
  const { payment_status, ticket_id, ...otherData } = data;
  
  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (payment_status) updateData.payment_status = payment_status;
  if (ticket_id) updateData.ticket_id = ticket_id;
  if (Object.keys(otherData).length > 0) {
    updateData.data = otherData;
  }

  const { data: registration, error } = await supabase
    .from('simple_registrations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return registration;
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
  content: EmailContent
) {
  if (!resend) {
    console.warn('Email service not configured. Skipping email notification.');
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Footslog <no-reply@footslog.com>',
      to: [to],
      subject: subject,
      text: content.text,
      html: content.html,
    });

    // Log email for tracking
    await supabase
      .from('email_logs')
      .insert([
        {
          recipient: to,
          subject: subject,
          status: result ? 'sent' : 'failed',
          sent_at: new Date().toISOString()
        }
      ]);

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function getRegistrationByEmail(email: string) {
  const { data, error } = await supabase
    .from('simple_registrations')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;
  return data;
} 