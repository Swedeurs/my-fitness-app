import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const workoutResponse = await fetch('/api/users/workout-plan');
        const mealResponse = await fetch('/api/users/meal-plan');
        const workoutData = await workoutResponse.json();
        const mealData = await mealResponse.json();
        setWorkoutPlan(workoutData);
        setMealPlan(mealData);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Your Personalized Dashboard</h1>

      <section>
        <h2>Workout Plan</h2>
        <ul>
          {workoutPlan.map((workout, index) => (
            <li key={index}>
              <strong>{workout.day}:</strong> {workout.workout}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Meal Plan</h2>
        <ul>
          {mealPlan.map((meal, index) => (
            <li key={index}>
              <strong>{meal.meal}:</strong> {meal.recipe}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
