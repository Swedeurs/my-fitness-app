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

  // Fetch assigned clients when component mounts
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/trainers/${user?.id}/clients`);
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          setError("Failed to fetch assigned clients");
        }
      } catch (error) {
        setError("An error occurred while trying to fetch clients.");
      }
    };

    const fetchUnassignedClients = async () => {
      try {
        const response = await fetch("/api/unassigned-clients");
        if (response.ok) {
          const data = await response.json();
          setUnassignedClients(data);
        } else {
          setError("Failed to fetch unassigned clients");
        }
      } catch (error) {
        setError("An error occurred while trying to fetch unassigned clients.");
      }
    };

    if (user) {
      fetchClients();
      fetchUnassignedClients();
    }
  }, [user]);

  const assignClient = async (clientId: number) => {
    try {
      const response = await fetch("/api/assign-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, trainerId: user?.id }),
      });

      if (response.ok) {
        // Re-fetch assigned and unassigned clients after a successful assignment
        setClients((prev) => [...prev, unassignedClients.find((c) => c.id === clientId)!]);
        setUnassignedClients((prev) => prev.filter((c) => c.id !== clientId));
      } else {
        setError("Failed to assign client");
      }
    } catch (error) {
      setError("An error occurred while trying to assign the client.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#e0e0e0" }}>
      <TrainerSideNav />

      <div style={{ flex: "1", padding: "2.5rem", maxWidth: "96rem", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>My Clients</h2>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        {/* Assigned Clients */}
        <div className="grid gap-6">
          {clients.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No clients assigned yet.</p>
          ) : (
            clients.map((client) => (
              <div key={client.id} style={{ border: "1px solid #00ff66", padding: "1.5rem", backgroundColor: "#1a1a1a" }}>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{client.name}</p>
                <button
                  onClick={() => setSelectedClient(client)}
                  style={{
                    backgroundColor: "#00ff66",
                    color: "#000000",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Chat with {client.name}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Unassigned Clients */}
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: "2.5rem 0 1.5rem", color: "#00ff66" }}>Unassigned Clients</h2>
        <div className="grid gap-6">
          {unassignedClients.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No unassigned clients available.</p>
          ) : (
            unassignedClients.map((client) => (
              <div key={client.id} style={{ border: "1px solid #00ff66", padding: "1.5rem", backgroundColor: "#1a1a1a" }}>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{client.name}</p>
                <button
                  onClick={() => assignClient(client.id)}
                  style={{
                    backgroundColor: "#00ff66",
                    color: "#000000",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Assign to Me
                </button>
              </div>
            ))
          )}
        </div>

        {selectedClient && (
          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>Chat with {selectedClient.name}</h2>
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
