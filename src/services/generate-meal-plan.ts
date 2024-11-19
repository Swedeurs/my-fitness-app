export function generateMealPlan(userPreferences: {
  dietaryPreferences: string;
  timeAvailability: number;
}) {
  if (userPreferences.dietaryPreferences === "vegetarian") {
    return [
      { meal: "Breakfast", recipe: "Greek Yogurt with Berries & Granola" },
      { meal: "Lunch", recipe: "Quinoa Salad with Chickpeas & Veggies" },
      { meal: "Dinner", recipe: "Vegetable Stir-fry with Tofu" },
    ];
  } else if (userPreferences.dietaryPreferences === "high-protein") {
    return [
      {
        meal: "Breakfast",
        recipe: "Omelette with Spinach, Bell Peppers, and Feta Cheese",
      },
      {
        meal: "Lunch",
        recipe:
          "Turkey Breast Wrap with Whole Wheat Tortilla, Avocado, and Leafy Greens",
      },
      {
        meal: "Dinner",
        recipe:
          "Grilled Steak with Mashed Sweet Potato and Roasted Brussels Sprouts",
      },
    ];
  } else if (userPreferences.dietaryPreferences === "low-carb") {
    return [
      { meal: "Breakfast", recipe: "Avocado, Bacon, and Poached Eggs" },
      {
        meal: "Lunch",
        recipe: "Zucchini Noodles with Alfredo Sauce and Grilled Chicken",
      },
      {
        meal: "Dinner",
        recipe: "Pan-Seared Salmon with Asparagus and Cauliflower Mash",
      },
    ];
  } else if (userPreferences.dietaryPreferences === "high-carb") {
    return [
      {
        meal: "Breakfast",
        recipe: "Whole Grain Pancakes with Banana Slices and Honey",
      },
      {
        meal: "Lunch",
        recipe:
          "Brown Rice Bowl with Black Beans, Roasted Veggies, and Avocado",
      },
      {
        meal: "Dinner",
        recipe: "Spaghetti with Lean Turkey Meatballs and Steamed Green Beans",
      },
    ];
  } else {
    return [
      {
        meal: "Breakfast",
        recipe: "Greek Yogurt Parfait with Granola and Mixed Berries",
      },
      {
        meal: "Lunch",
        recipe: "Pre-cooked Quinoa with Rotisserie Chicken and Mixed Salad",
      },
      {
        meal: "Dinner",
        recipe:
          "One-Pan Sheet Bake with Chicken Thighs, Baby Potatoes, Carrots, and Herbs",
      },
    ];
  }
}
