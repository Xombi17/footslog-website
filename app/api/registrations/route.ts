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
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey');

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await getAllRegistrations();
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

// Handle POST request - Add new registration
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const registration = await createRegistration(data);
    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}

// Handle PUT request - Update payment status
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'Missing registration ID' }, { status: 400 });
    }

    const updated = await updateRegistration(data.id, data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
} 