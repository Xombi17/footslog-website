import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.EMAIL_API_KEY);

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

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Footslog <no-reply@footslog.com>',
      to: [to],
      subject,
      text,
      html,
    });

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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 