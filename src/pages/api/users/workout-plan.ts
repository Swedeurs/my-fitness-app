// src/pages/api/users/workout-plan.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateWorkoutPlan } from '../../../services/generateWorkoutPlan';
import { db } from '../../../lib/db';
import { workouts } from '../../../lib/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userPreferences = req.body;

      // Generate the workout plan
      const generatedWorkoutPlan = generateWorkoutPlan(userPreferences);

      // Prepare data for insertion to match your schema
      const insertData = generatedWorkoutPlan.map((plan) => ({
        workoutName: plan.workout,
        workoutType: userPreferences.trainingPreferences,
      }));

      // Insert data into the workouts table
      await db.insert(workouts).values(insertData).execute();

      res.status(201).json({ message: 'Workout plan created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error generating workout plan' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
