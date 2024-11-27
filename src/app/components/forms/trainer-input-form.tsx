// /components/trainer-inputform.tsx
import { useState } from "react";

interface TrainerInputFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    specialization: string;
    experience: string;
  }) => void;
}

export default function TrainerInputForm({ onSubmit }: TrainerInputFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, email, specialization, experience });
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-3xl text-green-500 font-bold mb-6">Trainer Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-lg text-gray-200">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg text-gray-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg text-gray-200">Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg text-gray-200">Experience (years)</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-gray-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
