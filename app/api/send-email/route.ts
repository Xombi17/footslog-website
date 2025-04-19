import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// CORS Middleware helper
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Handle OPTIONS request (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html } = await request.json();

    // Validate input
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400, headers: corsHeaders() }
      );
    }

    // For now, we'll just log the email (this is a placeholder)
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('Content:', text || html);

    // Example of how you might use Supabase to log the email attempt
    const { error } = await supabase
      .from('email_logs')
      .insert([
        {
          recipient: to,
          subject,
          content: text || html,
          sent_at: new Date().toISOString(),
          status: 'sent' // In a real implementation, this would be updated based on the actual result
        }
      ]);

    if (error) {
      console.error('Error logging email:', error);
      // Don't fail if email logging fails
      console.log('Continuing despite email logging error');
    }

    // Return success
    return NextResponse.json(
      { success: true }, 
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' }, 
      { status: 500, headers: corsHeaders() }
    );
  }
} 