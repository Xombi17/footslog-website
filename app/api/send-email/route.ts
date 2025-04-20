import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabase';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// CORS Middleware helper
const corsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

// Handle OPTIONS request (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using SendGrid
    const msg = {
      to,
      from: process.env.EMAIL_FROM || 'noreply@footslog.com',
      subject,
      text: body,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">${subject}</h2>
          <div style="color: #4a5568; line-height: 1.6;">
            ${body.replace(/\n/g, '<br>')}
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px;">
            <p>This email was sent from Footslog Trekking.</p>
            <p>If you have any questions, please contact us at support@footslog.com</p>
          </div>
        </div>
      </div>`,
    };

    await sgMail.send(msg);

    // Log the email in Supabase
    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        recipient: to,
        subject,
        content: body,
        sent_at: new Date().toISOString(),
        status: 'sent'
      });

    if (logError) {
      console.error('Error logging email:', logError);
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 