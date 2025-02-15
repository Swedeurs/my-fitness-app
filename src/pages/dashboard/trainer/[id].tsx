import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { TrainerSideNav } from "@/app/components/trainer-sidnav";
import Chat from "@/app/components/chat";
import { Client } from "@/types";

const TrainerDashboard = () => {
  const { user } = useUser();
  const [clients, setClients] = useState<Client[]>([]);
  const [unassignedClients, setUnassignedClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/trainers/${user.id}/clients`);
          if (!response.ok) {
            if (response.status === 404) {
              setClients([]);
            } else {
              throw new Error(
                `Failed to fetch clients. Status: ${response.status}`,
              );
            }
          } else {
            const data = await response.json();
            setClients(data);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      };
      fetchClients();
    }
  }, [user]);

  useEffect(() => {
    const fetchUnassignedClients = async () => {
      try {
        const response = await fetch("/api/trainers/unassigned-clients");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch unassigned clients. Status: ${response.status}`,
          );
        }
        const data = await response.json();
        setUnassignedClients(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred while fetching unassigned clients.");
        }
      }
    };

    fetchUnassignedClients();
  }, []);

  return (
    <div className="flex min-h-screen bg-black shadow-md rounded-lg p-6">
      <TrainerSideNav />

      <div className="flex-1 p-10 max-w-screen-xl mx-auto text-white">
        <h2 className="text-4xl font-bold mb-6">
          Trainer Dashboard - {user?.name}
        </h2>

        {feedback && <p className="text-blue-400 mb-4">{feedback}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Assigned Clients
          </h2>
          <ul>
            {clients.length > 0 ? (
              clients.map((client) => (
                <li
                  key={client.id}
                  className="p-4 mb-4  hover:bg-gray-700"
                  style={{ borderBottom: "1px solid #00ffcc" }}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{client.name}</span>
                    <div className="flex">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className=" flex items-center bg-blue-500 text-black py-1 px-4 rounded hover:bg-blue-400 h-10 "
                      >
                        {selectedClient && selectedClient.id === client.id
                          ? "Close Chat"
                          : `Chat with ${client.name}`}
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-400 pb-1">
                    {client.email}
                  </p>
                  <p className="font-semibold text-gray-400 py-1">
                    {client.fitnessLevel}
                  </p>
                  <p className="font-semibold text-gray-400 py-1">
                    {client.dietaryPreferences}
                  </p>
                  <p className="font-semibold text-gray-400 pt-1">
                    {client.trainingPreferences}
                  </p>
                </li>
              ))
            ) : (
              <p>No clients assigned yet.</p>
            )}
          </ul>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Unassigned Clients
          </h2>
          <div className="grid gap-4">
            {unassignedClients.length > 0 ? (
              unassignedClients.map((client) => (
                <div
                  key={client.id}
                  className="p-6 border border-blue-500 rounded-lg"
                  style={{
                    backgroundColor: "#1a1a1a",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">{client.name}</span>
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/assign-client", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              clientId: client.id,
                              trainerId: user.id,
                            }),
                          });

                          if (!response.ok) {
                            throw new Error(
                              `Failed to assign client. Status: ${response.status}`,
                            );
                          }

                          setFeedback("Client successfully assigned!");
                          setUnassignedClients((prev) =>
                            prev.filter((c) => c.id !== client.id),
                          );
                          setClients((prev) => [...prev, client]);
                        } catch (error: unknown) {
                          if (error instanceof Error) {
                            setError(error.message);
                          } else {
                            setError(
                              "An error occurred while assigning the client.",
                            );
                          }
                        }
                      }}
                      className="bg-blue-500 text-black py-2 px-4 mt-3 rounded-lg hover:bg-blue-400 transition-colors duration-300 font-semibold"
                    >
                      Assign to Me
                    </button>
                  </div>
                  <p className="text-gray-400">{client.email}</p>
                </div>
              ))
            ) : (
              <p>No unassigned clients available.</p>
            )}
          </div>
        </div>

        {selectedClient && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              Chat with {selectedClient.name}
            </h2>
            <Chat otherUserId={selectedClient.id} />
            <button
              onClick={() => setSelectedClient(null)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-500"
            >
              Close Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDashboard;
