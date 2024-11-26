import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";
import { UserRole } from "@/types";

export default function ClientLogin() {
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    const clientUser = {
      id: 1,
      name: "Client User",
      email: "client@example.com",
      role: "client" as UserRole,
    };
    login(clientUser);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Client Login</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={handleLogin}
      >
        Login as Client
      </button>
    </div>
  );
}
