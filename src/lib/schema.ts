import { pgTable, serial, integer, text, timestamp, foreignKey } from "drizzle-orm/pg-core";

// User Table
export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  age: integer("age"),
  weight: integer("weight"),
  height: integer("height"),
  fitnessLevel: text("fitness_level"),
  dietaryPreferences: text("dietary_preferences"),
  trainingPreferences: text("training_preferences"),
});

// Sessions Table
export const sessions = pgTable("sessions", {
  sessionId: serial("session_id").primaryKey(),
  trainerId: integer("trainer_id").notNull().references(() => users.userId),
  clientId: integer("client_id").references(() => users.userId),
  sessionTime: timestamp("session_time").notNull(),
  status: text("status").notNull(), // 'booked', 'available', 'cancelled'
});
