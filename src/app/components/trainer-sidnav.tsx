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
    <aside className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 min-h-screen shadow-lg">
      <h2 className="text-4xl font-semibold mb-8">Trainer Dashboard</h2>

      <nav className="flex flex-col gap-6">
        {/* Chat with Clients Link */}
        <Link href="/chat-with-clients">
          <p className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors duration-300">
            Chat with Clients
          </p>
        </Link>

        {/* Clients List Link */}
        <Link href="/trainer-clients">
          <p className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors duration-300">
            Clients
          </p>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-green-500 text-black py-3 px-6 rounded-lg mt-10 hover:bg-green-400 transition-colors duration-300 font-semibold"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
