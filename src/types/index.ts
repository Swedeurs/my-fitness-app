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

export type User = {
  id: number;
  name: string;
  email: string;
  fitnessLevel?: string;
  trainingPreferences?: string;
  dietaryPreferences?: string;
  role: string;
  timeAvailability?: number;
};
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

export interface UserFormInputs {
  name: string;
  email: string;
  age: number;
  fitnessPreferences?: string;
  dietaryPreferences?: string;
}


export type ChatMessage = {
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: string;
};