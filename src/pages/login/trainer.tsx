import { useUser } from "@/hooks/use-user";
import { UserRole } from "@/types";
import { useRouter } from "next/router";

export default function TrainerLogin() {
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    const trainerUser = {
      id: 2,
      name: "Trainer User",
      email: "trainer@example.com",
      role: "trainer" as UserRole,
    };
    login(trainerUser);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trainer Login</h1>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        onClick={handleLogin}
      >
        Login as Trainer
      </button>
    </div>
  );
}
