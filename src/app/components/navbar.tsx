// src/app/components/navbar.tsx
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="bg-darkCard text-primaryGreen px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Fitness App
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="bg-primaryGreen hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login/client" className="hover:text-white transition">
                Login as Client
              </Link>
              <Link href="/login/trainer" className="hover:text-white transition">
                Login as Trainer
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
