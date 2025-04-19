import { NextApiRequest, NextApiResponse } from 'next';
import { 
  getAllRegistrations, 
  createRegistration, 
  updateRegistration 
} from '../../lib/supabase';

// NOTE: This file is deprecated in favor of app/api/registrations/route.ts
// Keep it here temporarily for backwards compatibility, but will be removed in future

// Admin API key for accessing all registrations - in production, use environment variables
const ADMIN_API_KEY = 'footslog-admin-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Retrieve all registrations (admin only)
    if (req.method === 'GET') {
      // Check for admin API key
      const apiKey = req.headers['x-api-key'] || req.query.apiKey;
      if (apiKey !== ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized. Admin API key required.' });
      }

      const registrations = await getAllRegistrations();
      return res.status(200).json(registrations);
    }

    // POST - Create a new registration
    if (req.method === 'POST') {
      const registrationData = req.body;

      // Validate required fields
      if (!registrationData || !registrationData.fullName || !registrationData.email) {
        return res.status(400).json({ error: 'Required fields missing: fullName and email are required' });
      }

      const result = await createRegistration(registrationData);
      return res.status(201).json(result);
    }

    // PUT - Update registration (mainly for payment status updates)
    if (req.method === 'PUT') {
      // Check for admin API key for sensitive operations
      const apiKey = req.headers['x-api-key'] || req.query.apiKey;
      if (apiKey !== ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized. Admin API key required for updates.' });
      }

      const { id, ...updateData } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Registration ID is required' });
      }

      const updatedRegistration = await updateRegistration(id, updateData);
      if (!updatedRegistration) {
        return res.status(404).json({ error: 'Registration not found' });
      }

      return res.status(200).json(updatedRegistration);
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 