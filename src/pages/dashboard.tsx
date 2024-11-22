import React, { useEffect, useState, useContext } from "react";
import { MealPlanItem, WorkoutPlanItem } from "@/types";
import UserContext from "@/context/usercontext";
import { generateWorkoutPlan } from "@/services/generate-workout-plan";
import { generateMealPlan } from "@/services/generate-meal-plan";

const Dashboard = () => {
  // Get user context, ensuring type safety
  const userContext = useContext(UserContext);

  // Ensure UserContext is being used correctly
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user } = userContext;

  // State for workout and meal plans
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanItem[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect to generate workout and meal plans once user data is available
  useEffect(() => {
    if (user) {
      // Generate workout plan based on user data
      const generatedWorkoutPlan: WorkoutPlanItem[] = generateWorkoutPlan({
        fitnessLevel: user.fitnessLevel || "beginner",
        trainingPreferences: user.trainingPreferences || "home",
        timeAvailability: user.timeAvailability || 3,
      });

      // Generate meal plan based on user data
      const generatedMealPlan: MealPlanItem[] = generateMealPlan({
        dietaryPreferences: user.dietaryPreferences || "vegetarian",
        timeAvailability: user.timeAvailability || 3,
      });

      // Set state and stop loading
      setWorkoutPlan(generatedWorkoutPlan);
      setMealPlan(generatedMealPlan);
      setLoading(false);
    } else {
      console.log("User data is not available yet.");
      setLoading(true);
    }
  }, [user]);

  if (loading) {
    return <div>Loading user preferences...</div>;
  }

  return (
    <div className="p-5">
      {/* Workout Plan Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Workout Plan
        </h2>
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

      {/* Meal Plan Section */}
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
