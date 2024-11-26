import Link from "next/link";

export default function ClientLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-8">Welcome Clients!</h1>
      <p className="mb-4">We are here to help you achieve your fitness goals!</p>
      <Link href="/signup/client">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Sign Up as Client
        </button>
      </Link>
      <Link href="/login/client">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 transition">
          Login as Client
        </button>
      </Link>
    </div>
  );
}
