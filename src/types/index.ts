
export type MealPlanItem = {
  meal: string;
  recipe: string;
};

export type WorkoutPlanItem = {
  day: string;
  workout: string;
};

  export type User = {
    id: number;
    name: string;
    email: string;
    fitnessLevel?: string;
    trainingPreferences?: string;
    dietaryPreferences?: string;
    timeAvailability?: number;
  };
  export type UserContextType = {
    user: User | null;
    login: (credentials: User) => void;
    logout: () => void;
  };