import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";
import Link from "next/link";

const ClientLogin = () => {
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/login/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      login({
        id: data.id,
        name: data.name,
        email: data.email,
        role: "client",
      });

      router.push(`/dashboard/client/${data.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-blue-900 px-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-8">
          Client Login
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="w-full mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login as Client"}
        </button>

        <div className="mt-4">
          <Link href="/signup/client">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition transform hover:-translate-y-1">
              Sign Up as Client
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
