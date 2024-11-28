import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { useRouter } from "next/router";

export function SideNav() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-60 bg-gradient-to-b from-black to-gray-800 text-white p-6 min-h-screen shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Link
          href="/dashboard"
          className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="/meal-plan"
          className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
        >
          Meal Plan
        </Link>
        <Link
          href="/workout-plan"
          className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
        >
          Workout Plan
        </Link>
        <Link
          href="/chat"
          className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
        >
          Chat with Trainer
        </Link>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-black py-2 px-5 rounded-lg mt-8 hover:bg-blue-400 transition-colors duration-300 font-semibold"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
