/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import { mealPlans } from '../../../lib/schema';
import { generateMealPlan } from '@/services/generate-meal-plan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userPreferences = req.body;

      // Generate the meal plan
      const generatedMealPlan = generateMealPlan(userPreferences);

      // Prepare data for insertion to match your schema
      const insertData = generatedMealPlan.map((plan) => ({
        mealName: plan.meal,
        ingredients: plan.recipe,
      }));

      // Insert data into the mealPlans table
      await db.insert(mealPlans).values(insertData).execute();

      res.status(201).json({ message: 'Meal plan created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error generating meal plan' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
