// /pages/chat-with-clients.tsx
import Chat from "@/app/components/chat";
import { TrainerSideNav } from "@/app/components/trainer-sidnav";




export default function ChatWithClientsPage() {
  const otherUserId = 1; // Replace with logic to dynamically select a client to chat with

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#e0e0e0" }}>
      <TrainerSideNav />
      <main style={{ flex: "1", padding: "2.5rem", maxWidth: "96rem", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#00ff66" }}>
          Chat with Clients
        </h1>
        <Chat otherUserId={otherUserId} />
      </main>
    </div>
  );
}
