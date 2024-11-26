import { UserFormInputs } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserInputFormProps {
  userRole: string;
  onSuccess?: () => void; // onSuccess is optional
}

const UserInputForm = ({ userRole, onSuccess }: UserInputFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>();

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    // No need to map fitnessPreferences anymore, as fitnessLevel is already correct in the type
    const formData = { ...data, role: userRole };
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully:", formData);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error === "Email is already registered") {
          alert("This email is already in use. Please use a different email.");
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold">
          Name:
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          id="name"
          className="border p-2 rounded-md w-full"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email:
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          id="email"
          className="border p-2 rounded-md w-full"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="age" className="block font-semibold">
          Age:
        </label>
        <input
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: { value: 18, message: "You must be at least 18 years old" },
          })}
          type="number"
          id="age"
          className="border p-2 rounded-md w-full"
        />
        {errors.age && <p className="text-red-600">{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="fitnessLevel" className="block font-semibold">
          Fitness Level:
        </label>
        <select
          {...register("fitnessLevel", { required: "Fitness level is required" })}
          id="fitnessLevel"
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select your fitness level</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Cardio">Cardio</option>
          <option value="Yoga">Yoga</option>
          <option value="CrossFit">CrossFit</option>
          <option value="Pilates">Pilates</option>
          <option value="Mixed Training">Mixed Training</option>
        </select>
        {errors.fitnessLevel && (
          <p className="text-red-600">{errors.fitnessLevel.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="dietaryPreferences" className="block font-semibold">
          Dietary Preferences:
        </label>
        <select
          {...register("dietaryPreferences", { required: "Dietary preference is required" })}
          id="dietaryPreferences"
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select your dietary preference</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Keto">Keto</option>
          <option value="Paleo">Paleo</option>
          <option value="Low Carb">Low Carb</option>
          <option value="Balanced">Balanced</option>
        </select>
        {errors.dietaryPreferences && (
          <p className="text-red-600">{errors.dietaryPreferences.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
      >
        Submit
      </button>
    </form>
  );
};

export default UserInputForm;
