import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import Chat from "./chat";
import { Trainer } from "@/types";


export default function ClientDashboard() {
  const { user } = useUser();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      // Fetch trainer assigned to this client
      const fetchTrainer = async () => {
        try {
          const response = await fetch(`/api/clients/${user.id}/trainer`);
          const data = await response.json();
          setTrainer(data);
        } catch (error) {
          console.error("Failed to fetch trainer:", error);
        }
      };
      fetchTrainer();
    }
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">My Trainer</h2>
      {trainer ? (
        <div className="border rounded-lg p-6 bg-white shadow-md">
          <p className="text-xl font-semibold">{trainer.name}</p>
          <p className="text-gray-700 mb-4">{trainer.email}</p>
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            {showChat ? "Close Chat" : "Chat with Trainer"}
          </button>
          {showChat && (
            <div className="mt-6">
              <Chat otherUserId={trainer.id} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-700">No trainer assigned.</p>
      )}
    </div>
  );
}
