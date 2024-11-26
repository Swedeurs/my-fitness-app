import { UserFormInputs } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";



const UserInputForm = ({ userRole }: { userRole: string }) => {
  const { register, handleSubmit } = useForm<UserFormInputs>();

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    const formData = { ...data, role: userRole };
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold">
          Name:
        </label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email:
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="age" className="block font-semibold">
          Age:
        </label>
        <input
          {...register("age", { required: true, valueAsNumber: true })}
          type="number"
          id="age"
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="fitnessPreferences" className="block font-semibold">
          Fitness Preferences:
        </label>
        <input
          {...register("fitnessPreferences")}
          type="text"
          id="fitnessPreferences"
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="dietaryPreferences" className="block font-semibold">
          Dietary Preferences:
        </label>
        <input
          {...register("dietaryPreferences")}
          type="text"
          id="dietaryPreferences"
          className="border p-2 rounded-md w-full"
        />
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
