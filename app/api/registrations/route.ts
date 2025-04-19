import { NextRequest, NextResponse } from 'next/server';
import { 
  supabase, 
  getAllRegistrations, 
  createRegistration, 
  updateRegistration,
  sendEmailNotification
} from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// CORS Middleware helper
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
  };
}

// Handle OPTIONS request (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

// Handle GET request - Return all registrations
export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('apiKey');
  
  // Simple API key check for admin access
  if (apiKey !== process.env.ADMIN_API_KEY && apiKey !== 'footslog-admin-key') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders() });
  }
  
  try {
    const registrations = await getAllRegistrations();
    return NextResponse.json(registrations, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' }, 
      { status: 500, headers: corsHeaders() }
    );
  }
}

// Handle POST request - Add new registration
export async function POST(request: NextRequest) {
  try {
    const registrationData = await request.json();
    
    if (!registrationData.fullName || !registrationData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' }, 
        { status: 400, headers: corsHeaders() }
      );
    }
    
    // Check if email already exists
    const { data: existingRegistrations, error: searchError } = await supabase
      .from('simple_registrations')  // Updated table name
      .select('id')
      .eq('email', registrationData.email);
    
    if (searchError) {
      throw searchError;
    }
    
    if (existingRegistrations && existingRegistrations.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' }, 
        { status: 409, headers: corsHeaders() }
      );
    }
    
    // Add timestamp 
    const newRegistration = {
      ...registrationData,
      registeredAt: new Date().toISOString(),
      paymentStatus: 'pending'
    };
    
    // Save to Supabase
    const savedRegistration = await createRegistration(newRegistration);
    
    // Send confirmation email
    try {
      await sendEmailNotification(
        registrationData.email,
        'Your Footslog Trek Registration',
        {
          text: `Hi ${registrationData.fullName},\n\nThank you for registering for the Footslog trek. Your registration has been received. Please complete the payment to secure your spot.\n\nTotal Amount: ₹850\n\nRegards,\nFootslog Team`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #D4A72C;">Footslog Trek Registration</h2>
              <p>Hi ${registrationData.fullName},</p>
              <p>Thank you for registering for the Footslog trek. Your registration has been received.</p>
              <p>Please complete the payment to secure your spot.</p>
              <div style="background-color: #243420; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #E5E1D6; margin: 0;">Total Amount: <strong style="color: #D4A72C;">₹850</strong></p>
              </div>
              <p>We're excited to have you join us on this adventure!</p>
              <p>Regards,<br>Footslog Team</p>
            </div>
          `
        }
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the registration just because email failed
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful',
        registration: savedRegistration
      }, 
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' }, 
      { status: 500, headers: corsHeaders() }
    );
  }
}

// Handle PUT request - Update payment status
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, paymentStatus, ticketId } = data;
    
    if (!id || !paymentStatus) {
      return NextResponse.json(
        { error: 'Registration ID and payment status are required' }, 
        { status: 400, headers: corsHeaders() }
      );
    }
    
    // Update data
    const updateData: any = {
      paymentStatus,
      updatedAt: new Date().toISOString()
    };
    
    if (ticketId) {
      updateData.ticketId = ticketId;
    }
    
    // Update in Supabase
    const updatedRegistration = await updateRegistration(id, updateData);
    
    // Send payment confirmation email if payment is completed
    if (paymentStatus === 'completed' && updatedRegistration.email) {
      try {
        await sendEmailNotification(
          updatedRegistration.email,
          'Your Footslog Trek Payment Confirmation',
          {
            text: `Hi ${updatedRegistration.fullName},\n\nThank you for completing your payment for the Footslog trek. Your spot has been secured.\n\nTicket ID: ${ticketId || 'N/A'}\n\nWe look forward to seeing you on the trek!\n\nRegards,\nFootslog Team`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4A72C;">Footslog Trek Payment Confirmation</h2>
                <p>Hi ${updatedRegistration.fullName},</p>
                <p>Thank you for completing your payment for the Footslog trek. Your spot has been secured.</p>
                <div style="background-color: #243420; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="color: #E5E1D6; margin: 0;">Ticket ID: <strong style="color: #D4A72C;">${ticketId || 'N/A'}</strong></p>
                </div>
                <p>We look forward to seeing you on the trek!</p>
                <p>Regards,<br>Footslog Team</p>
              </div>
            `
          }
        );
      } catch (emailError) {
        console.error('Failed to send payment confirmation email:', emailError);
        // Don't fail the update just because email failed
      }
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration updated',
        registration: updatedRegistration
      }, 
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' }, 
      { status: 500, headers: corsHeaders() }
    );
  }
} 