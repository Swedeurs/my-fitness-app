import { useUser } from "@/hooks/use-user";
import { ChatMessage } from "@/types";
import { useEffect, useState } from "react";

export default function Chat({ otherUserId }: { otherUserId: number }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const chatId = `${user.id}-${otherUserId}`;
        const response = await fetch(`/api/chat/${chatId}`);

        if (!response.ok) {
          console.error(`Response error, status: ${response.status}`);
          setError(`Unexpected response status: ${response.status}`);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response content type, expected JSON");
        }

        const data: ChatMessage[] = await response.json();
        setMessages(data.length > 0 ? data : []);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch chat messages:", error.message);
          setError("An unexpected error occurred. Please try again later.");
        } else {
          console.error("Unknown error:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchMessages();
  }, [user, otherUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: otherUserId,
          message: newMessage,
        }),
      });

      setMessages((prev) => [
        ...prev,
        {
          senderId: user.id,
          receiverId: otherUserId,
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to send message:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      } else {
        console.error("Unknown error:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto border rounded-md shadow-md p-4 flex flex-col justify-between h-[36rem]">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div
        className="overflow-y-auto mb-4 flex flex-col space-y-2"
        style={{ height: "80%" }}
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.senderId === user.id
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              } p-2 rounded-lg max-w-xs`}
            >
              {msg.message}
            </div>
          ))
        )}
      </div>

      <div className="flex space-x-2" style={{ height: "10%" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flexGrow: 1,
            border: "1px solid #4CAF50",
            borderRadius: "0.375rem",
            padding: "0.5rem",
            color: "#e0e0e0",
            backgroundColor: "#1a1a1a",
            outline: "none",
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            backgroundColor: "#00ff66",
            color: "#000",
            borderRadius: "0.375rem",
            transition: "background-color 0.3s",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
