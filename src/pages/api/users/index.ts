import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import { users } from '@/lib/schema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const { fitnessLevel, trainingPreferences, dietaryPreferences } = req.body;

      // Insert into the users table, ensuring all fields match the schema
      await db.insert(users).values({
        fitnessLevel,
        trainingPreferences,
        dietaryPreferences,
      });

      res.status(200).json({ message: 'Preferences saved successfully' });
    } catch (error) {
 
      console.error('Error saving preferences:', error);
      res.status(500).json({ error: 'Failed to save preferences' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
