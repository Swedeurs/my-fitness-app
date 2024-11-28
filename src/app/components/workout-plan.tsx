import React, { useState } from "react";

export default function WorkoutPlan() {
  // Mock workout plan data with exercise types (Cardio, Strength, etc.)
  const workouts = [
    {
      day: "Monday",
      exercises: [
        {
          type: "Cardio",
          exercise: "Running",
          details: "Time: 30 mins, Speed: 6 mph"
        },
        {
          type: "Strength Training",
          exercise: "Upper Body (Push-ups, Dumbbell Press)",
          details: "Reps: 3 sets of 15, Weight: 20 lbs"
        },
        {
          type: "Strength Training",
          exercise: "Barbell Bench Press",
          details: "Reps: 4 sets of 8, Weight: 135 lbs"
        },
        {
          type: "Strength Training",
          exercise: "Bicep Curls (Dumbbell)",
          details: "Reps: 3 sets of 12, Weight: 15 lbs"
        }
      ]
    },
    {
      day: "Tuesday",
      exercises: [
        {
          type: "Yoga",
          exercise: "Flexibility and Core",
          details: "Duration: 60 mins"
        }
      ]
    },
    {
      day: "Wednesday",
      exercises: [
        {
          type: "Cardio",
          exercise: "Cycling",
          details: "Time: 45 mins, Intensity: Moderate"
        },
        {
          type: "Strength Training",
          exercise: "Lower Body (Squats, Lunges)",
          details: "Reps: 4 sets of 12, Weight: 40 lbs"
        },
        {
          type: "Strength Training",
          exercise: "Deadlift",
          details: "Reps: 4 sets of 10, Weight: 185 lbs"
        }
      ]
    },
    {
      day: "Thursday",
      exercises: [
        {
          type: "Rest",
          exercise: "Rest Day or Light Walk",
          details: "Duration: 20 mins walk"
        }
      ]
    },
    {
      day: "Friday",
      exercises: [
        {
          type: "HIIT",
          exercise: "Interval Training",
          details: "Duration: 20 mins, Intensity: High"
        },
        {
          type: "Strength Training",
          exercise: "Full Body (Deadlift, Rows)",
          details: "Reps: 4 sets of 10, Weight: 60 lbs"
        },
        {
          type: "Strength Training",
          exercise: "Overhead Barbell Press",
          details: "Reps: 3 sets of 8, Weight: 95 lbs"
        }
      ]
    },
    {
      day: "Saturday",
      exercises: [
        {
          type: "Swimming",
          exercise: "Endurance Swim",
          details: "Duration: 30 mins"
        }
      ]
    },
    {
      day: "Sunday",
      exercises: [
        {
          type: "Rest",
          exercise: "Recovery Day",
          details: "Rest and Recovery"
        }
      ]
    }
  ];

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showExercisePopup, setShowExercisePopup] = useState(false);

  const openExercisePopup = (details: string) => {
    setSelectedExercise(details);
    setShowExercisePopup(true);
  };

  const closeExercisePopup = () => {
    setShowExercisePopup(false);
    setSelectedExercise(null);
  };

  return (
    <div className="border rounded-lg p-6 bg-gray-800 shadow-md">
      <h3 className="text-3xl font-semibold mb-4 text-green-400">Workout Plans</h3>
      <div className="space-y-6">
        {workouts.map((workout, index) => (
          <div key={index}>
            <p className="font-semibold text-xl text-gray-300">{workout.day}</p>
            <div className="flex flex-col space-y-4 mt-4">
              {workout.exercises.map((exercise, exerciseIndex) => (
                <div
                  key={exerciseIndex}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                  onClick={() => openExercisePopup(exercise.details)}
                >
                  <p className="text-lg font-semibold text-gray-200">
                    {exercise.type}: {exercise.exercise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showExercisePopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-20"
          onClick={closeExercisePopup}
        >
          <div
            className="bg-gray-700 p-6 rounded-lg w-96 max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent the popup from closing when clicking inside
          >
            <h4 className="text-xl font-semibold text-gray-200 mb-4">Exercise Details</h4>
            <p className="text-gray-300">{selectedExercise}</p>
            <button
              onClick={closeExercisePopup}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
