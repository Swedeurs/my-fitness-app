// src/app/components/workout-plan.tsx

import React from "react";

export default function WorkoutPlan() {
  // Mock workout plan data
  const workouts = [
    { day: "Monday", workout: "Cardio: 30 mins running, Strength Training: Upper body" },
    { day: "Tuesday", workout: "Yoga: Flexibility and Core" },
    { day: "Wednesday", workout: "Cardio: 45 mins cycling, Strength Training: Lower body" },
    { day: "Thursday", workout: "Rest Day or Light Walk" },
    { day: "Friday", workout: "HIIT: 20 mins intervals, Strength Training: Full body" },
    { day: "Saturday", workout: "Swimming or CrossFit" },
    { day: "Sunday", workout: "Rest and Recovery" },
  ];

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h3 className="text-3xl font-semibold mb-4 text-gray-800">Workout Plans</h3>
      <ul className="space-y-4">
        {workouts.map((workout, index) => (
          <li key={index} className="border-b pb-2">
            <p className="font-semibold text-gray-700">{workout.day}</p>
            <p className="text-gray-600">{workout.workout}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
