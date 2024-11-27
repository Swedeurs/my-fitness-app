export type MealPlanItem = {
  meal: string;
  recipe: string;
};

export type WorkoutPlanItem = {
  day: string;
  workout: string;
};

export type UserRole = "client" | "trainer";

// Trainer Type
export type Trainer = {
  id: number;
  name: string;
  email: string;
  experienceYears?: number;
  role: "trainer";
};

// Client Type
export type Client = {
  id: number;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: string;
  dietaryPreferences?: string;
  trainingPreferences?: string;
  assignedTrainerId?: number;
  role: "client";
};

// ClientInsert for inserting new clients into the database
export interface ClientInsert {
  name: string;
  email: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: string;
  dietaryPreferences?: string;
  trainingPreferences?: string;
  assignedTrainerId?: number;
}

// TrainerInsert for inserting new trainers into the database
export interface TrainerInsert {
  name: string;
  email: string;
  password: string;
  specialization: string;
  experienceYears?: number;
}

// UserFormInputs for general form data
export interface UserFormInputs {
  name: string;
  email: string;
  age: number;
  fitnessLevel:
    | "Strength Training"
    | "Cardio"
    | "Yoga"
    | "CrossFit"
    | "Pilates"
    | "Mixed Training";
  dietaryPreferences:
    | "Vegan"
    | "Vegetarian"
    | "Keto"
    | "Paleo"
    | "Low Carb"
    | "Balanced";
}

// Session Type
export type Session = {
  sessionId: number;
  trainerId: number;
  clientId: number | null;
  sessionTime: string;
  status: "available" | "booked" | "cancelled";
};

// Notification Type
export type Notification = {
  notificationId: number;
  message: string;
  timestamp: string;
};

// Notification Context
export type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
};

// Chat Message
export type ChatMessage = {
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: string;
};

// Define User as a union of Client and Trainer
export type User = Client | Trainer;

// Enhanced User Context Type
export type UserContextType = {
  user: User | null; // Allow either a client or trainer as the user
  login: (credentials: User) => void;
  logout: () => void;
};
