export function generateWorkoutPlan(userPreferences: {
  fitnessLevel: string;
  trainingPreferences: string;
  timeAvailability: number;
}) {
  if (
    userPreferences.trainingPreferences === "home" &&
    userPreferences.fitnessLevel === "beginner"
  ) {
    return [
      { day: "Monday", workout: "Bodyweight Squats, Push-Ups, Plank" },
      { day: "Wednesday", workout: "Lunges, Dumbbell Rows, Side Plank" },
      { day: "Friday", workout: "Glute Bridge, Tricep Dips, Wall Sit" },
    ];
  }
  if (
    userPreferences.trainingPreferences === "gym" &&
    userPreferences.fitnessLevel === "intermediate"
  ) {
    return [
      { day: "Monday", workout: "Dumbbell Bench Press, Seated Row, Leg Press" },
      { day: "Wednesday", workout: "Deadlifts, Lat Pull-Down, Bicep Curls" },
      { day: "Friday", workout: "Dumbbell Lunges, Shoulder Press, Leg Raises" },
    ];
  }
  if (userPreferences.trainingPreferences === "running") {
    return [
      { day: "Tuesday", workout: "3 km Light Run" },
      {
        day: "Thursday",
        workout: "Interval Training (10 x 1-minute Sprint, 1-minute Walk)",
      },
      { day: "Saturday", workout: "Long Run (5-10 km at Moderate Pace)" },
    ];
  }
  if (userPreferences.trainingPreferences === "swimming") {
    return [
      { day: "Monday", workout: "Freestyle Technique Drills (30 minutes)" },
      {
        day: "Wednesday",
        workout: "Endurance Swim (400m, Rest, Repeat 4 times)",
      },
      { day: "Friday", workout: "Speed Intervals (8 x 50m Sprints, 30s Rest)" },
    ];
  } else {
    return [
      { day: "Monday", workout: "Jumping Jacks, Push-Ups, Plank (20 minutes)" },
      {
        day: "Wednesday",
        workout: "Burpees, Lunges, Mountain Climbers (20 minutes)",
      },
      {
        day: "Friday",
        workout:
          "High Knees, Tricep Dips (using chair), Side Planks (20 minutes)",
      },
    ];
  }
}
