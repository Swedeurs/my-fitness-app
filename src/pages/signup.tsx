import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const userSchema = z.object({
  age: z.number().min(18, { message: "Must be 18 or older" }),
  weight: z.number().positive("Weight must be positive"),
  height: z.number().positive("Height must be positive"),
  fitnessLevel: z.string().nonempty(),
  dietaryPreferences: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...register("age")} placeholder="Age" />
      <p>{errors.age?.message}</p>

      <input type="number" {...register("weight")} placeholder="Weight" />
      <p>{errors.weight?.message}</p>

      <input type="number" {...register("height")} placeholder="Height" />
      <p>{errors.height?.message}</p>

      <input
        type="text"
        {...register("fitnessLevel")}
        placeholder="Fitness Level"
      />
      <p>{errors.fitnessLevel?.message}</p>

      <input
        type="text"
        {...register("dietaryPreferences")}
        placeholder="Dietary Preferences (Optional)"
      />
      <p>{errors.dietaryPreferences?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}
