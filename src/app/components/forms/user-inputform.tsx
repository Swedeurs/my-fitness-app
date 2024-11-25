import { useUser } from "@/hooks/use-user";
import { useForm } from "react-hook-form";


type UserPreferencesForm = {
  fitnessLevel: string;
  trainingPreferences: string;
  dietaryPreferences: string;
  timeAvailability: number;
};

const UserInputForm = ({ userRole }: { userRole: "client" | "trainer" }) => {
  const { register, handleSubmit } = useForm<UserPreferencesForm>();
  const { login } = useUser();

  const onSubmit = async (data: UserPreferencesForm) => {
    // Mock login - pretend the user was successfully created
    const user = {
      id: 1, // Mocked ID
      name: userRole === "client" ? "Client User" : "Trainer User",
      email: `${userRole}@example.com`,
      role: userRole,
      ...data,
    };
    login(user);
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Fitness Level:</label>
      <select {...register("fitnessLevel")}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <label>Training Preferences:</label>
      <select {...register("trainingPreferences")}>
        <option value="gym">Gym</option>
        <option value="home">Home Workout</option>
        <option value="running">Running</option>
        <option value="swimming">Swimming</option>
      </select>
      <label>Dietary Preferences:</label>
      <select {...register("dietaryPreferences")}>
        <option value="vegetarian">Vegetarian</option>
        <option value="high-protein">High Protein</option>
        <option value="low-carb">Low Carb</option>
        <option value="high-carb">High Carb</option>
      </select>
      <label>Time Availability (hours per week):</label>
      <input
        type="number"
        {...register("timeAvailability", { valueAsNumber: true })}
        min="1"
        max="168"
      />
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default UserInputForm;
