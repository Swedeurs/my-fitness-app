import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Client } from "@/types";
import { TrainerSideNav } from "@/app/components/trainer-sidnav";

export default function TrainerClientsPage() {
  const { user } = useUser();
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    if (user) {
      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/trainers/${user.id}/clients`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch clients. Status: ${response.status}`,
            );
          }
          const data = await response.json();
          setClients(data);
        } catch (error) {
          console.error("Failed to fetch clients:", error);
          setError("Failed to fetch clients.");
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      };

      fetchClients();
    }
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e0e0e0",
      }}
    >
      <TrainerSideNav />
      <main
        style={{
          flex: "1",
          padding: "2.5rem",
          maxWidth: "96rem",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#00ff66",
          }}
        >
          My Clients
        </h1>

        {/* Show loading spinner or message while fetching clients */}
        {loading && <p style={{ color: "#e0e0e0" }}>Loading clients...</p>}

        {/* Show error message if fetching clients failed */}
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}

        {/* Show message if no clients are found */}
        {clients.length === 0 && !loading && !error && (
          <p style={{ color: "#e0e0e0" }}>No clients assigned yet.</p>
        )}

        {/* Display the client list if there are clients */}
        {clients.length > 0 &&
          !loading &&
          !error &&
          clients.map((client) => (
            <div
              key={client.id}
              style={{
                border: "1px solid #00ff66",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#1a1a1a",
              }}
            >
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                {client.name}
              </p>
              <p style={{ color: "#999999" }}>{client.email}</p>
            </div>
          ))}
      </main>
    </div>
  );
}
