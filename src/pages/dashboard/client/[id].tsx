import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { SideNav } from "@/app/components/sidenav";
import Chat from "@/app/components/chat";
import Link from "next/link";
import { Client, Trainer } from "@/types";

const ClientDashboard = () => {
  const { user } = useUser();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);

  const nextWorkoutDay = "Monday, 12th December";
  const nextSession = "Thursday, 15th December";

  useEffect(() => {
    if (user) {
      const fetchClientData = async () => {
        try {
          setClient({
            id: user.id,
            name: user.name,
            email: user.email,
            role: "client",
          });

          const response = await fetch(`/api/clients/${user.id}/trainer`);
          if (!response.ok) {
            if (response.status === 404) {
              setError("No trainer assigned to this client yet.");
              return;
            }
            throw new Error(`Failed to fetch trainer. Status: ${response.status}`);
          }

          const data = await response.json();
          setTrainer(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        }
      };

      fetchClientData();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-black shadow-md rounded-lg p-6">
      <SideNav />

      <main className="flex-1 p-10 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-white">
          My Client Dashboard
        </h2>

        {client && (
          <div className="text-lg text-white font-bold mb-4">
            <p className="text-2xl font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Welcome, {client.name}!</p>
            <p>Email: {client.email}</p>
          </div>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {trainer ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <p className="text-xl font-bold text-green-400">Trainer: {trainer.name}</p>
            <p className="text-gray-500 mb-4">{trainer.email}</p>
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-blue-400 text-black py-2 px-6 rounded-md transition duration-300 hover:bg-green-500"
            >
              {showChat ? "Close Chat" : "Chat with Trainer"}
            </button>
            {showChat && (
              <div className="mt-4">
                <Chat otherUserId={trainer.id} />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              No trainer assigned yet.
            </h2>
            <p className="text-gray-500">
              Once a trainer is assigned, you will be able to see their information here and start chatting with them.
            </p>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">Your Next Workout</h3>
          <p className="text-gray-200">Next Workout Day: {nextWorkoutDay}</p>
          <p className="text-gray-200">Next Workout with PT: {nextSession}</p>

          <Link href="/schedule" passHref>
            <button className="bg-blue-500 text-black py-2 px-5 rounded-lg mt-8 hover:bg-blue-400 transition-colors duration-300 font-semibold w-full">
              View My Schedule
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
