import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 via-gray-50 to-green-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
          Welcome to the Fitness App
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Are you a Client or a Personal Trainer?
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/client">
            <a className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow-md transform hover:-translate-y-1">
              I am a Client
            </a>
          </Link>
          <Link href="/trainer">
            <a className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-md transform hover:-translate-y-1">
              I am a Trainer
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
