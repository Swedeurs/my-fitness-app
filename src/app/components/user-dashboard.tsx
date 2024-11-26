import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import Chat from "./chat";
import { Trainer, Client } from "@/types";

export default function UserDashboard() {
  const { user } = useUser();
  const [partner, setPartner] = useState<Trainer | Client[] | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    if (user) {
      const fetchPartner = async () => {
        try {
          if (user.role === "client") {
            const response = await fetch(`/api/clients/${user.id}/trainer`);
            const data = await response.json();
            setPartner(data);
          } else if (user.role === "trainer") {
            const response = await fetch(`/api/trainers/${user.id}/clients`);
            const data = await response.json();
            setPartner(data);
          }
        } catch (error) {
          console.error(
            `Failed to fetch ${user.role === "client" ? "trainer" : "clients"}:`,
            error,
          );
        }
      };
      fetchPartner();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      {user.role === "client" && (
        <>
          <h2 className="text-3xl font-bold mb-6">My Trainer</h2>
          {partner ? (
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <p className="text-xl font-semibold">
                {(partner as Trainer).name}
              </p>
              <p className="text-gray-700 mb-4">{(partner as Trainer).email}</p>
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                {showChat ? "Close Chat" : "Chat with Trainer"}
              </button>
              {showChat && (
                <div className="mt-6">
                  <Chat otherUserId={(partner as Trainer).id} />
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-700">No trainer assigned.</p>
          )}
        </>
      )}

      {user.role === "trainer" && (
        <>
          <h2 className="text-3xl font-bold mb-6">My Clients</h2>
          {Array.isArray(partner) && partner.length > 0 ? (
            <div className="grid gap-6">
              {(partner as Client[]).map((client) => (
                <div
                  key={client.id}
                  className="border rounded-lg p-6 bg-white shadow-md"
                >
                  <p className="text-xl font-semibold">{client.name}</p>
                  <p className="text-gray-700 mb-4">{client.email}</p>
                  <button
                    onClick={() => {
                      if (selectedClient && selectedClient.id === client.id) {
                        setShowChat(false);
                        setSelectedClient(null);
                      } else {
                        setSelectedClient(client);
                        setShowChat(true);
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    {showChat &&
                    selectedClient &&
                    selectedClient.id === client.id
                      ? "Close Chat"
                      : `Chat with ${client.name}`}
                  </button>
                  {showChat &&
                    selectedClient &&
                    selectedClient.id === client.id && (
                      <div className="mt-6">
                        <Chat otherUserId={client.id} />
                      </div>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No clients assigned yet.</p>
          )}
        </>
      )}
    </div>
  );
}
