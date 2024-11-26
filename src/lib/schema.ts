import {
  pgTable,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

// User Table
export const usersTable = pgTable("users", {
  id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: text("role").notNull(),
  weight: integer("weight"),
  height: integer("height"),
  fitnessLevel: text("fitness_level"),
  dietaryPreferences: text("dietary_preferences"),
  trainingPreferences: text("training_preferences"),
  assignedTrainerId: integer("assigned_trainer_id"),
});

// Sessions Table
export const sessionsTable = pgTable("sessions", {
  id: integer("session_id").primaryKey().generatedAlwaysAsIdentity(),
  trainerId: integer("trainer_id")
    .notNull()
    .references(() => usersTable.id),
  clientId: integer("client_id").references(() => usersTable.id),
  sessionTime: timestamp("session_time").notNull(),
  status: text("status").notNull(),
});

// Chat Messages Table
export const chatMessagesTable = pgTable("chat_messages", {
  id: integer("message_id").primaryKey().generatedAlwaysAsIdentity(),
  senderId: integer("sender_id")
    .notNull()
    .references(() => usersTable.id),
  receiverId: integer("receiver_id")
    .notNull()
    .references(() => usersTable.id),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Reviews Table
export const reviewsTable = pgTable("reviews", {
  id: integer("review_id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessionsTable.id),
  reviewerId: integer("reviewer_id")
    .notNull()
    .references(() => usersTable.id),
  revieweeId: integer("reviewee_id")
    .notNull()
    .references(() => usersTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Notifications Table
export const notificationsTable = pgTable("notifications", {
  id: integer("notification_id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
