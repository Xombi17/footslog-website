import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('registrations').select('count').limit(1);
    
    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        hint: 'Did you run the SQL setup script in your Supabase dashboard?',
        details: error
      }, { status: 500 });
    }
    
    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      data
    });
  } catch (error: any) {
    // Return error
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 