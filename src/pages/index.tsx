import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-green-900 px-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-10 max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-green-400 mb-8">
          Welcome to the Fitness App
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Are you a Client or a Personal Trainer?
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            href="/login/client" // Make sure this is the correct path for client login
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md transform hover:-translate-y-1"
          >
            I am a Client
          </Link>
          <Link
            href="/login/trainer" // Make sure this is the correct path for trainer login
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-md transform hover:-translate-y-1"
          >
            I am a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
}
