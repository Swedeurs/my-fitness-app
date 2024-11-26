import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Fitness App</h1>
      <p className="mb-4">Are you a Client or a Personal Trainer?</p>
      <div className="space-x-4">
        <Link href="/client">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            I am a Client
          </button>
        </Link>
        <Link href="/trainer">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
            I am a Trainer
          </button>
        </Link>
      </div>
    </div>
  );
}
