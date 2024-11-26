/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from "@/hooks/use-user";
import { Trainer } from "@/types";
import { useEffect, useState } from "react";
import Chat from "./chat";
import { SideNav } from "./sidenav";

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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e0e0e0",
      }}
    >
      <SideNav />

      <main
        style={{
          flex: "1",
          padding: "2.5rem",
          maxWidth: "96rem",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#00ff66",
          }}
        >
          My Trainer
        </h2>
        {trainer ? (
          <div
            style={{
              borderRadius: "0.5rem",
              padding: "1.5rem",
              backgroundColor: "#1a1a1a",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "2.5rem",
            }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {trainer.name}
            </p>
            <p style={{ color: "#999999", marginBottom: "1rem" }}>
              {trainer.email}
            </p>
            <button
              onClick={() => setShowChat(!showChat)}
              style={{
                backgroundColor: "#00ff66",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                transition: "background-color 0.3s",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showChat ? "Close Chat" : "Chat with Trainer"}
            </button>
            {showChat && (
              <div style={{ marginTop: "1.5rem" }}>
                <Chat otherUserId={trainer.id} />
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              borderRadius: "0.5rem",
              padding: "1.5rem",
              backgroundColor: "#1a1a1a",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "2.5rem",
            }}
          >
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#e0e0e0",
                marginBottom: "1rem",
              }}
            >
              No trainer assigned yet.
            </p>
            <p style={{ color: "#999999" }}>
              Once a trainer is assigned, you will be able to see their
              information here and start chatting with them.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
