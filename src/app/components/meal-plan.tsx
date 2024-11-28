import React, { useState } from "react";
export default function MealPlan() {
  const meals = [
    {
      day: "Monday",
      meals: [
        { mealType: "Breakfast", meal: "Vegan Breakfast Smoothie", recipe: "Ingredients: Banana, spinach, almond milk, chia seeds" },
        { mealType: "Lunch", meal: "Quinoa Salad", recipe: "Ingredients: Quinoa, chickpeas, cucumber, olive oil, lemon" },
        { mealType: "Dinner", meal: "Stir-fry Vegetables", recipe: "Ingredients: Bell peppers, broccoli, soy sauce, ginger, garlic" },
      ],
    },
    {
      day: "Tuesday",
      meals: [
        { mealType: "Breakfast", meal: "Oatmeal with Berries", recipe: "Ingredients: Oats, mixed berries, almond butter" },
        { mealType: "Lunch", meal: "Chickpea Wrap", recipe: "Ingredients: Chickpeas, lettuce, cucumber, wraps" },
        { mealType: "Dinner", meal: "Veggie Tacos", recipe: "Ingredients: Corn tortillas, black beans, avocado, salsa" },
      ],
    },
    {
      day: "Wednesday",
      meals: [
        { mealType: "Breakfast", meal: "Green Smoothie", recipe: "Ingredients: Kale, pineapple, mango, almond milk" },
        { mealType: "Lunch", meal: "Mixed Greens Salad", recipe: "Ingredients: Lettuce, tomatoes, carrots, cucumber, olive oil" },
        { mealType: "Dinner", meal: "Baked Tofu with Rice", recipe: "Ingredients: Tofu, rice, soy sauce, sesame oil" },
      ],
    },
    {
      day: "Thursday",
      meals: [
        { mealType: "Breakfast", meal: "Chia Pudding", recipe: "Ingredients: Chia seeds, coconut milk, maple syrup" },
        { mealType: "Lunch", meal: "Buddha Bowl", recipe: "Ingredients: Rice, veggies, hummus, tahini sauce" },
        { mealType: "Dinner", meal: "Stuffed Peppers", recipe: "Ingredients: Bell peppers, quinoa, black beans, cheese" },
      ],
    },
    {
      day: "Friday",
      meals: [
        { mealType: "Breakfast", meal: "Protein Pancakes", recipe: "Ingredients: Oats, protein powder, almond milk, banana" },
        { mealType: "Lunch", meal: "Sweet Potato Curry", recipe: "Ingredients: Sweet potatoes, coconut milk, curry paste" },
        { mealType: "Dinner", meal: "Pesto Pasta", recipe: "Ingredients: Pasta, basil pesto, cherry tomatoes, pine nuts" },
      ],
    },
  ];
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const openRecipePopup = (recipe: string) => {
    setSelectedRecipe(recipe);
    setShowRecipePopup(true);
  };
  const closeRecipePopup = () => {
    setShowRecipePopup(false);
    setSelectedRecipe(null);
  };
  return (
    <div className="border rounded-lg p-6 bg-gray-800 shadow-md">
      <h3 className="text-5xl font-semibold mb-4 text-blue-500">Meal Plans</h3>
      <div className="space-y-6">
        {meals.map((mealData, index) => (
          <div key={index}>
            <p className="font-semibold text-xl text-gray-300">{mealData.day}</p>
            <div className="flex flex-col space-y-4 mt-4">
              {mealData.meals.map((meal, mealIndex) => (
                <div
                  key={mealIndex}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                  onClick={() => openRecipePopup(meal.recipe)}
                >
                  <p className="text-lg font-semibold text-gray-200">{meal.mealType}: {meal.meal}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showRecipePopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-20"
          onClick={closeRecipePopup}
        >
          <div
            className="bg-gray-700 p-6 rounded-lg w-96 max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent the popup from closing when clicking inside
          >
            <h4 className="text-xl font-semibold text-gray-200 mb-4">Recipe Details</h4>
            <p className="text-gray-300">{selectedRecipe}</p>
            <button
              onClick={closeRecipePopup}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}