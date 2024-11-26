

export type MealPlanItem = {
  meal: string;
  recipe: string;
};

export type WorkoutPlanItem = {
  day: string;
  workout: string;
};
export type Trainer = {
  id: number;
  name: string;
  email: string;
};
export type Client = {
  id: number;
  name: string;
  email: string;
};

export type UserRole = "client" | "trainer";




export type User = {
  id: number;
  name: string;
  email: string;
  fitnessLevel?: string;
  trainingPreferences?: string;
  dietaryPreferences?: string;
  role: UserRole;
  timeAvailability?: number;
};

export interface UserFormInputs {
  name: string;
  email: string;
  age: number;
  fitnessLevel: "Strength Training" | "Cardio" | "Yoga" | "CrossFit" | "Pilates" | "Mixed Training";
  dietaryPreferences: "Vegan" | "Vegetarian" | "Keto" | "Paleo" | "Low Carb" | "Balanced";
}

export type UserContextType = {
  user: User | null;
  login: (credentials: User) => void;
  logout: () => void;
};

export type Session = {
  sessionId: number;
  trainerId: number;
  clientId: number | null;
  sessionTime: string;
  status: 'available' | 'booked' | 'cancelled';
};

export type Notification = {
  notificationId: number;
  message: string;
  timestamp: string;
};


export type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
};

export type ChatMessage = {
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: string;
};