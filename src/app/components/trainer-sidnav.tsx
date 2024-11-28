import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";

export function TrainerSideNav() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-60 bg-gradient-to-b from-black to-gray-800 text-white p-6 min-h-screen shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Trainer Dashboard</h2>

      <nav className="flex flex-col gap-4">
        {/* Chat with Clients Link */}
        <Link href="/chat-with-clients">
          <p className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Chat with Clients
          </p>
        </Link>

        {/* Clients List Link */}
        <Link href="/trainer-clients">
          <p className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Clients
          </p>
        </Link>

        {/* Logout Button */}
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
