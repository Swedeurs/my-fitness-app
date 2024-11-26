import Link from "next/link";
import React from "react";

export default function TrainerLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-8">Welcome Trainers!</h1>
      <p className="mb-4">Manage your clients and grow your business!</p>
      <Link href="/signup/trainer">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
          Sign Up as Trainer
        </button>
      </Link>
      <Link href="/login/trainer">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600 transition">
          Login as Trainer
        </button>
      </Link>
    </div>
  );
}
