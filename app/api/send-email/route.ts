import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/lib/supabase';

// Initialize SendGrid with error checking
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('SendGrid API key is not configured');
}
sgMail.setApiKey(SENDGRID_API_KEY || '');

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
    const { to, subject, body, ticketId } = await request.json();

    // Validate required fields
    if (!to || !subject || !body) {
      console.error('Missing required fields:', { to, subject, bodyLength: body?.length });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email configuration
    const fromEmail = process.env.EMAIL_FROM;
    if (!fromEmail) {
      console.error('EMAIL_FROM is not configured');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Create HTML email template
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          ${body.split('\n').map(line => {
            if (line.trim().startsWith('-')) {
              return `<p style="margin: 5px 0; padding-left: 20px;">${line}</p>`;
            }
            if (line.trim() === '') {
              return '<br>';
            }
            return `<p style="margin: 5px 0;">${line}</p>`;
          }).join('')}
        </div>
        
        ${ticketId ? `
          <div style="margin-top: 20px; text-align: center;">
            <h3 style="color: #333;">Your Ticket QR Code</h3>
            <div style="background-color: white; padding: 20px; border-radius: 8px; display: inline-block;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticketId)}" 
                   alt="Ticket QR Code" 
                   style="width: 200px; height: 200px;"/>
            </div>
            <p style="margin-top: 10px; color: #666;">Ticket ID: ${ticketId}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #666; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
            <br>
            For any queries, contact us at support@footslog.com
          </p>
        </div>
      </div>
    `;

    // Prepare email message
    const msg = {
      to,
      from: fromEmail,
      subject,
      text: body,
      html: htmlBody,
    };

    console.log('Attempting to send email to:', to);
    
    try {
      // Send email using SendGrid
      await sgMail.send(msg);
      console.log('Email sent successfully to:', to);
    } catch (sendError: any) {
      console.error('SendGrid error:', sendError?.response?.body || sendError);
      throw new Error(sendError?.response?.body?.errors?.[0]?.message || 'Failed to send email');
    }

    // Log the email in Supabase
    const { error: logError } = await supabase
      .from('email_logs')
      .insert([
        {
          recipient: to,
          subject,
          content: body,
          sent_at: new Date().toISOString(),
          status: 'sent',
          ticket_id: ticketId || null
        }
      ]);

    if (logError) {
      console.error('Error logging email:', logError);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully'
    }, { 
      headers: corsHeaders() 
    });
  } catch (error: any) {
    console.error('Error in email route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error.message 
      },
      { status: 500, headers: corsHeaders() }
    );
  }
} 