import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

// User Table
export const users = pgTable('users', {
  userId: serial('user_id').primaryKey(), // Use `serial` for auto-increment fields
  age: integer('age'),
  weight: integer('weight'),
  height: integer('height'),
  fitnessLevel: text('fitness_level'),
  dietaryPreferences: text('dietary_preferences'),
});

// Gym Table
export const gyms = pgTable('gyms', {
  gymId: serial('gym_id').primaryKey(),
  name: text('name'),
  location: text('location'),
  membershipPrice: integer('membership_price'),
});

// Meal Plan Table
export const mealPlans = pgTable('meal_plans', {
  mealId: serial('meal_id').primaryKey(),
  mealName: text('meal_name'),
  ingredients: text('ingredients'),
});

// Workout Plan Table
export const workouts = pgTable('workouts', {
  workoutId: serial('workout_id').primaryKey(),
  workoutName: text('workout_name'),
  workoutType: text('workout_type'),
});
