// src/app/components/meal-plan.tsx

import React from "react";

export default function MealPlan() {
  // Mock meal plan data
  const meals = [
    {
      day: "Monday",
      meal: "Vegan Breakfast Smoothie, Quinoa Salad, Stir-fry Vegetables",
    },
    {
      day: "Tuesday",
      meal: "Oatmeal with Berries, Chickpea Wrap, Veggie Tacos",
    },
    {
      day: "Wednesday",
      meal: "Green Smoothie, Mixed Greens Salad, Baked Tofu with Rice",
    },
    { day: "Thursday", meal: "Chia Pudding, Buddha Bowl, Stuffed Peppers" },
    {
      day: "Friday",
      meal: "Protein Pancakes, Sweet Potato Curry, Pesto Pasta",
    },
  ];

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h3 className="text-3xl font-semibold mb-4 text-gray-800">Meal Plans</h3>
      <ul className="space-y-4">
        {meals.map((meal, index) => (
          <li key={index} className="border-b pb-2">
            <p className="font-semibold text-gray-700">{meal.day}</p>
            <p className="text-gray-600">{meal.meal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
