import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Client } from "@/types";
import Chat from "./chat";
import { TrainerSideNav } from "./trainer-sidnav";


export default function TrainerDashboard() {
  const { user } = useUser();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch assigned clients when component mounts
  useEffect(() => {
    if (user) {
      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/trainers/${user.id}/clients`);
          if (!response.ok) {
            if (response.status === 404) {
              // If there's a 404, it just means no clients are assigned yet.
              setClients([]);
            } else {
              throw new Error(`Failed to fetch clients. Status: ${response.status}`);
            }
          } else {
            const data = await response.json();
            setClients(data);
          }
        } catch (error) {
          console.error("Failed to fetch clients:", error);
          setError("An error occurred while trying to fetch clients.");
        }
      };
      fetchClients();
    }
  }, [user]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#e0e0e0" }}>
      {/* Side Navigation for Trainer */}
      <TrainerSideNav />

      <div style={{ flex: "1", padding: "2.5rem", maxWidth: "96rem", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>My Clients</h2>
        
        {/* Error message display */}
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        
        {/* Display the list of assigned clients */}
        <div className="grid gap-6">
          {clients.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No clients assigned yet.</p>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                style={{
                  border: "1px solid #00ff66",
                  borderRadius: "0.5rem",
                  padding: "1.5rem",
                  backgroundColor: "#1a1a1a",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{client.name}</p>
                <p style={{ color: "#999999", marginBottom: "1rem" }}>{client.email}</p>
                <button
                  onClick={() => setSelectedClient(client)}
                  style={{
                    backgroundColor: "#00ff66",
                    color: "#000000",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  {selectedClient && selectedClient.id === client.id ? "Close Chat" : `Chat with ${client.name}`}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Chat Section */}
        {selectedClient && (
          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>
              Chat with {selectedClient.name}
            </h2>
            <Chat otherUserId={selectedClient.id} />
            <button
              onClick={() => setSelectedClient(null)}
              style={{
                backgroundColor: "#ff6666",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
                marginTop: "1.5rem",
              }}
            >
              Close Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
