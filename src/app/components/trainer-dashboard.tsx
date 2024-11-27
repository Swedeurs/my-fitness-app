import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Client } from "@/types";
import Chat from "./chat";
import { TrainerSideNav } from "./trainer-sidnav";

export default function TrainerDashboard() {
  const { user } = useUser();
  const [clients, setClients] = useState<Client[]>([]);
  const [unassignedClients, setUnassignedClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null); // Feedback for actions

  // Fetch assigned clients when component mounts
  useEffect(() => {
    if (user) {
      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/trainers/${user.id}/clients`);
          if (!response.ok) {
            if (response.status === 404) {
              setClients([]);
            } else {
              throw new Error(`Failed to fetch clients. Status: ${response.status}`);
            }
          } else {
            const data = await response.json();
            setClients(data);
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error("Failed to fetch clients:", err.message);
            setError("An error occurred while trying to fetch clients.");
          } else {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred.");
          }
        }
      };
      fetchClients();
    }
  }, [user]);

  // Fetch unassigned clients
  useEffect(() => {
    const fetchUnassignedClients = async () => {
      try {
        const response = await fetch("/api/trainers/unassigned-clients");
        if (!response.ok) {
          throw new Error(`Failed to fetch unassigned clients. Status: ${response.status}`);
        }
        const data = await response.json();
        setUnassignedClients(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError("An error occurred while fetching unassigned clients.");
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchUnassignedClients();
  }, []);

  // Assign client to trainer
  const assignClient = async (clientId: number) => {
    if (!user) return;
  
    try {
      setFeedback("Assigning client...");
      const response = await fetch(`/api/assign-client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          trainerId: user.id,
        }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || `Failed to assign client: ${response.status}`);
      }
  
      setUnassignedClients((prev) => prev.filter((client) => client.id !== clientId));
      const assignedClient = unassignedClients.find((client) => client.id === clientId);
      if (assignedClient) {
        setClients((prev) => [...prev, assignedClient]);
      }
      setFeedback("Client successfully assigned!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Failed to assign client:", errorMessage);
      setError(errorMessage);
    } finally {
      setTimeout(() => setFeedback(null), 3000);
    }
  };
  

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#e0e0e0" }}>
      {/* Side Navigation for Trainer */}
      <TrainerSideNav />

      <div style={{ flex: "1", padding: "2.5rem", maxWidth: "96rem", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>My Clients</h2>

        {/* Feedback message */}
        {feedback && <p style={{ color: "#00ff66", marginBottom: "1rem" }}>{feedback}</p>}

        {/* Error message display */}
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        {/* Display the list of assigned clients */}
        <div className="grid gap-6 mb-6">
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

        {/* Display the list of unassigned clients */}
        <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>Unassigned Clients</h2>
        <div className="grid gap-6">
          {unassignedClients.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No unassigned clients available.</p>
          ) : (
            unassignedClients.map((client) => (
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
                  onClick={() => assignClient(client.id)}
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
                  Assign to Me
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
