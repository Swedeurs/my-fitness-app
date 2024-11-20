import React, { useEffect, useState, useContext } from 'react';

import { MealPlanItem, WorkoutPlanItem } from '@/types';

import { generateWorkoutPlan } from '@/services/generate-workout-plan';
import { generateMealPlan } from '@/services/generate-meal-plan';
import UserContext from '@/context/usercontext';

const Dashboard = () => {

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = userContext;

  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanItem[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Generate workout plan and meal plan using user's preferences
      const generatedWorkoutPlan: WorkoutPlanItem[] = generateWorkoutPlan({
        fitnessLevel: user.fitnessLevel || 'beginner', 
        trainingPreferences: user.trainingPreferences || 'home',
        timeAvailability: user.timeAvailability || 3,
      });

      const generatedMealPlan: MealPlanItem[] = generateMealPlan({
        dietaryPreferences: user.dietaryPreferences || 'vegetarian', 
        timeAvailability: user.timeAvailability || 3, 


      setWorkoutPlan(generatedWorkoutPlan);
      setMealPlan(generatedMealPlan);
      setLoading(false);
    } else {
      console.log('User data is not available yet.');
      setLoading(true);
    }
  }, [user]);

  // Loading state
/*   if (loading) {
    return <div>Loading user preferences...</div>;
  } */

    return (
      <div className="p-5">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Workout Plan</h2>
          {workoutPlan.length > 0 ? (
            <ul className="list-none space-y-3">
              {workoutPlan.map((workout, index) => (
                <li key={index} className="bg-blue-100 p-4 rounded-md">
                  <strong>{workout.day}:</strong> {workout.workout}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No workout plan available.</p>
          )}
        </section>
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meal Plan</h2>
          {mealPlan.length > 0 ? (
            <ul className="list-none space-y-3">
              {mealPlan.map((meal, index) => (
                <li key={index} className="bg-green-100 p-4 rounded-md">
                  <strong>{meal.meal}:</strong> {meal.recipe}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No meal plan available.</p>
          )}
        </section>
      </div>
    );
  };

export default Dashboard;
