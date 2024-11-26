import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export default function TrainerLandingPage() {
  const { login } = useUser();

  // Function to simulate trainer login with hardcoded user ID of 6
  const handleTrainerLogin = async () => {
    login({
      id: 6,
      name: "Trainer User",
      email: "trainer@example.com",
      role: "trainer",
    });

    // Assign client ID 2 to trainer ID 6 after login
    try {
      await fetch("/api/assign-client", {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to assign client:", error);
    }

    // Redirect to dashboard after login
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-green-800 to-black px-4"
      style={{ color: "#e0e0e0" }}
    >
      <div className="bg-gray-900 rounded-lg shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-5xl font-extrabold text-green-400 mb-8">
          Welcome Trainers!
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Manage your clients and grow your business!
        </p>
        {/* Username and Password fields for looks only */}
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/signup/trainer">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1"
              style={{
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 255, 102, 0.4)",
              }}
            >
              Sign Up as Trainer
            </button>
          </Link>
          <button
            onClick={handleTrainerLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1"
            style={{
              fontWeight: "bold",
              boxShadow: "0px 4px 10px rgba(0, 255, 255, 0.4)",
            }}
          >
            Login as Trainer
          </button>
        </div>
      </div>
    </div>
  );
}
