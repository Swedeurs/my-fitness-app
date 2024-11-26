import { useUser } from "@/hooks/use-user";
import { Trainer } from "@/types";
import { useEffect, useState } from "react";
import Chat from "./chat";
import MealPlan from "./meal-plan";
import WorkoutPlan from "./workout-plan";

export default function ClientDashboard() {
  const { user } = useUser();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchTrainer = async () => {
        try {
          const response = await fetch(`/api/clients/${user.id}/trainer`);
          if (!response.ok) {
            if (response.status === 404) {
              setError("No trainer assigned to this client yet.");
              return;
            }
            throw new Error(
              `Failed to fetch trainer. Status: ${response.status}`,
            );
          }
          const data = await response.json();
          setTrainer(data);
        } catch (error) {
          console.error("Failed to fetch trainer:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      };

      fetchTrainer();
    }
  }, [user]);

  return (
    <div className="p-10 max-w-6xl mx-auto bg-darkBackground text-lightGray">
      <h2 className="text-4xl font-bold mb-6 text-primaryGreen">My Trainer</h2>
      {trainer ? (
        <div className="border rounded-lg p-6 bg-darkCard shadow-md mb-10">
          <p className="text-xl font-semibold">{trainer.name}</p>
          <p className="text-gray-400 mb-4">{trainer.email}</p>
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-primaryGreen hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
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
        <div className="border rounded-lg p-6 bg-darkCard shadow-md mb-10">
          <p className="text-xl font-semibold text-lightGray mb-4">
            No trainer assigned yet.
          </p>
          <p className="text-gray-500">
            Once a trainer is assigned, you will be able to see their
            information here and start chatting with them.
          </p>
        </div>
      )}

      {/* Meal Plan and Workout Plan Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealPlan />
        <WorkoutPlan />
      </div>
    </div>
  );
}
