/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";

export default function ClientLandingPage() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClientLogin = async () => {
    try {
      const response = await fetch("/api/login/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in. Please check your credentials.");
      }
  
      const clientData = await response.json();
      login({
        id: clientData.id,
        name: clientData.name,
        email: clientData.email,
        role: "client",
      });
  
      // Redirect to the general dashboard
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setError(error.message || "An unexpected error occurred.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-green-800 to-black px-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-5xl font-extrabold text-green-400 mb-8">Welcome Clients!</h1>
        <p className="mb-6 text-lg text-gray-300">Achieve your fitness goals with us!</p>

        {/* Error Display */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Input Fields */}
        <div className="w-full mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/signup/client">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1">
              Sign Up as Client
            </button>
          </Link>
          <button
            onClick={handleClientLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1"
          >
            Login as Client
          </button>
        </div>
      </div>
    </div>
  );
}
