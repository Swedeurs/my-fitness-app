import {
  pgTable,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients", {
  id: integer("client_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  age: integer("age"),
  weight: integer("weight"),
  height: integer("height"),
  fitnessLevel: text("fitness_level"),
  dietaryPreferences: text("dietary_preferences"),
  trainingPreferences: text("training_preferences"),
  assignedTrainerId: integer("assigned_trainer_id").references(
    () => trainersTable.id,
  ),
});

export const trainersTable = pgTable("trainers", {
  id: integer("trainer_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  specialization: text("specialization"),
  experienceYears: integer("experience_years"),
});

// Sessions Table
export const sessionsTable = pgTable("sessions", {
  id: integer("session_id").primaryKey().generatedAlwaysAsIdentity(),
  trainerId: integer("trainer_id")
    .notNull()
    .references(() => trainersTable.id),
  clientId: integer("client_id").references(() => clientsTable.id),
  sessionTime: timestamp("session_time").notNull(),
  status: text("status").notNull(),
});

// Chat Messages Table
export const chatMessagesTable = pgTable("chat_messages", {
  id: integer("message_id").primaryKey().generatedAlwaysAsIdentity(),
  senderId: integer("sender_id").references(() => clientsTable.id),
  receiverId: integer("receiver_id").references(() => trainersTable.id),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Reviews Table
export const reviewsTable = pgTable("reviews", {
  id: integer("review_id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessionsTable.id),
  reviewerId: integer("reviewer_id").references(() => clientsTable.id),
  revieweeId: integer("reviewee_id").references(() => trainersTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Notifications Table
export const notificationsTable = pgTable("notifications", {
  id: integer("notification_id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => clientsTable.id),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
