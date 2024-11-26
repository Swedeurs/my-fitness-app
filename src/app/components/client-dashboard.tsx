import { useUser } from "@/hooks/use-user";
import { Trainer } from "@/types";
import { useEffect, useState } from "react";
import Chat from "./chat";

export default function ClientDashboard() {
  const { user } = useUser();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const fetchTrainer = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/clients/${user.id}/trainer`);
          if (!response.ok) {
            throw new Error("Failed to fetch trainer");
          }
          const data = await response.json();
          setTrainer(data);
        } catch (error) {
          console.error("Failed to fetch trainer:", error);
          setError("An unexpected error occurred. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchTrainer();
    }
  }, [user]);
  

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">My Trainer</h2>
      {loading ? (
  <div>Loading trainer information...</div>
) : error ? (
  <div className="text-red-500">{error}</div>
) : trainer ? (
        // If a trainer is assigned
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
        // If no trainer is assigned
        <div className="border rounded-lg p-6 bg-white shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            No trainer assigned yet.
          </p>
          <p className="text-gray-600">
            Once a trainer is assigned, you will be able to see their information here and start chatting with them.
          </p>
        </div>
      )}

      {/* Additional Options Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Available Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Option 1 */}
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Book a Session</h3>
            <p className="text-gray-700">
              You can browse available sessions and book them according to your preference.
            </p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
              Browse Sessions
            </button>
          </div>

          {/* Example Option 2 */}
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="text-2xl font-semibold mb-2">View Workout Plans</h3>
            <p className="text-gray-700">
              Access your personalized workout plans that fit your fitness preferences.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
